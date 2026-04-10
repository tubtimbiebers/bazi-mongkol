import { useState, useEffect } from 'react';

function getDaysInMonth(mon, yrBE) {
  const yr = yrBE - 543;
  const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0;
  return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mon - 1] || 31;
}

export default function InputPanel({ onCalculate }) {
  const [form, setForm] = useState({ dd: 8, mm: 2, yy: 2512, hh: 9, mn: 54, gd: 1 });
  const [maxDay, setMaxDay] = useState(31);

  useEffect(() => {
    const m = getDaysInMonth(form.mm, form.yy);
    setMaxDay(m);
    if (form.dd > m) setForm(f => ({ ...f, dd: m }));
  }, [form.mm, form.yy]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: +value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCalculate({ day: form.dd, mon: form.mm, yrBE: form.yy, hr: form.hh, mi: form.mn, gdr: form.gd });
  };

  // Auto-calculate on mount
  useEffect(() => {
    onCalculate({ day: form.dd, mon: form.mm, yrBE: form.yy, hr: form.hh, mi: form.mn, gdr: form.gd });
  }, []);

  const years = Array.from({ length: 201 }, (_, i) => 2443 + i);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);
  const months = [
    { v: 1, t: '1 (ม.ค.)' }, { v: 2, t: '2 (ก.พ.)' }, { v: 3, t: '3 (มี.ค.)' },
    { v: 4, t: '4 (เม.ย.)' }, { v: 5, t: '5 (พ.ค.)' }, { v: 6, t: '6 (มิ.ย.)' },
    { v: 7, t: '7 (ก.ค.)' }, { v: 8, t: '8 (ส.ค.)' }, { v: 9, t: '9 (ก.ย.)' },
    { v: 10, t: '10 (ต.ค.)' }, { v: 11, t: '11 (พ.ย.)' }, { v: 12, t: '12 (ธ.ค.)' }
  ];

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="igrid">
        <div className="ig">
          <label>วัน</label>
          <select name="dd" value={form.dd} onChange={handleChange}>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="ig">
          <label>เดือน</label>
          <select name="mm" value={form.mm} onChange={handleChange}>
            {months.map(m => <option key={m.v} value={m.v}>{m.t}</option>)}
          </select>
        </div>
        <div className="ig">
          <label>ปี พ.ศ.</label>
          <select name="yy" value={form.yy} onChange={handleChange}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="ig">
          <label>ชั่วโมง</label>
          <select name="hh" value={form.hh} onChange={handleChange}>
            {hours.map(h => <option key={h} value={h}>{String(h).padStart(2, '0')}</option>)}
          </select>
        </div>
        <div className="ig">
          <label>นาที</label>
          <select name="mn" value={form.mn} onChange={handleChange}>
            {minutes.map(m => <option key={m} value={m}>{String(m).padStart(2, '0')}</option>)}
          </select>
        </div>
        <div className="ig">
          <label>เพศ</label>
          <select name="gd" value={form.gd} onChange={handleChange}>
            <option value={1}>ชาย</option>
            <option value={2}>หญิง</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn">⊕ คำนวณดวงชะตา</button>
    </form>
  );
}
