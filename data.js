// ============================================================
// F THE RAIDERS 2026 — SINGLE SOURCE OF TRUTH
// Cost basis: FantasyPros PPR ECR locked 2026-08-22 9:01 AM CT
// Edit ONLY this file. The board rebuilds itself from it.
// ============================================================
const DATA = {
  season: 2026,
  updated: "Aug 22, 9:15 AM CT",
  draftDate: "Saturday, Aug 29",
  buyIn: 250,

  ratesPending: true,                                   // A/B vote not settled
  taxLadder: { 1:20, 2:18, 3:16, 4:14, 5:12, 6:10, 7:8, 8:8 },  // Option B shown
  insuranceFee: 15,
  feesIntoPot: true,

  rounds: 16,
  teamCount: 12,
  slotPickOrder: [],

  teams: [
    { id:"jb", name:"Jeremy", owner:"Jeremy Brownlee", slot:null, paid:false, insurance:true,
      keepers:[
        { player:"Jaxon Smith-Njigba", pos:"WR", nfl:"SEA", round:1,  bumped:false, discount:false }, // ECR 5  = R1
        { player:"Rashee Rice",        pos:"WR", nfl:"KC",  round:2,  bumped:false, discount:false }, // ECR 22 = R2
        { player:"Travis Etienne Jr.", pos:"RB", nfl:"NO",  round:6,  bumped:false, discount:true  }, // ECR 48 = R4, 2-rd discount
        { player:"David Montgomery",   pos:"RB", nfl:"HOU", round:7,  bumped:true,  discount:false }  // ECR 61 = R6, bumped off collision
      ]},
    { id:"cd", name:"Chris Drake", owner:"Chris Drake", slot:null, paid:false, insurance:false,
      keepers:[
        { player:"Jahmyr Gibbs",  pos:"RB", nfl:"DET", round:1, bumped:false, discount:false }, // ECR 2  = R1
        { player:"Trey McBride",  pos:"TE", nfl:"ARI", round:2, bumped:false, discount:false }, // ECR 20 = R2
        { player:"Drake Maye",    pos:"QB", nfl:"NE",  round:4, bumped:false, discount:false }, // ECR 37 = R4
        { player:"Emeka Egbuka",  pos:"WR", nfl:"TB",  round:5, bumped:true,  discount:false }  // ECR 39 = R4, bumped off collision (UNCONFIRMED which one bumps)
      ]}
  ]
};
