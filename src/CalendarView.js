import { useMemo } from 'react';
export default function CalendarView({ visits }) {
  const byDate = useMemo(() => {
    const map = {};
    visits.forEach(v => {
      map[v.date] = map[v.date] || [];
      map[v.date].push(v);
    });
    return map;
  }, [visits]);

  return (
    <div className="calendar-grid">
      {Object.entries(byDate).map(([date, vs]) => (
        <div key={date} className="day-cell">
          <strong>{date}</strong>
          <ul>
            {vs.map(v => (
              <li key={v.id}>{v.parent} — {v.status}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
