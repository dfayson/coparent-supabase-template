import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthProvider';

export default function VisitForm({ onSaved }) {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Exercised');
  const [parent, setParent] = useState('');
  const [child, setChild] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    await supabase
      .from('visits')
      .insert([{
        user_id: user.id,
        date,
        status,
        parent,
        child,
        notes: '',
      }]);
    setDate(''); setStatus('Exercised'); setParent(''); setChild('');
    onSaved();
  };

  return (
    <form onSubmit={handleSave} className="space-y-2">
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Parent" value={parent} onChange={e => setParent(e.target.value)} required />
      <input placeholder="Child" value={child} onChange={e => setChild(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>Exercised</option>
        <option>Missed</option>
      </select>
      <button type="submit" className="btn">Add Visit</button>
    </form>
  );
}
