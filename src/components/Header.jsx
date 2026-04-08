export default function Header() {
  return (
    <header>
      <div className="orn">✦ ✦ ✦</div>
      <div className="h1th">ปาจื้อ ซาจู</div>
      <h1>ดูดวงมงคลด้วยตัวเอง</h1>
      <div className="orn" style={{fontSize:'.85rem'}}>八 字 命 盤</div>
      <div className="hline"></div>
      <div style={{marginTop:'10px',fontFamily:'Georgia,serif'}}>
        <div style={{fontSize:'clamp(.85rem,2.5vw,1.1rem)',color:'var(--gold-l)',letterSpacing:'1px'}}>
          โดย <span style={{color:'#fff',fontWeight:'600'}}>ซินแสนัท</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',marginTop:'10px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'5px 18px',border:'1px solid rgba(212,168,67,.4)',borderRadius:'20px'}}>
            <span style={{fontSize:'clamp(.72rem,2vw,.88rem)',color:'var(--gold)',letterSpacing:'1.5px'}}>📞 086-987-4656</span>
          </div>
          <div style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'5px 18px',border:'1px solid rgba(212,168,67,.4)',borderRadius:'20px'}}>
            <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#06C755"/>
              <path d="M24 8C15.16 8 8 14.28 8 22c0 4.94 2.94 9.28 7.38 11.96L14 40l6.44-3.38C21.54 36.86 22.76 37 24 37c8.84 0 16-6.28 16-14S32.84 8 24 8z" fill="white"/>
              <path d="M17 24.5v-5h1.5v5H17zm3.5 0v-5H22v2h2v1.5h-2v1.5h-1.5zm4 0v-5H26c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-1.5zm1.5-3.5v2h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5H26zm3 3.5v-5h3.5V21H30v1h2v1.5h-2v1h2.5v1.5H30z" fill="#06C755"/>
            </svg>
            <span style={{fontSize:'clamp(.72rem,2vw,.88rem)',color:'var(--gold)',letterSpacing:'1.5px'}}>Line: @Royalnumber789</span>
          </div>
        </div>
      </div>

      {/* Donation box */}
      <div className="donation-box">
        <div style={{color:'var(--gold)',letterSpacing:'1px',marginBottom:'4px',fontSize:'.63rem'}}>🙏 ร่วมสนับสนุน</div>
        <div style={{color:'var(--paper)',opacity:'.8',marginBottom:'4px'}}>ถ้าชอบ อยากร่วมสนับสนุนตามศรัทธา</div>
        <div style={{height:'1px',background:'rgba(212,168,67,.25)',margin:'5px 0'}}></div>
        <div style={{color:'var(--gold-l)',fontSize:'.6rem'}}>ธนาคารไทยพาณิชย์</div>
        <div style={{color:'#fff',fontWeight:'700',letterSpacing:'1.5px',fontSize:'.75rem',margin:'2px 0'}}>095-273-6537</div>
        <div style={{color:'var(--paper)',opacity:'.55',fontSize:'.58rem'}}>นายฐเดช ทับทิมรณยุทธ</div>
        <div style={{color:'var(--gold)',opacity:'.5',fontSize:'.58rem',marginTop:'3px'}}>ขอบพระคุณครับ 🙏</div>
      </div>
    </header>
  );
}
