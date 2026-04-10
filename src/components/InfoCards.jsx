import { H, E, HIDDEN, JN, SS, js, jsE, siangsae, fmtDate } from '../utils/bazi.js';

function InfoCard({ title, rows }) {
  return (
    <div className="glass-panel icard hov-scale" style={{ padding: '24px', borderTop: '4px solid var(--primary)' }}>
      <h4 style={{ 
        fontFamily: 'Outfit, sans-serif', 
        fontSize: '0.8rem', 
        color: 'var(--primary-light)', 
        letterSpacing: '2px', 
        textTransform: 'uppercase',
        marginBottom: '20px',
        borderBottom: '1px solid var(--glass-border)',
        paddingBottom: '10px'
      }}>{title}</h4>
      {rows.map((r, i) => (
        <div className="irow" key={i} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '8px 0', 
          fontSize: '0.9rem',
          borderBottom: i === rows.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)'
        }}>
          <span className="ilbl" style={{ opacity: 0.5 }}>{r.label}</span>
          <span className={`ival${r.hi ? ' hi' : ''}`} style={{ ...r.style, textAlign: 'right', fontWeight: r.hi ? '600' : '400' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function ZodiacGrid({ result }) {
  const { yp, mp, dp, hp, tYp, tMp, periods, nowBE, birthBE } = result;

  const allZod = [
    { br:12, cn:'亥', th:'ไห',   an:'กุน',     bg: 'linear-gradient(135deg, rgba(139, 41, 255, 0.1), rgba(0, 210, 255, 0.1))', tc:'#a8d4f8' },
    { br:1,  cn:'子', th:'จื้อ', an:'ชวด',     bg: 'linear-gradient(135deg, rgba(139, 41, 255, 0.15), rgba(0, 210, 255, 0.12))', tc:'#a8d4f8' },
    { br:2,  cn:'丑', th:'ทิ่ว', an:'ฉลู',     bg: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(139, 41, 255, 0.1))', tc:'#fde89a' },
    { br:3,  cn:'寅', th:'อิ๊ง', an:'ขาล',     bg: 'linear-gradient(135deg, rgba(0, 255, 170, 0.1), rgba(139, 41, 255, 0.1))', tc:'#9de0a0' },
    { br:4,  cn:'卯', th:'เบ้า', an:'เถาะ',    bg: 'linear-gradient(135deg, rgba(0, 255, 170, 0.15), rgba(139, 41, 255, 0.12))', tc:'#9de0a0' },
    { br:5,  cn:'辰', th:'ซิ้ง', an:'มะโรง',  bg: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(139, 41, 255, 0.1))', tc:'#fde89a' },
    { br:6,  cn:'巳', th:'จี๋',  an:'มะเส็ง', bg: 'linear-gradient(135deg, rgba(255, 61, 113, 0.1), rgba(139, 41, 255, 0.1))', tc:'#f8aed0' },
    { br:7,  cn:'午', th:'โง่ว', an:'มะเมีย', bg: 'linear-gradient(135deg, rgba(255, 61, 113, 0.15), rgba(139, 41, 255, 0.12))', tc:'#f8aed0' },
    { br:8,  cn:'未', th:'บี่',  an:'มะแม',   bg: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(139, 41, 255, 0.1))', tc:'#fde89a' },
    { br:9,  cn:'申', th:'ซิม', an:'วอก',     bg: 'linear-gradient(135deg, rgba(224, 224, 255, 0.1), rgba(139, 41, 255, 0.1))', tc:'#d8d8d8' },
    { br:10, cn:'酉', th:'อิ้ว', an:'ระกา',   bg: 'linear-gradient(135deg, rgba(224, 224, 255, 0.15), rgba(139, 41, 255, 0.12))', tc:'#d8d8d8' },
    { br:11, cn:'戌', th:'สุก', an:'จอ',      bg: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(139, 41, 255, 0.1))', tc:'#fde89a' },
  ];

  const brLabels = {};
  const addLabel = (br, txt, clr) => {
    if (!brLabels[br]) brLabels[br] = [];
    brLabels[br].push({ txt, clr });
  };
  addLabel(yp.branch, '★ ปีชะตา',    '#ffd700');
  addLabel(mp.branch, '◆ เดือนชะตา', '#ffd700');
  addLabel(dp.branch, '■ วันชะตา',   '#ffd700');
  addLabel(hp.branch, '● ยามชะตา',   '#ffd700');
  addLabel(tYp.branch, '▶ ปีจร',     '#00d2ff');
  addLabel(tMp.branch, '▶ เดือนจร',  '#00d2ff');
  const curVay = periods.find(p => { const sy = birthBE + p.age, ey = birthBE + p.age + 9; return nowBE >= sy && nowBE <= ey; }) || periods[0];
  if (curVay) addLabel(curVay.branch, '◉ วัยจร', '#ff217e');

  return (
    <div className="zodiac-wrap animate-in" style={{ animationDelay: '1s' }}>
      <div className="glass-panel" style={{ 
        padding: '16px', 
        maxWidth: '800px', 
        margin: '0 auto',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <div className="zodiac-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '8px' 
        }}>
          {allZod.map((z, zi) => {
            const labs = brLabels[z.br] || [];
            const hasNatal   = labs.some(l => l.clr === '#ffd700');
            const hasTransit = labs.some(l => l.clr === '#00d2ff');
            const hasVay     = labs.some(l => l.clr === '#ff217e');
            
            const border = hasNatal ? '1px solid #ffd700' : hasTransit ? '1px solid #00d2ff' : hasVay ? '1px solid #ff217e' : '1px solid rgba(255,255,255,0.05)';
            const shadow = hasNatal ? '0 0 20px rgba(255,215,0,0.15)' : hasTransit ? '0 0 15px rgba(0,210,255,0.1)' : hasVay ? '0 0 15px rgba(255,33,126,0.1)' : 'none';
            
            return (
              <div key={zi} className="zod hov-scale" style={{ 
                background: z.bg, 
                color: z.tc, 
                border, 
                boxShadow: shadow,
                padding: '12px 6px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'var(--transition-smooth)',
                backdropFilter: 'blur(8px)',
                position: 'relative'
              }}>
                <span className="zcn" style={{ fontSize: '1.4rem', fontWeight: '800', lineHeight: 1 }}>{z.cn}</span>
                <span className="zth" style={{ fontSize: '0.8rem', marginTop: '4px', fontWeight: '600' }}>{z.th}</span>
                <span className="zan" style={{ fontSize: '0.65rem', opacity: 0.6 }}>{z.an}</span>
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                  {labs.map((l, li) => (
                    <span key={li} className="zbadge" style={{ 
                      color: l.clr, 
                      fontSize: '0.55rem', 
                      fontWeight: '800', 
                      background: 'rgba(0,0,0,0.4)',
                      padding: '1px 4px',
                      borderRadius: '3px',
                      whiteSpace: 'nowrap'
                    }}>{l.txt}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VayjornTable({ result }) {
  const { periods, birthBE, dp, mon } = result;
  const dayStem = dp.stem;
  
  return (
    <div className="vt-wrap glass-panel animate-in" style={{ padding: '0', overflow: 'hidden', animationDelay: '1.2s' }}>
      <table className="vt" style={{ borderCollapse: 'separate', borderSpacing: '0 8px', width: '100%', padding: '12px' }}>
        <thead>
          <tr style={{ background: 'transparent' }}>
            <th style={{ padding: '12px 20px', borderRadius: '8px 0 0 8px' }}>ช่วงอายุ</th>
            <th>ราศีฟ้า (Stem)</th>
            <th>ราศีดิน (Branch)</th>
            <th>จับซิ้งบน</th>
            <th>จับซิ้งล่าง</th>
            <th>เซี่ยงแซ</th>
            <th style={{ borderRadius: '0 8px 8px 0' }}>ธาตุ</th>
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

            const ageStr = sMo > 0 ? `${sYr}.${sMo}` : `${sYr}`;
            const endAgeStr = eMo > 0 ? `${eYr}.${eMo}` : `${eYr}`;

            const sy = birthBE + Math.floor((totalMoStart + (mon - 1)) / 12);
            const ey = birthBE + Math.floor((totalMoEnd + (mon - 1)) / 12);

            const now = new Date();
            const nowBE = now.getFullYear() + 543;
            const curMonthsElapsed = (nowBE - birthBE) * 12 + now.getMonth() - (mon - 1);
            const cur = curMonthsElapsed >= totalMoStart && curMonthsElapsed < totalMoEnd;

            return (
              <tr key={i} className={cur ? 'now' : ''} style={{ 
                background: cur ? 'rgba(139, 41, 255, 0.25)' : 'rgba(255,255,255,0.02)',
                transition: 'var(--transition-smooth)'
              }}>
                <td style={{ textAlign: 'left', padding: '16px 20px', borderRadius: '12px 0 0 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="vt-age" style={{ fontSize: '1.2rem', fontWeight: '700', color: cur ? '#fff' : 'var(--paper)' }}>{ageStr}–{endAgeStr}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <span className="vt-yr" style={{ fontSize: '0.75rem', opacity: 0.6 }}>พ.ศ. {sy}–{ey}</span>
                       {cur && <span style={{ color: 'var(--secondary)', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px' }}>CURRENT</span>}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span className={`vt-cn ${hs.c}`} style={{ fontSize: '1.6rem', fontWeight: '800' }}>{hs.cn}</span>
                  <span className="vt-th" style={{ display: 'block', fontSize: '0.85rem' }}>{hs.th}</span>
                </td>
                <td style={{ padding: '16px 8px' }}>
                  <span className={`vt-cn ${eb.c}`} style={{ fontSize: '1.6rem', fontWeight: '800' }}>{eb.cn}</span>
                  <span className="vt-th" style={{ display: 'block', fontSize: '0.85rem' }}>{eb.th} {eb.an}</span>
                </td>
                <td className="vt-js" style={{ fontWeight: '700', color: 'var(--primary-light)' }}>{jsH ? JN[jsH].th : '—'}</td>
                <td className="vt-js" style={{ fontWeight: '700', color: 'var(--primary-light)' }}>{jsEb ? JN[jsEb].th : '—'}</td>
                <td className="vt-js" style={{ fontSize: '0.8rem', opacity: 0.8 }}>{SS[ss] || '—'}</td>
                <td style={{ fontSize: '0.75rem', color: 'var(--primary-light)', borderRadius: '0 12px 12px 0' }}>{hs.el}</td>
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
    yr, mon, day, hr, mi, gdr, 
    sartBigJD, sartSmlJD, dir
  } = result;
  
  const dayStem = dp.stem;
  const mkHs = H[mk.stem], mkEb = E[mk.branch];
  const { y, m, d } = result.luckAge;
  const startAgeStr = `${y} ปี ${m} เดือน ${d} วัน`;

  return (
    <div className="animate-in" style={{ animationDelay: '0.6s' }}>
      <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '40px' }}>
        <InfoCard title="Birth Profile" rows={[
          { label: 'Date', value: `${day}/${mon}/${yr + 543}` },
          { label: 'Time', value: `${String(hr).padStart(2,'0')}:${String(mi).padStart(2,'0')} น.` },
          { label: 'Gender', value: gdr === 1 ? 'ชาย (Male)' : 'หญิง (Female)' },
          { label: 'Pillar', value: `${H[yp.stem].th}${E[yp.branch].th}`, hi: true },
        ]} />
        <InfoCard title="Life Palace (เหมี่ยเก็ง)" rows={[
          { label: 'Sign', value: `${mkHs.th}${mkEb.th} (${mkHs.cn}${mkEb.cn})`, hi: true },
          { label: 'Status', value: result.kvStatus.mk ? 'คงบ๊วง 空亡' : 'ปกติ', style: { color: result.kvStatus.mk ? '#ff6b6b' : 'inherit' } },
          { label: 'Element', value: mkHs.el },
          { label: 'Ten Gods', value: `${JN[mk.jsH]?.th || '—'} / ${JN[mk.jsEb]?.th || '—'}` },
        ]} />
        <InfoCard title="Solar Terms & Luck" rows={[
          { label: 'Big Term', value: fmtDate(sartBigJD), style: { fontSize: '0.75rem' } },
          { label: 'Small Term', value: fmtDate(sartSmlJD), style: { fontSize: '0.75rem' } },
          { label: 'Luck Start', value: `อายุ ${startAgeStr}`, hi: true },
          { label: 'Direction', value: dir === 1 ? 'Forward (順)' : 'Reverse (逆)' },
        ]} />
        <InfoCard title="Day Master (ดิถี)" rows={[
          { label: 'DM ราศีวัน', value: `${H[dayStem].th} ${H[dayStem].cn}`, hi: true },
          { label: 'Element', value: H[dayStem].el },
          { label: 'Phase', value: SS[siangsae(dayStem, dp.branch)] },
          { label: 'Kong Vuang', value: `${E[result.kongVuang[0]].th}${E[result.kongVuang[0]].cn} - ${E[result.kongVuang[1]].th}${E[result.kongVuang[1]].cn}`, hi: true },
        ]} />
      </div>

      <div className="sec animate-in" style={{ animationDelay: '0.9s', marginTop: '60px' }}>🎴 นักษัตรและฤดูกาล (Zodiac Map)</div>
      <ZodiacGrid result={result} />

      <div className="sec animate-in" style={{ animationDelay: '1.1s', marginTop: '60px' }}>🕰️ วัยจร ถนนชีวิต (Luck Pillars)</div>
      <VayjornTable result={result} />
    </div>
  );
}
