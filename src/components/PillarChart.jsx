import { H, E, HIDDEN, JN, SS, js, jsE, siangsae } from '../utils/bazi.js';

function HiddenRows({ branch, dayStem, isDay }) {
  const hidStems = HIDDEN[branch].filter(Boolean);
  return hidStems.map((s, i) => {
    const hv = H[s]; if (!hv) return null;
    const jsi = isDay ? null : js(dayStem, s);
    return (
      <div className="hid-row" key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '2px 0' }}>
        <span className={hv.c} style={{ fontSize: '1.1rem', fontWeight: '700' }}>{hv.cn}</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{hv.th}</span>
        {jsi && <span style={{ fontSize: '0.65rem', color: 'var(--gold)', opacity: 0.6 }}>{JN[jsi].th}</span>}
      </div>
    );
  });
}

function Pillar({ lbl, stem, branch, dayStem, isDay = false, isTransit = false, isKV = false, index }) {
  const hs  = H[stem];
  const eb  = E[branch];
  const jsH = isDay ? null : js(dayStem, stem);
  const jsEb = jsE(dayStem, branch);
  const ss  = siangsae(dayStem, branch);

  return (
    <div 
      className="pillar animate-in" 
      style={{ 
        animationDelay: `${0.3 + index * 0.1}s`,
        border: isKV ? '2px solid #ff6b6b' : '1px solid var(--glass-border)',
        boxShadow: isKV ? '0 0 20px rgba(255, 107, 107, 0.2)' : ''
      }}
    >
      <div className="pl-hd">{lbl}</div>
      <div className="pl-hs">
        <span className={`cn ${hs.c}`}>{hs.cn}</span>
        <span className="th">{hs.th}</span>
        <span className="el">{hs.el}</span>
      </div>
      
      <div className="pl-eb">
        <span className={`cn ${eb.c}`}>{eb.cn}</span>
        <span className="th">{eb.th} · {eb.an}</span>
        <span className="el" style={{ fontSize: '0.65rem', opacity: 0.5, marginTop: '2px', display: 'block' }}>{eb.el}</span>
        
        {isKV && (
          <div style={{ color: '#ff6b6b', fontSize: '0.7rem', fontWeight: '800', marginTop: '8px', letterSpacing: '1px' }}>
            空亡 คงบ๊วง
          </div>
        )}
        
        <div style={{ borderTop: '1px dashed var(--glass-border)', marginTop: '12px', paddingTop: '10px' }}>
          <HiddenRows branch={branch} dayStem={dayStem} isDay={isDay} />
        </div>
        
        <div style={{ fontSize: '0.6rem', color: 'var(--gold)', opacity: 0.5, marginTop: '8px' }}>
          {SS[ss] || '—'}
        </div>
      </div>
      
      <div className="pl-js">
        {isDay ? 'ดิถีตัวเอง' : (jsH ? JN[jsH].th : 'ตัวเอง')}
        {jsEb ? ` / ${JN[jsEb].th}` : ''}
      </div>
    </div>
  );
}

export default function PillarChart({ result }) {
  const { yp, mp, dp, hp, mk, tYp, tMp, tDp, tHp, tDate, kvStatus } = result;
  const dayStem = dp.stem;

  const pillars = [
    { lbl: 'ยาม 時', ...hp, isDay: false, isKV: kvStatus.hp },
    { lbl: 'วัน 日',  ...dp, isDay: true,  isKV: kvStatus.dp },
    { lbl: 'เดือน 月',...mp, isDay: false, isKV: kvStatus.mp },
    { lbl: 'ปี 年',   ...yp, isDay: false, isKV: kvStatus.yp },
  ];

  const transit = [
    { lbl: 'ยามจร 時',   ...tHp, isDay: false },
    { lbl: 'วันจร 日',   ...tDp, isDay: true  },
    { lbl: 'เดือนจร 月', ...tMp, isDay: false },
    { lbl: 'ปีจร 年',    ...tYp, isDay: false },
  ];

  const nowStr = `${tDate.d}/${tDate.m}/${tDate.y + 543} ${String(tDate.h).padStart(2,'0')}:${String(tDate.mi).padStart(2,'0')} น.`;

  return (
    <div className="results-container">
      <div className="sec animate-in" style={{ animationDelay: '0.4s' }}>
        <span style={{ fontSize: '1.5rem' }}>🀩</span> สี่เสาดวงชะตา (Four Pillars)
      </div>
      
      <div className="pgrid">
        {pillars.map((p, i) => (
          <Pillar key={'p'+i} index={i} {...p} dayStem={dayStem} />
        ))}
      </div>

      <div className="sec animate-in" style={{ animationDelay: '0.8s' }}>
        <span style={{ fontSize: '1.5rem' }}>🌀</span> ดวงพยากรณ์จร (Transits) · {nowStr}
      </div>
      
      <div className="pgrid">
        {transit.map((p, i) => (
          <Pillar key={'t'+i} index={i + 4} {...p} dayStem={dayStem} isTransit={true} />
        ))}
      </div>
    </div>
  );
}
