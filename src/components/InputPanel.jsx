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

  const fields = [
    { label: 'วัน',      name: 'dd', min: 1,    max: maxDay, type: 'number' },
    { label: 'เดือน',    name: 'mm', min: 1,    max: 12,     type: 'number' },
    { label: 'ปี พ.ศ.', name: 'yy', min: 2443,  max: 2643,   type: 'number' },
    { label: 'ชั่วโมง', name: 'hh', min: 0,    max: 23,     type: 'number' },
    { label: 'นาที',     name: 'mn', min: 0,    max: 59,     type: 'number' },
  ];

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="igrid">
        {fields.map(f => (
          <div className="ig" key={f.name}>
            <label>{f.label}</label>
            <input
              type="number"
              name={f.name}
              min={f.min}
              max={f.max}
              value={form[f.name]}
              onChange={handleChange}
            />
          </div>
        ))}
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
