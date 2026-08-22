// ============================================================
// F THE RAIDERS 2026 — SINGLE SOURCE OF TRUTH
// Cost basis: FantasyPros PPR ECR locked 2026-08-22 9:01 AM CT
// Edit ONLY this file. The board rebuilds itself from it.
// ============================================================
const DATA = {
  season: 2026,
  updated: "Aug 22, 11:00 AM CT",
  draftDate: "Saturday, Aug 29",
  buyIn: 250,

  ratesPending: true,                                   // A/B vote not settled
  taxLadder: { 1:20, 2:18, 3:16, 4:14, 5:12, 6:10, 7:8, 8:8 },  // Option B shown
  insuranceFee: 15,
  feesIntoPot: true,

  rounds: 16,
  teamCount: 12,
  // Order owners CHOOSE their draft slot (toilet bowl winner first). id order = pick order.
  slotPickOrder: ["pa","cd_chad","jj","rd","tf","jb","ry","tv","jn","cd","jl","ju"],

  teams: [
    { id:"jb", name:"Jerome Mahomes", owner:"Jeremy Brownlee", slot:null, paid:false, insurance:true,
      keepers:[
        { player:"Jaxon Smith-Njigba", pos:"WR", nfl:"SEA", round:1,  bumped:false, discount:false }, // 2025: KEPT by Travis Briar (Perennial Losers) -> counts at ECR 5 = R1
        { player:"Rashee Rice",        pos:"WR", nfl:"KC",  round:2,  bumped:false, discount:false }, // 2025: KEPT by Jeremy -> counts at ECR 22 = R2
        { player:"Travis Etienne Jr.", pos:"RB", nfl:"NO",  round:6,  bumped:false, discount:true  }, // 2025: drafted R6 by Phil. ECR R4 -> 2-rd discount
        { player:"David Montgomery",   pos:"RB", nfl:"HOU", round:7,  bumped:true,  discount:false }  // drafted R5 by Jason / ECR R6 -> takes cheaper R6, collides with Etienne, bumped to R7
      ]},
    { id:"cd", name:"Pink Taco Pluggers", owner:"Chris Drake", slot:null, paid:false, insurance:false,
      keepers:[
        { player:"Jahmyr Gibbs",  pos:"RB", nfl:"DET", round:1, bumped:false, discount:false }, // 2025: KEPT by Chris -> counts at ECR 2 = R1
        { player:"Trey McBride",  pos:"TE", nfl:"ARI", round:2, bumped:false, discount:false }, // 2025: KEPT by Jeremy -> counts at ECR 20 = R2
        { player:"Drake Maye",    pos:"QB", nfl:"NE",  round:13, bumped:false, discount:true  }, // 2025: drafted R13 by Chris. ECR R4 -> 9-rd discount
        { player:"Emeka Egbuka",  pos:"WR", nfl:"TB",  round:5, bumped:false, discount:true  }  // 2025: drafted R5 by Ryan (traded pick). ECR R4 -> 1-rd discount
      ]},
    { id:"pa", name:"Phildo's Dildos", owner:"Phil Arreguin", slot:12, paid:false, insurance:true,
      keepers:[
        { player:"Puka Nacua",        pos:"WR", nfl:"LAR", round:1,  bumped:false, discount:false }, // kept 2025 by Phil -> ECR 3 = R1
        { player:"Jonathan Taylor",   pos:"RB", nfl:"IND", round:2,  bumped:true,  discount:false }, // kept 2025 by Phil -> ECR 11 = R1, bumped to R2
        { player:"Malik Nabers",      pos:"WR", nfl:"NYG", round:3,  bumped:true,  discount:false }, // kept 2025 by Phil -> ECR 24 = R2, bumped to R3 by Taylor
        { player:"Luther Burden III", pos:"WR", nfl:"CHI", round:11, bumped:false, discount:true  }  // drafted R11 2025 by Chris -> R11, 7-rd discount
      ]},
    { id:"jn", name:"My Couch Pulls Out, But I Don't.", owner:"Jason Brownlee", slot:null, paid:false, insurance:true,
      keepers:[
        { player:"Bijan Robinson",     pos:"RB", nfl:"ATL", round:1, bumped:false, discount:false }, // kept 2025 by Jason -> ECR 4 = R1
        { player:"Amon-Ra St. Brown",  pos:"WR", nfl:"DET", round:2, bumped:true,  discount:false }, // kept 2025 by Jason -> ECR 6 = R1, bumped off Bijan
        { player:"Kenneth Walker III", pos:"RB", nfl:"SEA", round:3, bumped:false, discount:false }, // kept 2025 by Jeremy -> ECR 28 = R3
        { player:"Chris Olave",        pos:"WR", nfl:"NO",  round:7, bumped:false, discount:true  }  // drafted R7 2025 by Jason -> R7, 5-rd discount
      ]},
    { id:"cd_chad", name:"LaFlama Blanca",        owner:"Chad Nicols",        slot:1, paid:false, insurance:false, keepers:[] },
    { id:"jj", name:"Bearded Clams", owner:"Josh James", slot:11, paid:false, insurance:false,
      keepers:[
        { player:"A.J. Brown",       pos:"WR", nfl:"NE",  round:1,  bumped:false, discount:false }, // kept 2025 by Josh J -> ECR 12 = R1
        { player:"Omarion Hampton",  pos:"RB", nfl:"LAC", round:3,  bumped:false, discount:false }, // drafted R1 2025 by Josh J; ECR 25 = R3 is cheaper
        { player:"Javonte Williams", pos:"RB", nfl:"DAL", round:8,  bumped:false, discount:true  }, // drafted R8 2025 by Josh J. ECR R4 -> 4-rd discount
        { player:"Alec Pierce",      pos:"WR", nfl:"IND", round:16, bumped:false, discount:true  }  // UNDRAFTED 2025 -> last pick R16. ECR R9 -> 7-rd discount
      ]},
    { id:"rd",      name:"Rainbow Pride",         owner:"Reid Farmer",        slot:null, paid:false, insurance:false, keepers:[] },
    { id:"tf",      name:"Alphabet Army",         owner:"Travis Farmer", slot:null, paid:false, insurance:false, keepers:[] },
    { id:"ry",      name:"Tee Diddy And The Didlers", owner:"Ryan Anderson",    slot:null, paid:false, insurance:false, keepers:[] },
    { id:"tv",      name:"Perennial Losers",      owner:"Travis Briar", slot:null, paid:false, insurance:false, keepers:[] },
    { id:"jl",      name:"$Test Tube Daddy$",     owner:"Josh Lennon",      slot:null, paid:false, insurance:false, keepers:[] },
    { id:"ju",      name:"Collusion",             owner:"Justin Bjorgo",      slot:null, paid:false, insurance:false, keepers:[] }
  ]
};
