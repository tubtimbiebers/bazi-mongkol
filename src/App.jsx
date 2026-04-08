import { useState } from 'react';
import Header from './components/Header.jsx';
import InputPanel from './components/InputPanel.jsx';
import PillarChart from './components/PillarChart.jsx';
import InfoCards from './components/InfoCards.jsx';
import PromptGenerator from './components/PromptGenerator.jsx';
import { calculateBazi } from './utils/bazi.js';
import { buildAllPrompts } from './utils/prompts.js';

export default function App() {
  const [result, setResult] = useState(null);
  const [error,  setError]  = useState('');
  const [prompts, setPrompts] = useState([]);

  const handleCalculate = (params) => {
    setError('');
    try {
      const res = calculateBazi(params);
      setResult(res);
      setPrompts(buildAllPrompts(res));
    } catch (e) {
      setError('Error: ' + e.message);
      console.error(e);
    }
  };

  return (
    <div className="wrap">
      <Header />

      <InputPanel onCalculate={handleCalculate} />
      <div style={{ fontFamily: 'Georgia,serif', fontSize: '.72rem', color: 'rgba(212,168,67,.6)', marginTop: '6px', letterSpacing: '.5px' }}>
        * ไม่ทราบเวลาเกิด ให้ใส่ 00.00
      </div>

      {error && <div className="errmsg" style={{ marginTop: '16px' }}>{error}</div>}

      {result && (
        <div className="results-wrap">
          <PillarChart result={result} />
          <InfoCards   result={result} />
          <PromptGenerator prompts={prompts} />

          {/* Consult button */}
          <div style={{ textAlign: 'center', margin: '20px 0 10px' }}>
            <a
              href="https://lin.ee/YHGY6OI"
              target="_blank"
              rel="noopener"
              className="consult-btn"
            >
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="10" fill="#06C755"/>
                <path d="M24 8C15.16 8 8 14.28 8 22c0 4.94 2.94 9.28 7.38 11.96L14 40l6.44-3.38C21.54 36.86 22.76 37 24 37c8.84 0 16-6.28 16-14S32.84 8 24 8z" fill="white"/>
              </svg>
              ✦ ปรึกษาซินแส ✦
            </a>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: '.72rem', color: 'rgba(212,168,67,.6)', marginTop: '8px', letterSpacing: '2px' }}>
              LINE: @Royalnumber789 · โดยซินแสนัท
            </div>
          </div>

          <div className="div-orn">✦ ✦ ✦</div>
        </div>
      )}
    </div>
  );
}
