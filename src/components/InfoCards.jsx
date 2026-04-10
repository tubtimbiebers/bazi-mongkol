import { H, E, HIDDEN, JN, SS, js, jsE, siangsae, fmtDate } from '../utils/bazi.js';

function InfoCard({ title, rows }) {
  return (
    <div className="icard">
      <h4>{title}</h4>
      {rows.map((r, i) => (
        <div className="irow" key={i}>
          <span className="ilbl">{r.label}</span>
          <span className={`ival${r.hi ? ' hi' : ''}`} style={r.style}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function ZodiacGrid({ result }) {
  const { yp, mp, dp, hp, tYp, tMp, periods, nowBE, birthBE } = result;

  const ZR = [
    { label: 'ฤดูหนาว 冬', items: [
      { br:12, cn:'亥', th:'ไห',   an:'กุน',     bg:'#0d3b6e', tc:'#a8d4f8' },
      { br:1,  cn:'子', th:'จื้อ', an:'ชวด',     bg:'#0d3b6e', tc:'#a8d4f8' },
      { br:2,  cn:'丑', th:'ทิ่ว', an:'ฉลู',     bg:'#6b4c0a', tc:'#fde89a' },
    ]},
    { label: 'ฤดูใบไม้ผลิ 春', items: [
      { br:3,  cn:'寅', th:'อิ๊ง', an:'ขาล',     bg:'#1a4a20', tc:'#9de0a0' },
      { br:4,  cn:'卯', th:'เบ้า', an:'เถาะ',    bg:'#1a4a20', tc:'#9de0a0' },
      { br:5,  cn:'辰', th:'ซิ้ง', an:'มะโรง',  bg:'#6b4c0a', tc:'#fde89a' },
    ]},
    { label: 'ฤดูร้อน 夏', items: [
      { br:6,  cn:'巳', th:'จี๋',  an:'มะเส็ง', bg:'#6e0d3b', tc:'#f8aed0' },
      { br:7,  cn:'午', th:'โง่ว', an:'มะเมีย', bg:'#6e0d3b', tc:'#f8aed0' },
      { br:8,  cn:'未', th:'บี่',  an:'มะแม',   bg:'#6b4c0a', tc:'#fde89a' },
    ]},
    { label: 'ฤดูใบไม้ร่วง 秋', items: [
      { br:9,  cn:'申', th:'ซิม', an:'วอก',     bg:'#2a2a2a', tc:'#d8d8d8' },
      { br:10, cn:'酉', th:'อิ้ว', an:'ระกา',   bg:'#2a2a2a', tc:'#d8d8d8' },
      { br:11, cn:'戌', th:'สุก', an:'จอ',      bg:'#6b4c0a', tc:'#fde89a' },
    ]},
  ];

  // Build branch labels
  const brLabels = {};
  const addLabel = (br, txt, clr) => {
    if (!brLabels[br]) brLabels[br] = [];
    brLabels[br].push({ txt, clr });
  };
  addLabel(yp.branch, '★ ปีชะตา',    '#ffd700');
  addLabel(mp.branch, '◆ เดือนชะตา', '#ffd700');
  addLabel(dp.branch, '■ วันชะตา',   '#ffd700');
  addLabel(hp.branch, '● ยามชะตา',   '#ffd700');
  addLabel(tYp.branch, '▶ ปีจร',     '#a8d4f8');
  addLabel(tMp.branch, '▶ เดือนจร',  '#a8d4f8');
  const curVay = periods.find(p => { const sy = birthBE + p.age, ey = birthBE + p.age + 9; return nowBE >= sy && nowBE <= ey; }) || periods[0];
  if (curVay) addLabel(curVay.branch, '◉ วัยจร', '#f8aed0');

  return (
    <div className="zodiac-wrap">
      {ZR.map((row, ri) => (
        <div key={ri}>
          <div className="zodiac-row-label">{row.label}</div>
          <div className="zodiac-grid">
            {row.items.map((z, zi) => {
              const labs = brLabels[z.br] || [];
              const hasNatal   = labs.some(l => l.clr === '#ffd700');
              const hasTransit = labs.some(l => l.clr === '#a8d4f8');
              const hasVay     = labs.some(l => l.clr === '#f8aed0');
              const border = hasNatal ? '2px solid #ffd700' : hasTransit ? '2px solid #a8d4f8' : hasVay ? '2px solid #f8aed0' : '1px solid rgba(0,0,0,.25)';
              const shadow = hasNatal ? '0 0 12px rgba(255,215,0,.5)' : hasTransit ? '0 0 8px rgba(168,212,248,.4)' : hasVay ? '0 0 8px rgba(248,174,208,.4)' : 'none';
              return (
                <div key={zi} className="zod" style={{ background: z.bg, color: z.tc, border, boxShadow: shadow }}>
                  <span className="zcn">{z.cn}</span>
                  <span className="zth">{z.th}</span>
                  <span className="zan">{z.an}</span>
                  {labs.map((l, li) => (
                    <span key={li} className="zbadge" style={{ color: l.clr }}>{l.txt}</span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function VayjornTable({ result }) {
  const { periods, birthBE, dp, mon } = result;
  const dayStem = dp.stem;
  
  return (
    <div className="vt-wrap">
      <table className="vt">
        <thead>
          <tr>
            <th>ช่วงอายุ</th>
            <th>ราศีฟ้า</th>
            <th>ราศีดิน</th>
            <th>จับซิ้งบน<br/><small style={{opacity:'.6'}}>Heaven God</small></th>
            <th>จับซิ้งล่าง<br/><small style={{opacity:'.6'}}>Earth God</small></th>
            <th>เซี่ยงแซ<br/><small style={{opacity:'.6'}}>12 Phase</small></th>
            <th>ธาตุ</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((p, i) => {
            const hs   = H[p.stem], eb = E[p.branch];
            const jsH  = js(dayStem, p.stem);
            const jsEb = jsE(dayStem, p.branch);
            const ss   = siangsae(dayStem, p.branch);
            
            const totalMoStart = Math.floor(p.age * 12);
            const sYr = Math.floor(totalMoStart / 12);
            const sMo = totalMoStart % 12;

            const totalMoEnd = Math.floor((p.age + 10) * 12);
            const eYr = Math.floor(totalMoEnd / 12);
            const eMo = totalMoEnd % 12;

            const ageStr = sMo > 0 ? `${sYr}ปี ${sMo}ด.` : `${sYr}ปี`;
            const endAgeStr = eMo > 0 ? `${eYr}ปี ${eMo}ด.` : `${eYr}ปี`;

            // Calculate precise BE interval
            const sy = birthBE + Math.floor((totalMoStart + (mon - 1)) / 12);
            const ey = birthBE + Math.floor((totalMoEnd + (mon - 1)) / 12);

            // Determine if it is the current period
            const now = new Date();
            const nowBE = now.getFullYear() + 543;
            const curMonthsElapsed = (nowBE - birthBE) * 12 + now.getMonth() - (mon - 1);
            const cur = curMonthsElapsed >= totalMoStart && curMonthsElapsed < totalMoEnd;

            return (
              <tr key={i} className={cur ? 'now' : ''}>
                <td>
                  <span className="vt-age">{ageStr} – {endAgeStr}</span>
                  <span className="vt-yr">{sy}–{ey}{cur ? ' ◀ ปัจจุบัน' : ''}</span>
                </td>
                <td><span className={`vt-cn ${hs.c}`}>{hs.cn}</span><span className="vt-th">{hs.th}</span></td>
                <td><span className={`vt-cn ${eb.c}`}>{eb.cn}</span><span className="vt-th">{eb.th} {eb.an}</span></td>
                <td className="vt-js">{jsH ? <>{JN[jsH].th}<span className="vt-jscn">{JN[jsH].cn}</span></> : '—'}</td>
                <td className="vt-js">{jsEb ? <>{JN[jsEb].th}<span className="vt-jscn">{JN[jsEb].cn}</span></> : '—'}</td>
                <td className="vt-js" style={{fontSize:'.68rem'}}>{SS[ss] || '—'}</td>
                <td style={{fontSize:'.72rem'}}>{hs.el}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function InfoCards({ result }) {
  const { 
    yp, mp, dp, hp, mk, 
    periods, nowBE, birthBE, 
    startAge, dir, sartBigJD, sartSmlJD, 
    yr, mon, day, hr, mi, gdr 
  } = result;
  
  const dayStem = dp.stem;
  const mkHs = H[mk.stem], mkEb = E[mk.branch];

  const { y, m, d } = result.luckAge;
  const startAgeStr = `${y} ปี ${m} เดือน ${d} วัน`;

  return (
    <>
      <div className="info-grid">
        <InfoCard title="ข้อมูลเกิด" rows={[
          { label: 'วันเกิด', value: `${day}/${mon}/${yr + 543}` },
          { label: 'เวลา',    value: `${String(hr).padStart(2,'0')}:${String(mi).padStart(2,'0')} น.` },
          { label: 'เพศ',     value: gdr === 1 ? 'ชาย' : 'หญิง' },
          { label: 'ปีกะจื้อ', value: `${H[yp.stem].th}${E[yp.branch].th}`, hi: true },
        ]} />
        <InfoCard title="เหมี่ยเก็ง (Life Palace)" rows={[
          { label: 'ราศีเหมี่ยเก็ง', value: `${mkHs.th}${mkEb.th} (${mkHs.cn}${mkEb.cn})`, hi: true },
          { label: 'สถานะ',         value: result.kvStatus.mk ? 'คงบ๊วง 空亡' : 'ปกติ', style: { color: result.kvStatus.mk ? '#ff6b6b' : 'inherit', fontWeight: result.kvStatus.mk ? '700' : 'normal' } },
          { label: 'ธาตุ',         value: `${mkHs.el}`, style: { color: mkHs.c === 'ef' || mkHs.c === 'ef2' ? '#ff6b6b' : 'inherit' } },
          { label: 'จับซิ้ง บน/ล่าง', value: `${JN[mk.jsH]?.th || '—'} / ${JN[mk.jsEb]?.th || '—'}`, style: { fontSize: '.7rem' } },
          { label: 'เซี่ยงแซ',      value: SS[mk.ss] },
        ]} />
        <InfoCard title="สาร์ทใหญ่ · สาร์ทเล็ก" rows={[
          { label: 'สาร์ทใหญ่',  value: fmtDate(sartBigJD), hi: true, style: {fontSize:'.7rem'} },
          { label: 'สาร์ทเล็ก',  value: fmtDate(sartSmlJD), style: {fontSize:'.7rem'} },
          { label: 'วัยจรเริ่ม', value: `อายุ ${startAgeStr}`, hi: true },
          { label: 'ทิศวัยจร',   value: dir === 1 ? 'ไปหน้า 順' : 'ถอยหลัง 逆' },
        ]} />
        <InfoCard title="ราศีวัน · ธาตุ" rows={[
          { label: 'ราศีวัน',      value: `${H[dayStem].th} ${H[dayStem].cn}`, hi: true },
          { label: 'ธาตุ',         value: H[dayStem].el },
          { label: 'เซี่ยงแซวัน', value: SS[siangsae(dayStem, dp.branch)] },
          { label: 'คงบ๊วงประตัว', value: `${E[result.kongVuang[0]].th}${E[result.kongVuang[0]].cn} - ${E[result.kongVuang[1]].th}${E[result.kongVuang[1]].cn}`, hi: true },
          { label: 'ยาม',          value: `${E[hp.branch].th} (ยาม${hp.yam})` },
        ]} />
      </div>

      <div className="sec">十二地支 นักษัตร · ฤดูกาล</div>
      <ZodiacGrid result={result} />

      <div className="sec">大運 ถนนสิบปี · วัยจร</div>
      <VayjornTable result={result} />
    </>
  );
}
