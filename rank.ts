#!/usr/bin/env bun
import { readFileSync, writeFileSync } from "node:fs";
const src = readFileSync("data.js","utf8").replace("const DATA","globalThis.DATA").replace("const PICKS_2026","globalThis.P26");
(0,eval)(src); const D:any=(globalThis as any).DATA;
const ecr = JSON.parse(readFileSync("ecr/ecr-locked-2026-08-22.json","utf8")).players;
const rank=(n:string)=>{const q=n.toLowerCase().replace(/[.'’]/g,"");
  const h=ecr.find((p:any)=>{const x=p.player_name.toLowerCase().replace(/[.'’]/g,"");return x===q||x.startsWith(q)||q.startsWith(x);});
  return h?Number(h.rank_ecr):999;};
const N=12, pick=(s:number,r:number)=>(r-1)*N+(r%2===1?s:N-s+1);
const tax=(r:number)=>D.taxLadder[Math.min(r,8)];

const rows = D.teams.map((t:any)=>{
  const ks=(t.keepers||[]).map((k:any)=>{
    const er=rank(k.player), pk=pick(t.slot,k.round);
    return {...k, ecr:er, pickNo:pk, surplus:pk-er};
  }).sort((a:any,b:any)=>b.surplus-a.surplus);
  const surplus=ks.reduce((s:number,k:any)=>s+k.surplus,0);
  const best=Math.min(...ks.map((k:any)=>k.ecr));
  const taxPaid=(t.keepers||[]).filter((k:any)=>k.bumped).reduce((s:number,k:any)=>s+tax(k.origin||k.round),0);
  const capital=ks.reduce((s:number,k:any)=>s+k.pickNo,0);      // draft capital spent
  const talent=ks.reduce((s:number,k:any)=>s+k.ecr,0);          // talent acquired (lower=better)
  return {name:t.name,owner:t.owner,slot:t.slot,ks,surplus,best,taxPaid,capital,talent,
          discounts:ks.filter((k:any)=>k.discount).length};
}).sort((a:any,b:any)=>b.surplus-a.surplus);

rows.forEach((r:any,i:number)=>{
  console.log(`\n#${i+1}  ${r.name}  (${r.owner}, slot ${r.slot})   SURPLUS +${r.surplus}`);
  console.log(`     best player ECR ${r.best} | talent sum ${r.talent} | capital spent ${r.capital} | tax $${r.taxPaid} | ${r.discounts} discounts`);
  r.ks.forEach((k:any)=>console.log(`     ${k.surplus>=0?'+':''}${String(k.surplus).padStart(4)}  ${(k.player+'                    ').slice(0,20)} ${k.pos.padEnd(4)} ECR ${String(k.ecr).padStart(3)}  costs pick ${k.pickNo} (R${k.round})`));
});
writeFileSync("rankings-data.json",JSON.stringify(rows,null,1));
console.log("\n\nwritten to rankings-data.json");
