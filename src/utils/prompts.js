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
You are a highly experienced Chinese Metaphysics (BaZi / 八字命理) consultant with 30+ years of practice in Traditional Chinese Astrology. You possess deep expertise in:
- Five Elements Theory (五行 Wu Xing)
- Ten Gods / Ten Deities System (十神 Shi Shen)
- Twelve Growth Phases (十二长生 Shi Er Chang Sheng)
- Branch Interactions: Clash (冲), Combine (合), Punishment (刑), Harm (害)
- Great Luck Cycles (大运 Da Yun) and Annual Luck (流年 Liu Nian)
- Life Palace (命宮 Miei-Keng) and Void (空亡 Kong-Vuang)

CRITICAL OUTPUT RULES:
1. Respond ENTIRELY in Thai language (ภาษาไทยเท่านั้น)
2. Do NOT use English, Chinese, or any other language in your response
3. Write in a warm, professional tone — like an experienced master consulting face-to-face
4. Be specific and actionable, not vague
5. Structure your response with clear headings
6. Length: comprehensive and detailed

=== SUBJECT'S BAZI CHART ===

Birth Information:
- Date & Time: ${cd.birthDate}
- Gender: ${cd.gender}

Four Pillars (四柱命盤):
╔══════════╦══════════════╦══════════════╦══════════════╦══════════════╗
║  Pillar  ║   Hour 時    ║    Day 日    ║  Month 月    ║   Year 年    ║
╠══════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ Stem 天干║ ${pad(cd.hourPillar.split('/')[0].trim())} ║ ${pad(cd.dayPillar.split('/')[0].trim())} ║ ${pad(cd.monthPillar.split('/')[0].trim())} ║ ${pad(cd.yearPillar.split('/')[0].trim())} ║
║Branch地支║ ${pad(cd.hourPillar.split('/')[1].trim())} ║ ${pad(cd.dayPillar.split('/')[1].trim())} ║ ${pad(cd.monthPillar.split('/')[1].trim())} ║ ${pad(cd.yearPillar.split('/')[1].trim())} ║
║Hidden藏干║ ${pad(hh)} ║ (Day Master) ║ ${pad(mh)} ║ ${pad(yh)} ║
╚══════════╩══════════════╩══════════════╩══════════════╩══════════════╝

Special Pillars & Data:
- Life Palace (เหมี่ยเก็ง 命宮): ${mkHs.th}${mkEb.th} ${mkHs.cn}${mkEb.cn} — ${mkHs.el} (${JN[cd.mk.jsH]?.th || 'ตัวเอง'}/${JN[cd.mk.jsEb]?.th || '—'})
- Life Palace Stage (เซี่ยงแซเหมี่ยเก็ง): ${SS[cd.mk.ss] || '—'} ${cd.kvStatus.mk ? '!! KONG-VUANG (VOID) !!' : ''}
- Personal Void (คงบ๊วง 空亡): ${kv0?.th || '—'}${kv0?.cn || ''} และ ${kv1?.th || '—'}${kv1?.cn || ''}
- Pillars in Void: ${Object.entries(cd.kvStatus).filter(([k,v])=>v && k!=='mk').map(([k])=>k).join(', ') || 'None'}

Key Chart Data:
- Day Master (日主 / ราศีวัน): ${cd.dayMaster}
- Solar Term — Major (大节气): ${cd.sartBig}
- Solar Term — Minor (小节气): ${cd.sartSml}
- Great Luck begins at age: ${cd.luckStart} years
- Luck Cycle Direction: ${cd.luckDir}
- Current Great Luck Period: ${curPStr}`;
}

export function buildPrompt1(cd, curPStr) {
  return chartHeader(cd, curPStr) + `

=== READING REQUEST #1: ELEMENT ANALYSIS & PERSONALITY ===

Please analyze this BaZi chart thoroughly and provide your reading in Thai language only.

**ส่วนที่ 1 — วิเคราะห์ราศีวัน ธาตุหลัก และเหมี่ยเก็ง (Life Palace)**
- ราศีวัน (Day Master) คืออะไร และมีพลังมาก/น้อย/กลาง อย่างไร
- วิเคราะห์เหมี่ยเก็ง (Life Palace): สอดคล้องหรือขัดแย้งกับดวงปาจื้ออย่างไร และส่งผลต่อพื้นฐานวาสนาอย่างไร
- ธาตุใดหนุนดวง ธาตุใดเป็นอุปสรรค (พิจารณาร่วมกับคงบ๊วง หากมี)
- สมดุลธาตุทั้ง 5 ในดวง (ขาด/เกิน อะไร)

**ส่วนที่ 2 — นิสัยและบุคลิกภาพ**
- บุคลิกโดดเด่น จุดแข็ง จุดอ่อน
- วิธีคิด วิธีทำงาน ความสัมพันธ์กับคนรอบข้าง
- สิ่งที่ทำให้มีความสุข สิ่งที่ทำให้เครียด

**ส่วนที่ 3 — สุขภาพและร่างกาย**
- อวัยวะหรือระบบที่ต้องระวังตามธาตุ
- ช่วงอายุที่ควรดูแลสุขภาพเป็นพิเศษ
- ข้อแนะนำด้านสุขภาพที่เหมาะกับดวง

**ส่วนที่ 4 — สี ทิศ ตัวเลขมงคล**
- สีที่เสริมพลังงาน
- ทิศที่เหมาะสำหรับที่อยู่อาศัย/การทำงาน
- ตัวเลขมงคลและสิ่งเสริมดวง

Please be specific, insightful, and write as an expert practitioner — not generic. Use Thai language throughout.`;
}

export function buildPrompt2(cd, curPStr) {
  return chartHeader(cd, curPStr) + `

=== READING REQUEST #2: CAREER & WEALTH ANALYSIS ===

Please analyze this BaZi chart and provide career and wealth insights in Thai language only.

**ส่วนที่ 1 — อาชีพที่เหมาะสม**
- อาชีพและสาขาที่สอดคล้องกับธาตุและดวงชะตา (ระบุชัดเจน เช่น แพทย์ / นักธุรกิจ / ศิลปิน ฯลฯ)
- ลักษณะการทำงานที่เหมาะ: อิสระ / องค์กร / ค้าขาย / วิชาชีพ
- อาชีพที่ควรหลีกเลี่ยงและเหตุผล

**ส่วนที่ 2 — ดวงการเงินและทรัพย์สิน**
- ดวงทรัพย์โดยรวม (ทรัพย์ตรง/ทรัพย์อ้อม ในดวง)
- แนวโน้มสะสมทรัพย์ตลอดชีวิต
- จุดแข็งและจุดเสี่ยงทางการเงิน

**ส่วนที่ 3 — ผลของวัยจรต่อการงานการเงิน**
Current Great Luck Period: ${curPStr}
- วัยจรนี้เอื้อหรือขัดต่อการงาน/ธุรกิจอย่างไร
- โอกาสที่ควรคว้า ความเสี่ยงที่ต้องระวัง
- จังหวะที่ดีสำหรับการเปลี่ยนงาน ลงทุน หรือเริ่มธุรกิจ

**ส่วนที่ 4 — คำแนะนำปฏิบัติ**
- กลยุทธ์สร้างรายได้ที่เหมาะกับดวง
- ข้อควรระวังทางการเงิน
- สิ่งที่ควรทำในช่วงนี้เพื่อเสริมดวงการงาน

Please be direct, practical, and detailed. Write entirely in Thai.`;
}

export function buildPrompt3(cd, curPStr) {
  return chartHeader(cd, curPStr) + `

=== READING REQUEST #3: LOVE, MARRIAGE & FAMILY ===

Please analyze this BaZi chart for relationship and family matters. Write entirely in Thai language.

**ส่วนที่ 1 — ดวงความรักและคู่ครอง**
- ลักษณะคู่ครองที่เหมาะสมตามดวงชะตา (ธาตุ นิสัย อาชีพ)
- ดวงความรักโดยรวม: มีโอกาสพบรักง่าย/ยาก อย่างไร
- ช่วงอายุที่เหมาะแก่การสร้างครอบครัว
- อุปสรรคในชีวิตคู่ที่ต้องระวัง

**ส่วนที่ 2 — ความสัมพันธ์กับครอบครัว**
- ความสัมพันธ์กับพ่อแม่ — ได้รับการสนับสนุน หรือต้องพึ่งตัวเอง
- ความสัมพันธ์กับพี่น้อง เพื่อน คนรอบข้าง
- ดวงบุตร — มีบุตรง่าย/ยาก ความสัมพันธ์ผู้ปกครอง-บุตร

**ส่วนที่ 3 — วัยจรกับชีวิตรักในปัจจุบัน**
Current Great Luck Period: ${curPStr}
- ช่วงวัยจรนี้ส่งผลต่อชีวิตคู่อย่างไร
- มีโอกาสพบคู่ / แต่งงาน / มีบุตร ในช่วงนี้หรือไม่
- ความเสี่ยงในความสัมพันธ์ที่ต้องระวัง

**ส่วนที่ 4 — คำแนะนำ**
- วิธีดูแลรักษาความสัมพันธ์ให้ยั่งยืน
- สิ่งที่ควรระวังในการเลือกคู่
- วิธีเสริมดวงความรักและครอบครัว

Write with depth and warmth, entirely in Thai language.`;
}

export function buildPrompt4(cd, curPStr) {
  const periodRows = cd.periods.map(p => {
    const hs = H[p.stem], eb = E[p.branch];
    if (!hs || !eb) return '';
    const sy = cd.birthBE + p.age, ey = cd.birthBE + p.age + 9;
    const isCur = cd.nowBE >= sy && cd.nowBE <= ey;
    return `  • Age ${String(p.age).padStart(2,'0')}–${String(p.age+9).padStart(2,'0')} (BE ${sy}–${ey}): ${hs.th}${hs.cn} / ${eb.th}${eb.cn} (${eb.an})${isCur ? ' ◀ CURRENT PERIOD' : ''}`;
  }).filter(Boolean).join('\n');

  return chartHeader(cd, curPStr) + `

=== COMPLETE GREAT LUCK CYCLE TABLE ===
${periodRows}

Current Year (流年): BE ${cd.nowBE}
Current Great Luck: ${curPStr}

=== READING REQUEST #4: DEEP LIFE ANALYSIS (COMPREHENSIVE) ===

This is a full deep-research BaZi reading. Write ENTIRELY in Thai language. Be thorough, insightful, and specific — not generic.

**บทที่ 1 — ภาพรวมดวงชะตาตลอดชีวิต**
- ช่วงวัยเด็กและวัยรุ่น (อิทธิพลจากครอบครัว สภาพแวดล้อมที่เติบโต)
- ช่วงวัยทำงาน (จุดพีค จุดตกต่ำ เหตุการณ์สำคัญ)
- ช่วงปลายชีวิต (ความมั่นคง ครอบครัว มรดก)

**บทที่ 2 — วิเคราะห์วัยจรแต่ละช่วงอย่างละเอียด**
- ธาตุของวัยจรกระทบดวงอย่างไร (เสริม/ขัด)
- เหตุการณ์สำคัญที่คาดว่าจะเกิดในช่วงนั้น
- โอกาสและความเสี่ยงที่โดดเด่น

**บทที่ 3 — ชีวิตปัจจุบัน (BE ${cd.nowBE})**
- การงานและธุรกิจ · การเงินและทรัพย์สิน
- ความรักและความสัมพันธ์ · สุขภาพกายและใจ
- สิ่งที่กำลังเปลี่ยนแปลงในชีวิต

**บทที่ 4 — พยากรณ์ 3 ปีข้างหน้า (${cd.nowBE}–${cd.nowBE + 2})**
- เหตุการณ์หรือโอกาสสำคัญที่ควรเตรียมตัว
- ช่วงเวลาที่ดาวดีและช่วงที่ต้องระวัง

**บทที่ 5 — คำแนะนำจากซินแส**
- สิ่งที่ควรทำทันทีเพื่อเสริมดวง
- สีมงคล · ทิศมงคล · ตัวเลขนำโชค

IMPORTANT: Minimum 1,000 words. All output in Thai only.`;
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

=== READING REQUEST #5: 10-DAY FORECAST ===

Forecast Period: ${days[0].trim()} ถึง ${days[9].trim()}

${days.join('\n')}

For EACH of the 10 days, provide:

═══════════════════════════════════════
📅 [วันที่ + วัน]
───────────────────────────────────────
💼 การงาน: [วิเคราะห์ด้านการงาน/ธุรกิจ/การตัดสินใจ]
💰 การเงิน: [ดวงการเงิน รายรับ รายจ่าย การลงทุน]
♥  ความรักและครอบครัว: [ความสัมพันธ์ การสื่อสาร]
🏥 สุขภาพ: [ร่างกาย จิตใจ พลังงาน ข้อควรระวัง]
🍀 โชคลาภ: [สิ่งมงคล โอกาส วันเฮง/วันระวัง]
═══════════════════════════════════════

After 10 days, add SUMMARY:
✅ วันที่ดีที่สุด / ⚠️ วันที่ต้องระวัง / 📌 คำแนะนำ 3–5 ข้อ

Day Master: ${cd.dayMaster} | Current Period: ${curPStr}
All output MUST be in Thai language only.`;
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
    const EXCEL_BASE = 2415018.5;
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
    gender:    gdr === 1 ? 'Male (ชาย)' : 'Female (หญิง)',
    yearPillar:  `${H[yp.stem].th} ${H[yp.stem].cn} (${H[yp.stem].el}) / ${E[yp.branch].th} ${E[yp.branch].cn} (${E[yp.branch].an}, ${E[yp.branch].el})`,
    monthPillar: `${H[mp.stem].th} ${H[mp.stem].cn} (${H[mp.stem].el}) / ${E[mp.branch].th} ${E[mp.branch].cn} (${E[mp.branch].an}, ${E[mp.branch].el})`,
    dayPillar:   `${H[dp.stem].th} ${H[dp.stem].cn} (${H[dp.stem].el}) / ${E[dp.branch].th} ${E[dp.branch].cn} (${E[dp.branch].an}, ${E[dp.branch].el})`,
    hourPillar:  `${H[hp.stem].th} ${H[hp.stem].cn} (${H[hp.stem].el}) / ${E[hp.branch].th} ${E[hp.branch].cn} (${E[hp.branch].an}, ${E[hp.branch].el})`,
    dayMaster:   `${H[dp.stem].th} ${H[dp.stem].cn} — ${H[dp.stem].el}`,
    sartBig:     fmtDate(sartBigJD),
    sartSml:     fmtDate(sartSmlJD),
    luckStart:   startAge.toFixed(1),
    luckDir:     dir === 1 ? 'Forward (順運)' : 'Reverse (逆運)',
    periods, nowBE, birthBE,
    mk, kongVuang, kvStatus
  };

  return [
    { label: '1 · ดวงธาตุ + นิสัย',    text: buildPrompt1(cd, curPStr) },
    { label: '2 · อาชีพ + การเงิน',     text: buildPrompt2(cd, curPStr) },
    { label: '3 · ความรัก + ครอบครัว',  text: buildPrompt3(cd, curPStr) },
    { label: '4 · ช่วงชีวิตวัยนี้',      text: buildPrompt4(cd, curPStr) },
    { label: '5 · ดวงรายสัปดาห์',       text: buildPrompt5(cd, curPStr) },
  ];
}
