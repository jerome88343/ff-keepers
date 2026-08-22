#!/usr/bin/env bun
// F The Raiders 2026 — keeper legality + money checker
// Run: bun validate.ts            (all teams)
//      bun validate.ts jb         (one team by id)
import { readFileSync } from "node:fs";

const POS_CAP: Record<string, number> = { WR: 3 };   // WR is the ONLY position over 2
const DEFAULT_CAP = 2;
const MAX_KEEPERS = 4;
const MAX_DISCOUNTS = 2;

const ecr = JSON.parse(readFileSync("ecr/ecr-locked-2026-08-22.json", "utf8")).players as any[];
const rankOf = (name: string) => {
  const q = name.toLowerCase().replace(/[.'']/g, "");
  const hit = ecr.find(p => {
    const n = p.player_name.toLowerCase().replace(/[.'']/g, "");
    return n === q || n.startsWith(q) || q.startsWith(n);
  });
  return hit ? Number(hit.rank_ecr) : null;
};
const ecrRound = (rank: number) => Math.min(Math.floor((rank - 1) / 12) + 1, 16);

const src = readFileSync("data.js", "utf8").replace("const DATA", "globalThis.DATA");
(0, eval)(src);
const D = (globalThis as any).DATA;
const tax = (r: number) => D.taxLadder[Math.min(r, 8)];

const only = process.argv[2];
let potTax = 0, potIns = 0, potBuy = 0;

for (const t of D.teams) {
  if (only && t.id !== only) continue;
  const problems: string[] = [];
  const notes: string[] = [];

  if (t.keepers.length > MAX_KEEPERS) problems.push(`${t.keepers.length} keepers, max is ${MAX_KEEPERS}`);

  const byPos: Record<string, number> = {};
  for (const k of t.keepers) byPos[k.pos] = (byPos[k.pos] || 0) + 1;
  for (const [p, n] of Object.entries(byPos)) {
    const cap = POS_CAP[p] ?? DEFAULT_CAP;
    if (n > cap) problems.push(`${n} ${p}, max is ${cap}`);
  }

  const rounds = t.keepers.map((k: any) => k.round);
  const dupes = rounds.filter((r: number, i: number) => rounds.indexOf(r) !== i);
  if (dupes.length) problems.push(`two keepers in round ${[...new Set(dupes)].join(", ")} — bump one`);

  let discounts = 0;
  for (const k of t.keepers) {
    const rank = rankOf(k.player);
    if (rank === null) { notes.push(`${k.player}: not in top 520 ECR, costs R16`); continue; }
    const er = ecrRound(rank);
    if (k.bumped) { const o=(D.taxAtOrigin && k.origin)?k.origin:k.round; notes.push(`${k.player}: ECR ${rank} (R${er}) → counts R${o}, bumped to R${k.round}, tax $${tax(o)}`); continue; }
    if (k.round > er) { discounts++; notes.push(`${k.player}: ECR ${rank} (R${er}) → kept R${k.round}, DISCOUNT ${k.round - er}`); }
    else if (k.round < er) problems.push(`${k.player}: kept R${k.round} but ECR is R${er} — ECR is cheaper, take R${er}`);
    else notes.push(`${k.player}: ECR ${rank} (R${er}) → kept R${k.round}, exact`);
  }
  if (discounts > MAX_DISCOUNTS) problems.push(`${discounts} discount keepers, max is ${MAX_DISCOUNTS}`);

  const bumps = t.keepers.filter((k: any) => k.bumped);
  const taxOwed = bumps.reduce((s: number, k: any) => s + tax((D.taxAtOrigin && k.origin) ? k.origin : k.round), 0);
  const ins = t.insurance ? D.insuranceFee : 0;
  const cred = t.carryover || 0;
  potTax += taxOwed; potIns += ins; if (t.paid) potBuy += D.buyIn;

  console.log(`\n=== ${t.name} (${t.owner || "?"}) ${t.slot ? "· slot " + t.slot : "· no slot yet"}`);
  notes.forEach(n => console.log("   " + n));
  if (problems.length) { console.log("   !! ILLEGAL"); problems.forEach(p => console.log("      - " + p)); }
  else console.log(`   LEGAL — ${t.keepers.length}/4 keepers, ${discounts}/${MAX_DISCOUNTS} discounts, ` +
    Object.entries(byPos).map(([p, n]) => `${n}${p}`).join(" "));
  console.log(`   owes $${D.buyIn + taxOwed + ins - cred}  ($${D.buyIn} buy-in` +
    (taxOwed ? ` + $${taxOwed} tax` : "") + (ins ? ` + $${ins} insurance` : "") +
    (cred ? ` - $${cred} holdback` : "") + ")");
}

if (!only) {
  console.log(`\n=== POT`);
  console.log(`   buy-ins collected  $${potBuy}`);
  console.log(`   luxury tax         $${potTax}`);
  console.log(`   insurance          $${potIns}`);
  console.log(`   running total      $${potBuy + potTax + potIns}`);
  if (D.ratesPending) console.log(`   (rates pending the A/B vote)`);
}
