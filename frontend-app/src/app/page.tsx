'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize zero-cost public Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [telemetry, setTelemetry] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check Auth State on Free Tier
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Fetch synchronized architecture metrics from Fly.io/Supabase API bridge
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1/data`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTelemetry(data.telemetry);
      })
      .catch((err) => console.error('Bridge API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Edge-Deployed Micro-Telemetry</h1>
        <p style={{ color: '#94a3b8' }}>Real-time synchronization between Cloudflare Edge and Fly.io compute matrix.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3>Identity Services Status</h3>
          <p style={{ color: session ? '#4ade80' : '#f87171' }}>
            {session ? `Authenticated as: ${session.user.email}` : 'Anonymous Gateway Access Enabled'}
          </p>
        </div>

        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3>Database Telemetry Cache</h3>
          {loading ? (
            <p>Evaluating upstream cluster...</p>
          ) : (
            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '4px', overflowX: 'auto', fontSize: '0.85rem' }}>
              {JSON.stringify(telemetry, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
