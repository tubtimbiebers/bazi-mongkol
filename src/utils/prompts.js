import { H, E, HIDDEN, JN, SS } from './bazi.js';

export function hiddenStr(branch) {
  return HIDDEN[branch].filter(Boolean).map(s => `${H[s].th}${H[s].cn}(${H[s].el})`).join(', ');
}

function chartHeader(cd, curPStr) {
  const hh = hiddenStr(cd.hp.branch);
  const mh = hiddenStr(cd.mp.branch);
  const yh = hiddenStr(cd.yp.branch);

  const pad = s => String(s).padEnd(12);

  const mkHs = H[cd.mk.stem], mkEb = E[cd.mk.branch];
  const kv0 = E[cd.kongVuang[0]], kv1 = E[cd.kongVuang[1]];

  return `=== SYSTEM INSTRUCTION ===
You are a top-tier Chinese Metaphysics (BaZi / 八字命理) Grandmaster with specialized expertise in Traditional BaZi analysis. 
Your analysis MUST be grounded strictly in Chinese Astrology (BaZi) principles. Do NOT incorporate Thai general astrology or other mixed divination systems.

CORE ANALYTICAL DEPTH REQUIRED:
1. Five Elements Theory (五行): Analysis of balance, strength, and flow (Qi).
2. Ten Gods (十神): Deep dive into the relationship between the Day Master and other elements.
3. Branch Interactions (地支作用): You MUST specifically identify and analyze:
   - **Chong (ชง / 冲):** Clashes between pillars or with luck cycles.
   - **Heng (เฮ้ง / 刑):** Punishments (Self, Two-way, Three-way punishments).
   - **Phua (ผั่ว / 破):** Destructions/Broken relationships between branches.
   - **Hai (ไห่ / 害):** Harms/Betrayal interactions.
   - **He (ฮะ / 合):** Combinations (6-harmony, 3-harmony, seasonal harmony).
4. Twelve Growth Phases (十二长生): Status of elements in each pillar.
5. Life Palace (เหมี่ยเก็ง 命宮) & Void (คงบ๊วง 空亡): Impact on life capacity and timing.

CRITICAL OUTPUT RULES:
1. Respond ENTIRELY in Thai (ภาษาไทยเท่านั้น).
2. Use professional, authoritative, yet compassionate "Master" tone.
3. Be EXTREMELY detailed and specific to the data provided. No generic fluff.
4. Structure with clear Thai headings.

=== SUBJECT'S BAZI DATA ===

Birth Info: ${cd.birthDate} | Gender: ${cd.gender}

Four Pillars (四柱):
╔══════════╦══════════════╦══════════════╦══════════════╦══════════════╗
║  Pillar  ║   Hour 時    ║    Day 日    ║  Month 月    ║   Year 年    ║
╠══════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ Stem 天干║ ${pad(cd.hourPillar.split('/')[0].trim())} ║ ${pad(cd.dayPillar.split('/')[0].trim())} ║ ${pad(cd.monthPillar.split('/')[0].trim())} ║ ${pad(cd.yearPillar.split('/')[0].trim())} ║
║Branch地支║ ${pad(cd.hourPillar.split('/')[1].trim())} ║ ${pad(cd.dayPillar.split('/')[1].trim())} ║ ${pad(cd.monthPillar.split('/')[1].trim())} ║ ${pad(cd.yearPillar.split('/')[1].trim())} ║
║Hidden藏干║ ${pad(hh)} ║ (DM Rooting) ║ ${pad(mh)} ║ ${pad(yh)} ║
╚══════════╩══════════════╩══════════════╩══════════════╩══════════════╝

Extended Analytics:
- Day Master (ดิถี): ${cd.dayMaster}
- Strength (ความแข็งแกร่ง): Analyze based on Season of Birth (${cd.sartBig})
- Life Palace (เหมี่ยเก็ง): ${mkHs.th}${mkEb.th} ${mkHs.cn}${mkEb.cn} (${SS[cd.mk.ss]}) ${cd.kvStatus.mk ? '!! IN VOID !!' : ''}
- Personal Void (คงบ๊วง): ${kv0?.th || '—'}${kv0?.cn || ''} & ${kv1?.th || '—'}${kv1?.cn || ''}
- Pillars in Void: ${Object.entries(cd.kvStatus).filter(([k,v])=>v && k!=='mk').map(([k])=>k).join(', ') || 'None'}
- Luck Cycle Start: ${cd.luckStart} years | Direction: ${cd.luckDir}
- Current Luck Period: ${curPStr}`;
}

export function buildPrompt1(cd, curPStr) {
  return chartHeader(cd, curPStr) + `

=== READING REQUEST 1: CORE CHART STRUCTURE & INTERACTION ===

Please provide a deep analysis in Thai focusing on the fundamental pillars and interactions:

**ส่วนที่ 1 — วิเคราะห์ดิถี (Day Master) และโครงสร้างดวง**
- วิเคราะห์ความแข็งแกร่งของดิถี (Strong/Weak) โดยละเอียด โดยพิจารณาจากฤดูกาลเกิดและรากในฐานดวง
- วิเคราะห์บทบาทของเหมี่ยเก็ง (Life Palace) ว่าส่งเสริมหรือขัดแย้งกับโครงสร้างดวงหลักอย่างไร

**ส่วนที่ 2 — วิเคราะห์การปฏิสัมพันธ์ของราศีดิน (Branch Interactions)**
- ตรวจสอบและวิเคราะห์ **ชง (Clash), เฮ้ง (Punishment), ผั่ว (Destruction) และ ไห่ (Harm)** ที่ปรากฏใน 4 แถว
- วิเคราะห์การ **ฮะ (Combination)** ว่าเปลี่ยนแปลงภพหรือธาตุในดวงอย่างไร
- ผลกระทบของการปฏิสัมพันธ์เหล่านี้ต่อวาสนาพื้นฐาน

**ส่วนที่ 3 — ธาตุสำคัญ (Useful God - Yong Shen) และธาตุให้โทษ**
- ระบุธาตุที่ช่วยปรับสมดุล (Yong Shen) และธาตุที่มาให้คุณ (Xi Shen)
- ระบุธาตุที่เป็นอุปสรรค (Ji Shen) โดยพิจารณาร่วมกับสภาวะ "คงบ๊วง" ในพื้นดวง

**ส่วนที่ 4 — สรุปชัยภูมิและทิศทางเสริมดวง**
- สีมงคล, ทิศทางมงคล, และตัวเลขที่สอดคล้องกับธาตุสำคัญตามหลักปาจื้อแท้ๆ

Write with wisdom and precision. All output in Thai.`;
}

export function buildPrompt2(cd, curPStr) {
  return chartHeader(cd, curPStr) + `

=== READING REQUEST 2: CAREER, WEALTH & DEITIES ===

Analyze career and wealth based on Ten Gods (十神) and Branch interactions:

**ส่วนที่ 1 — วิเคราะห์อาชีพตามโครงสร้างสิบเทพ (Ten Gods)**
- เทพองค์ใดโดดเด่นในดวง (เช่น เจียไช้, ชีสัวะ, พีเกียง ฯลฯ) และบ่งบอกถึงลักษณะอาชีพอย่างไร
- อาชีพที่ตรงตามธาตุให้คุณ (Yong Shen) และอาชีพที่ควรเลี่ยง

**ส่วนที่ 2 — ดวงขุมทรัพย์และการสะสมความมั่งคั่ง**
- วิเคราะห์ "คลังสมบัติ" ในราศีดิน มีการถูก **ชง (Clash) หรือ เฮ้ง (Punishment)** เพื่อเปิดคลังหรือไม่
- ความมั่นคงของการเงินตามโครงสร้างดวงปาจื้อ (Wealth structure)

**ส่วนที่ 3 — อิทธิพลของวัยจรต่อความสำเร็จ**
- วัยจรปัจจุบัน (${curPStr}) มีการ ชง-ฮะ กับพื้นดวงในเรื่องการงานการเงินอย่างไร
- จังหวะชีวิตที่ควรลงทุนหรือควรถอย

**ส่วนที่ 4 — คำแนะนำเชิงยุทธศาสตร์**
- วิธีการจัดการการเงินและการเลือกคู่ค้า/พนักงาน ตามลักษณะดวง

Be direct and practical. Use strictly BaZi logic.`;
}

export function buildPrompt3(cd, curPStr) {
  return chartHeader(cd, curPStr) + `

=== READING REQUEST 3: RELATIONSHIPS & SOCIAL DYNAMICS ===

Analyze relationships with focus on the Spouse Palace and Branch interactions:

**ส่วนที่ 1 — วิเคราะห์ฐานคู่ครอง (Spouse Palace)**
- ราศีดินในฐานวัน ถูก **ชง, เฮ้ง, ผั่ว, หรือ ไห่** หรือไม่ และส่งผลต่อความสัมพันธ์อย่างไร
- ลักษณะเทพที่สถิตในฐานคู่ครอง บ่งบอกภรรยา/สามีอย่างไร

**ส่วนที่ 2 — โครงสร้างครอบครัวและบริวาร**
- ความสัมพันธ์กับบิดามารดา (ฐานเดือน) และบุตร (ฐานยาม)
- การตรวจสอบการปะทะ (Clash) หรือการทำร้าย (Harm) ระหว่างฐานต่างๆ ในครอบครัว

**ส่วนที่ 3 — บทบาทของวัยจรต่อความรัก**
- วัยจรนี้ (${curPStr}) นำพาการ ฮะ (Combination) หรือการ ชง (Clash) เข้าสู่ฐานคู่ครองหรือไม่
- แนวโน้มการพบเจอคู่หรือการมีปัญหามือที่สาม/ความขัดแย้ง

**ส่วนที่ 4 — การปรับสมดุลความสัมพันธ์**
- ข้อควรระวังและแนวทางแก้ไขตามหลักเบญจธาตุ`;
}

export function buildPrompt4(cd, curPStr) {
  const periodRows = cd.periods.map(p => {
    const hs = H[p.stem], eb = E[p.branch];
    if (!hs || !eb) return '';
    const sy = cd.birthBE + p.age, ey = cd.birthBE + p.age + 9;
    const isCur = cd.nowBE >= sy && cd.nowBE <= ey;
    return `  • Age ${String(p.age).padStart(2,'0')}–${String(p.age+9).padStart(2,'0')} (BE ${sy}–${ey}): ${hs.th}${hs.cn} / ${eb.th}${eb.cn} (${eb.an})${isCur ? ' ◀ CURRENT' : ''}`;
  }).filter(Boolean).join('\n');

  return chartHeader(cd, curPStr) + `

=== COMPLETE LUCK PILLARS (大運) ===
${periodRows}

=== READING REQUEST 4: COMPREHENSIVE LIFE PATH & TRANSITIONS ===

Analyze the entire life flow with a focus on major transitions and interactions:

**บทที่ 1 — วิเคราะห์พื้นดวงกำเนิดและการหยั่งราก**
- การวิเคราะห์โครงสร้างดวง (Chart Geometry) และความสัมพันธ์ของ 4 เสา

**บทที่ 2 — การเดินทางของวัยจร (Luck Pillar Analysis)**
- วิเคราะห์การเปลี่ยนแปลงธาตุในแต่ละ 10 ปี
- ตรวจสอบช่วงอายุที่มีการ **ชง, เฮ้ง, ผั่ว, ไห่** ครั้งใหญ่ในชีวิต
- จุดเปลี่ยนสำคัญที่ต้องเตรียมรับมือ

**บทที่ 3 — วิเคราะห์ปีปัจจุบัน (BE ${cd.nowBE})**
- ปีจรนี้มากระทบ (Chong/He) กับฐานดวงหรือวัยจรอย่างไร
- การพยากรณ์รายเดือนเบื้องต้นตามธาตุประจำเดือน

**บทที่ 4 — การพยากรณ์ 3-5 ปีข้างหน้า**
- แนวโน้มพลังงานธาตุที่จะเข้ามาและวิธีการเตรียมตัว

**บทที่ 5 — สรุปคำชี้แนะจากซินแส**
- กลยุทธ์การดำเนินชีวิตที่สอดคล้องกับฟ้า (Timing), ดิน (Environment), และคน (Action)

Provide full 1,000+ words of deep BaZi insights. No generalities.`;
}

export function buildPrompt5(cd, curPStr) {
  const today = new Date();
  const DAYS  = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
  const days  = [];
  for (let i = 0; i < 10; i++) {
    const d   = new Date(today); d.setDate(today.getDate() + i);
    const dd  = String(d.getDate()).padStart(2,'0');
    const mm  = String(d.getMonth() + 1).padStart(2,'0');
    const yy  = d.getFullYear() + 543;
    days.push(`  Day ${i+1} — วัน${DAYS[d.getDay()]} ${dd}/${mm}/${yy}`);
  }

  return chartHeader(cd, curPStr) + `

=== READING REQUEST 5: 10-DAY HIGH-PRECISION FORECAST ===

Provide a BaZi-based forecast for the following 10 days:
${days.join('\n')}

For each day, analyze the interaction between the **"Day of the Pillar" (Fatzha)** and the subject's **Day Master (${cd.dayMaster})** and **Current Luck Cycle (${curPStr})**.

Focus on:
- **Chong (Clash):** Is today a clash day for any pillar?
- **He (Harmony):** Is today a day of favorable combination?
- **Ten Gods:** The energy of today (e.g., Rob Wealth day, Indirect Wealth day).

Output format for each day:
📅 [วันที่ + วัน]
───────────────────────────────────────
☯️ พลังงานหลัก: [วิเคราะห์ธาตุและสิบเทพประจำวัน]
🔥 ปฏิสัมพันธ์: [ชง, เฮ้ง, ฮะ ที่เกิดขึ้นในวันนี้]
💎 โอกาส/ข้อควรระวัง: [คำชี้แนะเชิงลึก]
───────────────────────────────────────

End with a summary of the most Auspicious and Cautionary days.`;
}

export function buildAllPrompts(result) {
  const { yp, mp, dp, hp, mk, kongVuang, kvStatus, periods, nowBE, birthBE, startAge, dir, sartBigJD, sartSmlJD, yr, mon, day, hr, mi, gdr } = result;

  const fmtDate = (jd) => {
    const jd2date = (jd) => {
      const z = Math.floor(jd + .5);
      let A = z;
      if (z >= 2299161) { const a = Math.floor((z - 1867216.25) / 36524.25); A = z + 1 + a - Math.floor(a / 4); }
      const B = A + 1524, C = Math.floor((B - 122.1) / 365.25), D = Math.floor(365.25 * C);
      const E2 = Math.floor((B - D) / 30.6001);
      const dy = B - D - Math.floor(30.6001 * E2);
      const mo = E2 < 14 ? E2 - 1 : E2 - 13, y = mo > 2 ? C - 4716 : C - 4715;
      const mn2 = Math.round((jd + .5 - Math.floor(jd + .5)) * 1440);
      return { y, mo, d: dy, h: Math.floor(mn2 / 60) % 24, m: mn2 % 60 };
    };
    const d = jd2date(jd);
    const MN = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    return `${d.d} ${MN[d.mo - 1]} ${d.y + 543} ${String(d.h).padStart(2,'0')}:${String(d.m).padStart(2,'0')} น.`;
  };

  const curP = periods.find(p => { const sy = birthBE + p.age, ey = birthBE + p.age + 9; return nowBE >= sy && nowBE <= ey; })
              || periods[periods.length - 1] || periods[0];

  const curPStr = curP
    ? `${H[curP.stem].th}${H[curP.stem].cn}/${E[curP.branch].th}${E[curP.branch].cn} (Age ${curP.age}–${curP.age + 9}, ${birthBE + curP.age}–${birthBE + curP.age + 9} BE)`
    : 'Not in active period';

  const cd = {
    yp, mp, dp, hp,
    birthDate: `${day}/${mon}/${yr + 543} พ.ศ. เวลา ${String(hr).padStart(2,'0')}:${String(mi).padStart(2,'0')} น.`,
    gender:    gdr === 1 ? 'ชาย (Male)' : 'หญิง (Female)',
    yearPillar:  `${H[yp.stem].th} ${H[yp.stem].cn} (${H[yp.stem].el}) / ${E[yp.branch].th} ${E[yp.branch].cn} (${E[yp.branch].an}, ${E[yp.branch].el})`,
    monthPillar: `${H[mp.stem].th} ${H[mp.stem].cn} (${H[mp.stem].el}) / ${E[mp.branch].th} ${E[mp.branch].cn} (${E[mp.branch].an}, ${E[mp.branch].el})`,
    dayPillar:   `${H[dp.stem].th} ${H[dp.stem].cn} (${H[dp.stem].el}) / ${E[dp.branch].th} ${E[dp.branch].cn} (${E[dp.branch].an}, ${E[dp.branch].el})`,
    hourPillar:  `${H[hp.stem].th} ${H[hp.stem].cn} (${H[hp.stem].el}) / ${E[hp.branch].th} ${E[hp.branch].cn} (${E[hp.branch].an}, ${E[hp.branch].el})`,
    dayMaster:   `${H[dp.stem].th} ${H[dp.stem].cn} (ธาตุ ${H[dp.stem].el})`,
    sartBig:     fmtDate(sartBigJD),
    sartSml:     fmtDate(sartSmlJD),
    luckStart:   startAge.toFixed(1),
    luckDir:     dir === 1 ? 'ตามเข็ม (Forward)' : 'ทวนเข็ม (Reverse)',
    periods, nowBE, birthBE,
    mk, kongVuang, kvStatus
  };

  return [
    { label: '1 · ปฏิสัมพันธ์ & พื้นดวง', text: buildPrompt1(cd, curPStr) },
    { label: '2 · งาน & เงินตามสิบเทพ', text: buildPrompt2(cd, curPStr) },
    { label: '3 · คู่ครอง & บริวาร',  text: buildPrompt3(cd, curPStr) },
    { label: '4 · วิเคราะห์เส้นทางชีวิต', text: buildPrompt4(cd, curPStr) },
    { label: '5 · พยากรณ์รายวัน 10 วัน', text: buildPrompt5(cd, curPStr) },
  ];
}
