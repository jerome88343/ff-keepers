#!/usr/bin/env bun
import { readFileSync, writeFileSync } from "node:fs";
const src=readFileSync("data.js","utf8").replace("const DATA","globalThis.DATA").replace("const PICKS_2026","globalThis.P26");
(0,eval)(src); const D:any=(globalThis as any).DATA;
const ecr=JSON.parse(readFileSync("ecr/ecr-locked-2026-08-22.json","utf8")).players;
const look=(n:string)=>{const q=n.toLowerCase().replace(/[.'’]/g,"");
  return ecr.find((p:any)=>{const x=p.player_name.toLowerCase().replace(/[.'’]/g,"");return x===q||x.startsWith(q)||q.startsWith(x);});};

// value curve: fantasy talent decays steeply. ECR 1 is worth far more than ECR 10,
// which is worth far more than ECR 100. Exponential decay fitted so #1=100, #12~=72, #50~=35, #100~=14.
const val=(r:number)=>+(100*Math.exp(-(r-1)/48)).toFixed(1);

const rows=D.teams.map((t:any)=>{
  const ks=(t.keepers||[]).map((k:any)=>{const p=look(k.player);
    return {...k, ecr:Number(p.rank_ecr), tier:p.tier, val:val(Number(p.rank_ecr))};
  }).sort((a:any,b:any)=>a.ecr-b.ecr);
  return {name:t.name, owner:t.owner, slot:t.slot, ks,
    score:+ks.reduce((s:number,k:any)=>s+k.val,0).toFixed(1),
    best:ks[0].ecr, sumRank:ks.reduce((s:number,k:any)=>s+k.ecr,0),
    top12:ks.filter((k:any)=>k.ecr<=12).length,
    top25:ks.filter((k:any)=>k.ecr<=25).length,
    tier1:ks.filter((k:any)=>k.tier<=2).length};
}).sort((a:any,b:any)=>b.score-a.score);

console.log("RANKED BY TALENT — who has the best four keepers for 2026\n");
console.log("    TEAM                          OWNER            SCORE  BEST  TOP12  TOP25  ELITE-TIER");
console.log("-".repeat(96));
rows.forEach((r:any,i:number)=>console.log(
  `${String(i+1).padStart(2)}  ${(r.name+"                              ").slice(0,30)}${(r.owner+"                ").slice(0,17)}${String(r.score).padStart(5)}  ${String(r.best).padStart(4)}  ${String(r.top12).padStart(5)}  ${String(r.top25).padStart(5)}  ${String(r.tier1).padStart(6)}`));
console.log("\n\nROSTERS\n"+"-".repeat(96));
rows.forEach((r:any,i:number)=>{
  console.log(`#${i+1}  ${r.name} (${r.owner})   score ${r.score}`);
  r.ks.forEach((k:any)=>console.log(`      ECR ${String(k.ecr).padStart(3)}  tier ${String(k.tier).padStart(2)}  ${(k.player+"                    ").slice(0,20)} ${k.pos.padEnd(4)} ${String(k.val).padStart(5)} pts`));
});
writeFileSync("talent-data.json",JSON.stringify(rows,null,1));
