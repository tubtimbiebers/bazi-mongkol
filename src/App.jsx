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
    // Scroll to results after a short delay to allow calculation
    setTimeout(() => {
      const resultsEl = document.getElementById('results-anchor');
      if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);

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

      <main>
        <InputPanel onCalculate={handleCalculate} />
        
        <div className="animate-in" style={{ 
          fontFamily: 'Outfit, sans-serif', 
          fontSize: '0.8rem', 
          color: 'var(--primary-light)', 
          textAlign: 'center',
          marginTop: '12px', 
          opacity: 0.5,
          letterSpacing: '1px' 
        }}>
          MASTERING THE FOUR PILLARS OF DESTINY
        </div>

        {error && (
          <div className="animate-in" style={{ marginTop: '24px' }}>
            <div className="errmsg">{error}</div>
          </div>
        )}

        <div id="results-anchor"></div>

        {result && (
          <div className="results-wrap">
            <PillarChart result={result} />
            <InfoCards   result={result} />
            <PromptGenerator prompts={prompts} />

            {/* Premium Consult CTA */}
            <div className="animate-in" style={{ textAlign: 'center', margin: '60px 0 20px' }}>
              <div className="div-orn">✦ ✦ ✦</div>
              
              <a
                href="https://lin.ee/YHGY6OI"
                target="_blank"
                rel="noopener noreferrer"
                className="btn hov-scale"
                style={{ 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
                  padding: '18px 48px',
                  boxShadow: '0 10px 30px rgba(139, 41, 255, 0.4)',
                  border: 'none',
                  color: '#fff'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="10" fill="#06C755"/>
                  <path d="M24 8C15.16 8 8 14.28 8 22c0 4.94 2.94 9.28 7.38 11.96L14 40l6.44-3.38C21.54 36.86 22.76 37 24 37c8.84 0 16-6.28 16-14S32.84 8 24 8z" fill="white"/>
                </svg>
                ปรึกษาซินแสนัท (LINE)
              </a>
              
              <div style={{ 
                fontFamily: 'Outfit, sans-serif', 
                fontSize: '0.85rem', 
                color: 'var(--primary-light)', 
                marginTop: '16px', 
                letterSpacing: '2px',
                fontWeight: '600',
                opacity: 0.8
              }}>
                @Royalnumber789 · PROFESSIONAL BAZI CONSULTANCY
              </div>
            </div>

            <div className="div-orn" style={{ opacity: 0.1 }}>✦ ✦ ✦</div>
          </div>
        )}
      </main>
      
      <footer style={{ textAlign: 'center', padding: '40px 0', opacity: 0.3, fontSize: '0.7rem' }}>
        © 2026 BAZI MONGKOL · POWERED BY CELESTIAL ALGORITHMS
      </footer>
    </div>
  );
}
