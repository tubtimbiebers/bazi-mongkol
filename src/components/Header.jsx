export default function Header() {
  return (
    <header className="animate-in" style={{ position: 'relative', padding: '60px 0 40px' }}>
      {/* Logos */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ color: 'var(--secondary)', fontSize: '1rem', fontWeight: '700', marginBottom: '14px', letterSpacing: '1px' }}>
          ❖ รับรองโดย ❖
        </div>
        <div className="logo-row">
          <img
            src="/logo1.jpg"
            alt="วิหารต้าเทียนเซียน"
            className="logo-img"
            style={{ 
              width: '150px', 
              height: '150px', 
              background: '#fff', 
              padding: '4px', 
              borderRadius: '32px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}
          />
          <img src="/logo2.png" alt="มูลนิธิสว่างธรรมสุข" className="logo-img" />
        </div>
      </div>

      <div className="heading-secondary" style={{ marginBottom: '8px' }}>✦ ✦ ✦</div>
      <div className="heading-secondary" style={{ fontSize: '0.9rem', opacity: 0.6 }}>ปาจื้อ ซาจู</div>
      <h1 className="heading-primary">ดูดวงมงคลด้วยตัวเอง</h1>
      <div className="heading-secondary" style={{ fontSize: '1rem', letterSpacing: '4px' }}>八 字 命 盤</div>

      <div className="hline" style={{ width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', margin: '24px auto' }}></div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--primary-light)' }}>
          โดย <span style={{ color: '#fff', fontWeight: '700' }}>ซินแสนัท</span>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div className="glass-panel" style={{ padding: '8px 20px', borderRadius: '40px', fontSize: '0.9rem', color: 'var(--primary-light)' }}>
            📞 086-987-4656
          </div>
          <a
            href="https://lin.ee/YHGY6OI"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel"
            style={{ padding: '8px 20px', borderRadius: '40px', fontSize: '0.9rem', color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#06C755" />
              <path d="M24 8C15.16 8 8 14.28 8 22c0 4.94 2.94 9.28 7.38 11.96L14 40l6.44-3.38C21.54 36.86 22.76 37 24 37c8.84 0 16-6.28 16-14S32.84 8 24 8z" fill="white" />
            </svg>
            Line: @Royalnumber789
          </a>
        </div>
      </div>

      {/* Support Box – absolute on desktop, stacked on mobile (via CSS class) */}
      <div className="glass-panel hov-scale support-box">
        <div style={{ color: 'var(--secondary)', fontWeight: '800', marginBottom: '8px', letterSpacing: '1px', fontSize: '0.85rem' }}>
          🙏 สนับสนุนซินแส
        </div>
        <p style={{ opacity: 0.7, marginBottom: '16px', lineHeight: '1.4' }}>ร่วมสืบทอดวิชาดวงจีน<br />ส่งเสริมวิทยาทาน</p>

        <div style={{ background: 'rgba(5, 5, 30, 0.6)', borderRadius: '12px', padding: '14px 10px', border: '1px solid var(--glass-border)' }}>
          <div style={{ color: 'var(--primary-light)', fontSize: '0.65rem', marginBottom: '6px', fontWeight: '600' }}>ธนาคารไทยพาณิชย์</div>
          <div style={{ color: '#fff', fontWeight: '800', fontSize: '1rem', letterSpacing: '1px' }}>095-273-6537</div>
          <p style={{ opacity: 0.6, fontSize: '0.65rem', marginTop: '8px' }}>นายฐเดช ทับทิมรณยุทธ</p>
        </div>

        <div style={{ color: 'var(--primary-light)', opacity: 0.5, fontSize: '0.65rem', marginTop: '12px' }}>ขอบพระคุณครับ 🙏</div>
      </div>
    </header>
  );
}
