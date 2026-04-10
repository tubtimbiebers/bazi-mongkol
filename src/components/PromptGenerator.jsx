import { useState } from 'react';

const PROMPT_LABELS = [
  '1 · ดวงธาตุ + นิสัย',
  '2 · อาชีพ + การเงิน',
  '3 · ความรัก + ครอบครัว',
  '4 · ช่วงชีวิตวัยนี้',
  '5 · ดวงรายสัปดาห์',
];

export default function PromptGenerator({ prompts }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = async (idx) => {
    const text = prompts[idx]?.text || '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="animate-in" style={{ animationDelay: '1.4s' }}>
      <div className="sec">AI Prompt Generator · พรอมต์ทำนายดวง</div>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ color: 'var(--primary-light)', fontVariant: 'small-caps', letterSpacing: '2px', fontWeight: '700', marginBottom: '16px', fontSize: '0.9rem' }}>
          Instruction Guide / วิธีใช้งาน
        </div>
        <div className="howto-steps" style={{ display: 'grid', gap: '12px' }}>
          {[
            ['Copy Prompt ที่ต้องการไปยัง Clipboard'],
            ['แนบรูปดวงชะตา ไปยัง AI (ChatGPT/Gemini)'],
            ['เลือก Model ระดับสูง (o3-mini / GPT-4o / Gemini 2.0 Flash Thinking)'],
            ['กดส่งข้อมูลและรอรับคำทำนายเชิงลึก ✨'],
          ].map((parts, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
              <span style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: 'var(--primary)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.75rem',
                flexShrink: 0
              }}>{idx + 1}</span>
              <span style={{ opacity: 0.85 }}>{parts[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="prompt-container">
        <div className="prompt-tabs" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
          {PROMPT_LABELS.map((lbl, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(i)}
              style={{
                padding: '10px 20px',
                background: activeTab === i ? 'var(--primary)' : 'rgba(139, 41, 255, 0.05)',
                color: '#fff',
                border: activeTab === i ? 'none' : '1px solid var(--glass-border)',
                borderRadius: '8px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-smooth)',
                boxShadow: activeTab === i ? '0 4px 15px rgba(139, 41, 255, 0.4)' : 'none'
              }}
            >
              {lbl}
            </button>
          ))}
        </div>

        {prompts.map((p, i) => (
          <div key={i} style={{ display: activeTab === i ? 'block' : 'none' }}>
            <div className="pbox" style={{ 
              background: 'rgba(5, 5, 30, 0.7)', 
              fontSize: '0.8rem', 
              lineHeight: '1.8', 
              maxHeight: '400px', 
              overflowY: 'auto',
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
              padding: '24px',
              color: 'var(--paper)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              whiteSpace: 'pre-wrap',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {p.text}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                className={`btn ${copiedIdx === i ? 'copied' : ''}`}
                onClick={() => handleCopy(i)}
                style={{ 
                  margin: '0 auto', 
                  fontSize: '0.95rem', 
                  padding: '14px 48px',
                  background: copiedIdx === i ? '#00c853' : 'linear-gradient(135deg, var(--primary-light), var(--primary))',
                  color: '#fff',
                  boxShadow: copiedIdx === i ? '0 0 20px rgba(0,200,83,0.4)' : '0 8px 25px rgba(139, 41, 255, 0.4)'
                }}
              >
                {copiedIdx === i ? '✓ Copied Successfully!' : '⊕ Copy Prompt for AI'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
