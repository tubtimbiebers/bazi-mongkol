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
    <>
      <div className="sec">AI Prompt Generator · สร้าง Prompt ทำนายดวง</div>

      <div className="howto">
        <div className="howto-title">วิธีใช้งาน</div>
        <div className="howto-steps">
          {[
            ['กดปุ่ม ', '⊕ Copy Prompt', ' ในหัวข้อที่ต้องการ เพื่อคัดลอก prompt ไปยัง clipboard'],
            ['เปิด AI ที่คุณใช้งาน เช่น ', 'ChatGPT', ' หรือ ', 'Google Gemini'],
            ['วาง Prompt ลงในกล่องข้อความ ', 'พร้อมแนบรูปดวง', ' ที่เซฟไว้ด้วย'],
            ['เลือก Model — ', 'ChatGPT:', ' ใช้ o3 หรือ GPT-4o · ', 'Gemini:', ' ใช้ Gemini 2.0 Flash Thinking'],
            ['กด ', 'Generate', ' เพื่อดูคำทำนาย — ', 'ขอให้โชคดี ✦', ''],
          ].map((parts, idx) => (
            <div className="howto-step" key={idx}>
              <span className="howto-num">{idx + 1}</span>
              <span>
                {parts.map((p, pi) => pi % 2 === 0
                  ? <span key={pi}>{p}</span>
                  : <span key={pi} className={pi === parts.length - 1 ? 'dim' : 'hl'}>{p}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="prompt-sec">
        <div className="prompt-tabs">
          {PROMPT_LABELS.map((lbl, i) => (
            <div key={i} className={`ptab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>
              {lbl}
            </div>
          ))}
        </div>

        {prompts.map((p, i) => (
          <div key={i} style={{ display: activeTab === i ? 'block' : 'none' }}>
            <div className="pbox">{p.text}</div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <button
                className={`copy-btn${copiedIdx === i ? ' copied' : ''}`}
                onClick={() => handleCopy(i)}
              >
                {copiedIdx === i ? '✓ Copied!' : '⊕ Copy Prompt'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
