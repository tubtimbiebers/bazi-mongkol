import { H, E, HIDDEN, JN, SS, js, jsE, siangsae } from '../utils/bazi.js';

function HiddenRows({ branch, dayStem, isDay }) {
  const hidStems = HIDDEN[branch].filter(Boolean);
  return hidStems.map((s, i) => {
    const hv = H[s]; if (!hv) return null;
    const jsi = isDay ? null : js(dayStem, s);
    return (
      <div className="hid-row" key={i} style={{textAlign:'left',paddingLeft:'4px'}}>
        <span className={hv.c} style={{fontSize:'.9rem',lineHeight:'1.1'}}>{hv.cn}</span>
        <span style={{fontSize:'.62rem',marginLeft:'3px'}}>{hv.th}</span>
        {jsi && <span style={{fontSize:'.58rem',opacity:'.5',marginLeft:'3px'}}>{JN[jsi].th}</span>}
      </div>
    );
  });
}

function Pillar({ lbl, stem, branch, dayStem, isDay = false, isTransit = false, isKV = false }) {
  const hs  = H[stem];
  const eb  = E[branch];
  const jsH = isDay ? null : js(dayStem, stem);
  const jsEb = jsE(dayStem, branch);
  const ss  = siangsae(dayStem, branch);

  return (
    <div className="pillar" style={isTransit ? { borderColor:'rgba(212,168,67,.45)',boxShadow:'0 0 16px rgba(212,168,67,.1)' } : {}}>
      <div className="pl-hd" style={isTransit ? { background:'rgba(212,168,67,.22)' } : {}}>{lbl}</div>
      <div className="pl-hs">
        <span className={`cn ${hs.c}`}>{hs.cn}</span>
        <span className="th">{hs.th}</span>
        <span className="el">{hs.el}</span>
      </div>
      <div className="pl-eb" style={isKV ? { border: '2px solid #ff6b6b', background: 'rgba(255,107,107,0.08)' } : {}}>
        <span className={`cn ${eb.c}`}>{eb.cn}</span>
        <span className="th">{eb.th} · {eb.an}</span>
        <span className="an">{eb.el}</span>
        {isKV && <div style={{color:'#ff6b6b',fontSize:'.65rem',fontWeight:'700',marginTop:'3px'}}>คงบ๊วง 空亡</div>}
        <div style={{borderTop:'1px dashed rgba(212,168,67,.18)',marginTop:'8px',paddingTop:'7px'}}>
          <HiddenRows branch={branch} dayStem={dayStem} isDay={isDay} />
        </div>
        <div style={{fontSize:'.57rem',opacity:'.4',marginTop:'5px',textAlign:'center'}}>{SS[ss] || ''}</div>
      </div>
      <div className="pl-js">
        {isDay ? 'ตัวเอง' : (jsH ? JN[jsH].th : 'ตัวเอง')}
        {jsEb ? ` / ${JN[jsEb].th}` : ''}
      </div>
    </div>
  );
}

export default function PillarChart({ result }) {
  const { yp, mp, dp, hp, mk, tYp, tMp, tDp, tHp, tDate, kvStatus } = result;
  const dayStem = dp.stem;

  const pillars = [
    { lbl: 'เสาเวลา 時', ...hp, isDay: false, isKV: kvStatus.hp },
    { lbl: 'เสาวัน 日',  ...dp, isDay: true,  isKV: kvStatus.dp },
    { lbl: 'เสาเดือน 月',...mp, isDay: false, isKV: kvStatus.mp },
    { lbl: 'เสาปี 年',   ...yp, isDay: false, isKV: kvStatus.yp },
  ];

  const transit = [
    { lbl: 'ยามจร 時',   ...tHp, isDay: false },
    { lbl: 'วันจร 日',   ...tDp, isDay: true  },
    { lbl: 'เดือนจร 月', ...tMp, isDay: false },
    { lbl: 'ปีจร 年',    ...tYp, isDay: false },
  ];

  const nowStr = `${tDate.d}/${tDate.m}/${tDate.y + 543} ${String(tDate.h).padStart(2,'0')}:${String(tDate.mi).padStart(2,'0')} น.`;

  return (
    <>
      <div className="sec">四柱命盤 สี่เสาดวงชะตา</div>
      <div className="pgrid-wrap">
        <div className="pgrid">
          {pillars.map((p, i) => (
            <Pillar key={i} {...p} dayStem={dayStem} />
          ))}
        </div>
      </div>

      <div className="sec">流年流月 ดวงจร · {nowStr}</div>
      <div className="pgrid-wrap">
        <div className="pgrid">
          {transit.map((p, i) => (
            <Pillar key={i} {...p} dayStem={dayStem} isTransit={true} />
          ))}
        </div>
      </div>
    </>
  );
}
