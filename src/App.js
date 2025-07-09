import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { AuthProvider, useAuth } from './AuthProvider';
import VisitForm from './VisitForm';
import CalendarView from './CalendarView';

function AppInner() {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);

  const fetch = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('visits')
      .select('*')
      .eq('user_id', user.id)
      .order('date');
    setVisits(data);
  };

  useEffect(() => fetch(), [user]);
  if (!user) return <button onClick={() => supabase.auth.signInWithMagicLink({ email: prompt('Your email') })}>Log in</button>;

  return (
    <div className="container">
      <h1>Co-Parenting Calendar</h1>
      <VisitForm onSaved={fetch} />
      <CalendarView visits={visits} />
      <button onClick={() => supabase.auth.signOut()}>Log Out</button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
