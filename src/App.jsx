import "./App.css";
import React, { useState, useEffect } from 'react';
import { supabase } from "./supabaseClient";
import TaskManager from "./components/taskManager";
import Auth from "./components/auth";

const App = () => {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  }

  useEffect(() => {
    fetchSession();

    // listener
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // clean up -> prevent memory leaks
    return () => {
      authListener.subscription.unsubscribe;
    };

  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <div>
      {session ? (
        <>
          <button onClick={logout}>Log Out</button>
          <TaskManager session={session}/>
        </>
        ) : (
        <Auth />
        )}
    </div>
  )
}

export default App;


