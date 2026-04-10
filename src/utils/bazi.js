// ═══════════════════════════════════════════════════════
//  LOOKUP TABLES — verified against Excel BAZI_Date_Selection168_V1
// ═══════════════════════════════════════════════════════
export const H = {
  1:{th:'กะ',   el:'ไม้+', cn:'甲', c:'ew'},
  2:{th:'อิก',  el:'ไม้-', cn:'乙', c:'ew2'},
  3:{th:'เปี้ย',el:'ไฟ+',  cn:'丙', c:'ef'},
  4:{th:'เต็ง', el:'ไฟ-',  cn:'丁', c:'ef2'},
  5:{th:'โบ่ว', el:'ดิน+', cn:'戊', c:'ed'},
  6:{th:'กี้',  el:'ดิน-', cn:'己', c:'ed2'},
  7:{th:'แก',   el:'ทอง+', cn:'庚', c:'em'},
  8:{th:'ซิง',  el:'ทอง-', cn:'辛', c:'em2'},
  9:{th:'หยิ่ม',el:'น้ำ+',  cn:'壬', c:'en'},
 10:{th:'กุ่ย', el:'น้ำ-',  cn:'癸', c:'en2'},
};

export const E = {
  1:{th:'จื้อ', an:'ชวด',   el:'น้ำ+',  cn:'子', c:'en'},
  2:{th:'ทิ่ว', an:'ฉลู',   el:'ดิน-',  cn:'丑', c:'ed2'},
  3:{th:'อิ๊ง', an:'ขาล',   el:'ไม้+',  cn:'寅', c:'ew'},
  4:{th:'เบ้า', an:'เถาะ',  el:'ไม้-',  cn:'卯', c:'ew2'},
  5:{th:'ซิ้ง', an:'มะโรง', el:'ดิน+',  cn:'辰', c:'ed'},
  6:{th:'จี๋',  an:'มะเส็ง',el:'ไฟ-',   cn:'巳', c:'ef2'},
  7:{th:'โง่ว', an:'มะเมีย',el:'ไฟ+',   cn:'午', c:'ef'},
  8:{th:'บี่',  an:'มะแม',  el:'ดิน-',  cn:'未', c:'ed2'},
  9:{th:'ซิม',  an:'วอก',   el:'ทอง+',  cn:'申', c:'em'},
 10:{th:'อิ้ว', an:'ระกา',  el:'ทอง-',  cn:'酉', c:'em2'},
 11:{th:'สุก',  an:'จอ',    el:'ดิน+',  cn:'戌', c:'ed'},
 12:{th:'ไห',   an:'กุน',   el:'น้ำ-',   cn:'亥', c:'en2'},
};

// Hidden stems [main, 2nd, 3rd]
export const HIDDEN = {
  1:[10],     2:[6,10,8], 3:[1,3,5], 4:[2],
  5:[5,2,10], 6:[3,7,5],  7:[4,6],   8:[6,4,2],
  9:[7,9,5],  10:[8],     11:[5,8,4],12:[9,1],
};

// Ten Gods matrix [dayStem-1][otherStem-1]
export const JM = [
  [1,2,3,4,5,6,7,8,9,10],
  [2,1,4,3,6,5,8,7,10,9],
  [9,10,1,2,3,4,5,6,7,8],
  [10,9,2,1,4,3,6,5,8,7],
  [7,8,9,10,1,2,3,4,5,6],
  [8,7,10,9,2,1,4,3,6,5],
  [5,6,7,8,9,10,1,2,3,4],
  [6,5,8,7,10,9,2,1,4,3],
  [3,4,5,6,7,8,9,10,1,2],
  [4,3,6,5,8,7,10,9,2,1],
];

export const JN = {
  1:{th:'ปี่เกียง',   cn:'比肩'},
  2:{th:'เกี๊ยบไช้',  cn:'刧財'},
  3:{th:'เจียะซิ้ง',  cn:'食神'},
  4:{th:'เซียกัว',    cn:'伤官'},
  5:{th:'เพียงใช้',   cn:'偏財'},
  6:{th:'เจี้ยไช้',   cn:'正財'},
  7:{th:'ชิ๊กสัวะ',   cn:'七杀'},
  8:{th:'เจี้ยกัว',   cn:'正官'},
  9:{th:'เพียงอิ่ง',  cn:'偏印'},
 10:{th:'เจี้ยอิ่ง',  cn:'正印'},
};

export const SS = {
  1:'เชี่ยงแซ – เกิด',    2:'มกยก – อาบน้ำ/เปลี่ยน', 3:'ก่วงตั๋ว – เริ่มโต มีหน้าที่',
  4:'ลิ่มกัว – ทำงาน แข็งแรง', 5:'ตี้อ๋วง – รุ่งเรืองสุด', 6:'ซวย – เริ่มตก/ถดถอย',
  7:'แป่ – เจ็บป่วย',        8:'ซี้ – ดับ/จบ',         9:'หมอ – สุสาน/หลุม',
  10:'เจ๊าะ – สูญสิ้น',    11:'ทอ – เริ่มก่อกำเนิด',   12:'เอี้ยง – เลี้ยงดู',
};

// Lamda boundaries per calendar month [big, small]
export const LREF = [
  [285/360,    300/360  ],
  [315/360,    330/360  ],
  [345/360,    1.0      ],
  [15/360+1,   30/360+1 ],
  [45/360+1,   60/360+1 ],
  [75/360+1,   90/360+1 ],
  [105/360+1, 120/360+1 ],
  [135/360+1, 150/360+1 ],
  [165/360+1, 180/360+1 ],
  [195/360+1, 210/360+1 ],
  [225/360+1, 240/360+1 ],
  [255/360+1, 270/360+1 ],
];

// Hour → ยาม lookup
export const YMAP = {
  0:1,1:2,2:2,3:3,4:3,5:4,6:4,7:5,8:5,9:6,10:6,11:7,
  12:7,13:8,14:8,15:9,16:9,17:10,18:10,19:11,20:11,21:12,22:12,23:1,
};

// ═══════════════════════════════════════════════════════
//  MATH HELPERS
// ═══════════════════════════════════════════════════════
const EXCEL_BASE = 2415018.5;
const JD_1990    = 2447891.5;
export const DPLU = 1 / 0.00281547942;

const rad = d => d * Math.PI / 180;

export function m10(x) { return ((x - 1) % 10 + 10) % 10 + 1; }
export function m12(x) { return ((x - 1) % 12 + 12) % 12 + 1; }

export function toJD(y, m, d, h = 12, mn = 0) {
  let d2 = d + h / 24 + mn / 1440;
  if (m <= 2) { y--; m += 12; }
  const A = Math.trunc(y / 100), B = 2 - A + Math.trunc(A / 4);
  return Math.trunc(365.25 * (y + 4716)) + Math.trunc(30.6001 * (m + 1)) + d2 + B - 1524.5;
}

export function computeL(excelSerial) {
  const dayNum = excelSerial + EXCEL_BASE - JD_1990 - (6 / 24 + 18 / 1440);
  const T  = (JD_1990 - 2415020) / 36524.25;
  const Eg = (279.6966778 + 36000.76892 * T + 0.0003025 * T * T) % 360;
  const Wg = (281.2208444 + 1.719175 * T + 0.000452778 * T * T) % 360;
  const e  = 0.01675104 - 0.0000418 * T - 0.000000126 * T * T;
  const N  = ((360 / 365.242191 * dayNum) % 360 + 360) % 360;
  const Mo = ((N + Eg - Wg) % 360 + 360) % 360;
  const Ec = (360 / Math.PI) * e * Math.sin(rad(Mo));
  return (Ec + N + 279.403303) / 360;
}

export const jd2ex = jd => jd - EXCEL_BASE;
export const ex2jd = s  => s  + EXCEL_BASE;

export function jd2date(jd) {
  const z = Math.floor(jd + .5), f = (jd + .5) - z;
  let A = z;
  if (z >= 2299161) { const a = Math.floor((z - 1867216.25) / 36524.25); A = z + 1 + a - Math.floor(a / 4); }
  const B = A + 1524, C = Math.floor((B - 122.1) / 365.25), D = Math.floor(365.25 * C);
  const E2 = Math.floor((B - D) / 30.6001);
  const dy = B - D - Math.floor(30.6001 * E2);
  const mo = E2 < 14 ? E2 - 1 : E2 - 13, yr = mo > 2 ? C - 4716 : C - 4715;
  const mn2 = Math.round((jd + .5 - Math.floor(jd + .5)) * 1440);
  return { y: yr, mo, d: dy, h: Math.floor(mn2 / 60) % 24, m: mn2 % 60 };
}

const MNAMES = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
export function fmtDate(jd) {
  const d = jd2date(jd);
  return `${d.d} ${MNAMES[d.mo - 1]} ${d.y + 543} ${String(d.h).padStart(2,'0')}:${String(d.m).padStart(2,'0')} น.`;
}

// ═══════════════════════════════════════════════════════
//  FOUR PILLARS
// ═══════════════════════════════════════════════════════
export function yearPillar(yr, L) {
  const lichun = LREF[1][0];
  const adjY   = L >= lichun ? yr : yr - 1;
  return { stem: m10(adjY - 3), branch: m12(adjY + 9), adjY };
}

export function monthPillar(calMon, L, yearStem) {
  const [lamBig] = LREF[calMon - 1];
  const E124     = L >= lamBig ? 0 : -1;
  const E125     = calMon + E124 - 1;
  const branch   = m12(E125 + 2);
  const ye       = yearStem > 5 ? yearStem - 5 : yearStem;
  const j123     = [3, 5, 7, 9, 1][ye - 1];
  const brAdj    = branch - 3 < 0 ? 12 + branch - 3 : branch - 3;
  return { stem: m10(brAdj + j123), branch, solarMonth: E125 };
}

export function dayPillar(yr, mo, d, h) {
  const ex = Math.floor(jd2ex(toJD(yr, mo, d, 12, 0)));
  const t  = h >= 23 ? 1 : 0;
  const O  = ex - 4384 + t;
  const br = (O % 12 + 12) % 12 + 1;
  return { stem: m10(O + 3), branch: br === 0 ? 12 : br };
}

export function hourPillar(dayStem, h) {
  const branch = h >= 23 || h < 1 ? 1 : h < 3 ? 2 : h < 5 ? 3 : h < 7 ? 4 : h < 9 ? 5 :
                 h < 11 ? 6 : h < 13 ? 7 : h < 15 ? 8 : h < 17 ? 9 : h < 19 ? 10 : h < 21 ? 11 : 12;
  const yam  = YMAP[h];
  const de   = dayStem > 5 ? dayStem - 5 : dayStem;
  const S125 = [1, 3, 5, 7, 9][de - 1];
  return { stem: m10(S125 + yam - 1), branch, yam };
}

// 12 Growth Phases (เซี่ยงแซ)
const SS_START = { 1:12, 2:7, 3:3, 4:10, 5:3, 6:10, 7:6, 8:1, 9:9, 10:4 };
export function siangsae(dayStem, branch) {
  const s = SS_START[dayStem];
  const isYin = dayStem % 2 === 0;
  if (isYin) {
    return ((s - branch + 12) % 12) + 1;
  }
  return ((branch - s + 12) % 12) + 1;
}

export function convertDaysToYMD(totalDays) {
  const y = Math.floor(totalDays / 3);
  const remDays = totalDays % 3;
  const m = Math.floor(remDays * 4);
  const d = Math.floor((remDays * 4 - m) * 30);
  return { y, m, d };
}

// Ten Gods helpers
export function js(ds, os)  { return JM[ds - 1][os - 1] || null; }
export function jsE(ds, br) { const m = HIDDEN[br][0]; return m ? js(ds, m) : null; }

// ═══════════════════════════════════════════════════════
//  VAYJORN 大運
// ═══════════════════════════════════════════════════════
export function vayjorn(mStem, mBranch, dir, startAge, n = 8) {
  const out = [];
  let s = mStem, b = mBranch;
  for (let i = 0; i < n; i++) {
    s = m10(s + dir);
    b = m12(b + dir);
    // Keep exact float age: e.g. startAge=4.7 → 4.7, 14.7, 24.7, ...
    // This is used to derive the precise BE year each period begins/ends
    const exactAge = startAge + i * 10;
    out.push({ stem: s, branch: b, age: exactAge });
  }
  return out;
}

/**
 * Miei-Keng (命宮 - Life Palace / Ascendant)
 * Formula: (14 or 26) - (SolarMonth + HourBranch)
 * Where 寅(Yin)=1, 卯(Mao)=2, ..., 亥(Hai)=12
 */
export function calculateMieiKeng(yStem, mBranch, hBranch) {
  // Convert m12 index (Zi=1) to Yin=1 index
  const mIdx = (mBranch - 3 + 12) % 12 + 1;
  const hIdx = (hBranch - 3 + 12) % 12 + 1;
  
  let resIdx = (mIdx + hIdx <= 14) ? (14 - (mIdx + hIdx)) : (26 - (mIdx + hIdx));
  if (resIdx === 0) resIdx = 12;

  // Convert resIdx back to m12 (Zi=1)
  const branch = m12(resIdx + 2);

  // Five Tiger Rule for Stem
  const tigerStart = [3, 5, 7, 9, 1]; // 甲己->丙, 乙庚->戊, 丙辛->庚, 丁壬->壬, 戊癸->甲
  const startStem = tigerStart[(yStem - 1) % 5];
  const stem = m10(startStem + (resIdx - 1));

  return { stem, branch };
}

/**
 * Kong-Vuang (空亡 - Void / Death and Emptiness)
 * Determined by Day Pillar
 */
export function calculateKongVuang(s, b) {
  // s: 1-10 (Jia=1), b: 1-12 (Zi=1)
  let v1 = (b - s + 12) % 12; // diff = 0 for JiaZi
  if (v1 === 0) v1 = 12;
  let v2 = v1 - 1;
  if (v2 === 0) v2 = 12;
  return [v2, v1]; // Indices of Void branches
}

// ═══════════════════════════════════════════════════════
//  MAIN CALCULATE — returns result object or throws
// ═══════════════════════════════════════════════════════
export function calculateBazi({ day, mon, yrBE, hr, mi, gdr }) {
  const yr = yrBE - 543;

  const jdBirth = toJD(yr, mon, day, hr, mi);
  const exBirth = jd2ex(jdBirth);
  const L       = computeL(exBirth);

  const ex_m1     = jd2ex(toJD(yr, mon, 1, 0, 0));
  const L_m1      = computeL(ex_m1);
  const [lamBig, lamSml] = LREF[mon - 1];

  const sartBigEx = DPLU * (lamBig - L_m1) + ex_m1;
  const sartSmlEx = DPLU * (lamSml - L_m1) + ex_m1;
  const sartBigJD = ex2jd(sartBigEx);
  const sartSmlJD = ex2jd(sartSmlEx);

  const yp = yearPillar(yr, L);
  const mp = monthPillar(mon, L, yp.stem);
  const dp = dayPillar(yr, mon, day, hr);
  const hp = hourPillar(dp.stem, hr);

  const yearYin = yp.stem % 2 === 0;
  const dir     = gdr === 1 ? (yearYin ? -1 : 1) : (yearYin ? 1 : -1);

  // Vayjorn start age calculation
  const prevJie = (Math.floor((L * 360 - 15) / 30) * 30 + 15) / 360;
  const nextJie = prevJie + 30 / 360;
  const targetJieLam = dir === 1 ? nextJie : prevJie;
  
  // Refine exact Excel serial of the target Jie using iteration
  let targetJieEx = exBirth;
  for(let i = 0; i < 6; i++) {
    let currentL = computeL(targetJieEx);
    let diff = targetJieLam - currentL;
    diff = diff - Math.round(diff); // Handle 360-degree wrap-around
    targetJieEx += diff * 365.2422;
  }
  
  const diffDays = Math.abs(targetJieEx - exBirth) + 1; // +1 day for inclusive counting (standard practice)
  const lAge = convertDaysToYMD(diffDays);
  const startAge = lAge.y + lAge.m / 12 + lAge.d / 365.25;

  const periods = vayjorn(mp.stem, mp.branch, dir, startAge);
  const nowBE   = new Date().getFullYear() + 543;
  const birthBE = yr + 543;

  // Transit (ดวงจร) — today
  const now  = new Date();
  const tYr  = now.getFullYear(), tMon = now.getMonth() + 1, tDay = now.getDate();
  const tHr  = now.getHours(),    tMi  = now.getMinutes();
  const tL   = computeL(jd2ex(toJD(tYr, tMon, tDay, tHr, tMi)));
  const tYp  = yearPillar(tYr, tL);
  const tMp  = monthPillar(tMon, tL, tYp.stem);
  const tDp  = dayPillar(tYr, tMon, tDay, tHr);
  const tHp  = hourPillar(dp.stem, tHr);

  const mkPillar = calculateMieiKeng(yp.stem, mp.branch, hp.branch);
  const mk = {
    ...mkPillar,
    jsH:  js(dp.stem, mkPillar.stem),
    jsEb: jsE(dp.stem, mkPillar.branch),
    ss:   siangsae(dp.stem, mkPillar.branch)
  };

  const kv = calculateKongVuang(dp.stem, dp.branch);
  const checkKV = (b) => kv.includes(b);
  const kvStatus = {
    yp: checkKV(yp.branch),
    mp: checkKV(mp.branch),
    dp: checkKV(dp.branch),
    hp: checkKV(hp.branch),
    mk: checkKV(mk.branch)
  };

  return {
    yr, mon, day, hr, mi, gdr,
    yp, mp, dp, hp, mk,
    tYp, tMp, tDp, tHp,
    tDate: { y: tYr, m: tMon, d: tDay, h: tHr, mi: tMi },
    periods, nowBE, birthBE,
    startAge, dir,
    luckAge: lAge,
    sartBigJD, sartSmlJD,
    L,
    pDiff: Math.abs(targetJieEx - exBirth), // Keep raw for reference
    kongVuang: kv,
    kvStatus
  };
}
