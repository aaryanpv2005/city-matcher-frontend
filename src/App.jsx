import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, LogOut, User, MapPin, Sliders, Shield, CircleUser, Mail, ArrowRight, Activity, Cpu, HelpCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState({ name: '', email: '' });
  const [loginInput, setLoginInput] = useState({ name: '', email: '' });

  const [preferences, setPreferences] = useState({
    cost_of_living: 5, safety: 5, tech_jobs: 5, non_tech_jobs: 5, infrastructure: 5, weather: 5
  });
  const [weights, setWeights] = useState({
    cost_of_living: 3, safety: 3, tech_jobs: 3, non_tech_jobs: 3, infrastructure: 3, weather: 3
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const attributes = ['cost_of_living', 'safety', 'tech_jobs', 'non_tech_jobs', 'infrastructure', 'weather'];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginInput.name || !loginInput.email) {
      alert("Please enter both your name and email address.");
      return;
    }
    setUser({ name: loginInput.name, email: loginInput.email });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser({ name: '', email: '' });
    setLoginInput({ name: '', email: '' });
    setResults(null);
    setCurrentPage('login');
  };

  const handlePreferenceChange = (attr, val) => {
    let num = parseInt(val);
    if (isNaN(num)) num = '';
    if (num > 10) num = 10;
    if (num < 1 && num !== '') num = 1;
    setPreferences({ ...preferences, [attr]: num });
  };

  const handleWeightChange = (attr, val) => {
    let num = parseInt(val);
    if (isNaN(num)) num = '';
    if (num > 5) num = 5;
    if (num < 1 && num !== '') num = 1;
    setWeights({ ...weights, [attr]: num });
  };

  const handleCalculate = async () => {
    const finalPreferences = { ...preferences };
    const finalWeights = { ...weights };
    
    for (let key in finalPreferences) {
      if (finalPreferences[key] === '') finalPreferences[key] = 5;
    }
    for (let key in finalWeights) {
      if (finalWeights[key] === '') finalWeights[key] = 3;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/recommend', {
        preferences: finalPreferences,
        weights: finalWeights
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert("Communication error! Ensure your Python Uvicorn engine is online on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    bg: '#0B0F19',
    surface: 'rgba(30, 41, 59, 0.7)',
    border: 'rgba(51, 65, 85, 0.8)',
    primary: '#10B981',
    primaryGlow: 'rgba(16, 185, 129, 0.25)',
    secondary: '#F59E0B',
    textMain: '#F8FAFC',
    textMuted: '#94A3B8'
  };

  return (
    <div style={{ 
      background: `radial-gradient(circle at 50% 0%, #1E1B4B 0%, ${theme.bg} 70%)`, 
      minHeight: '100vh', color: theme.textMain, fontFamily: 'Segoe UI, system-ui, sans-serif', paddingBottom: '80px'
    }}>
      
      {/* GLOBAL HIGH-TECH NAVIGATION BAR */}
      <nav style={{ 
        background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', padding: '16px 40px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`,
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: theme.primaryGlow, padding: '8px', borderRadius: '10px', display: 'flex' }}>
            <MapPin size={24} color={theme.primary} />
          </div>
          <span style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px', color: theme.primary }}>MATCH YOUR CITY</span>
        </div>
        
        {user.name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '6px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '800' }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: theme.textMuted }}>{user.email}</div>
              </div>
              <CircleUser size={28} color={theme.primary} />
            </div>
            <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* VIEW 1: REGISTRATION PORTAL */}
        {currentPage === 'login' && (
          <div style={{ maxWidth: '460px', margin: '60px auto', background: theme.surface, backdropFilter: 'blur(16px)', padding: '40px', borderRadius: '24px', border: `1px solid ${theme.border}`, boxSizing: 'border-box', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <h2 style={{ fontSize: '30px', margin: '0 0 8px 0', fontWeight: '900' }}>Get System Access</h2>
              <p style={{ color: theme.textMuted, margin: 0, fontSize: '14px' }}>Analyze metrics across premium urban networks.</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: theme.textMuted, marginBottom: '8px', fontWeight: 'bold' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: theme.textMuted }} />
                  <input type="text" placeholder="Aaryan Sharma" required value={loginInput.name} onChange={(e) => setLoginInput({...loginInput, name: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 45px', background: 'rgba(15,23,42,0.6)', border: `1px solid ${theme.border}`, borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: theme.textMuted, marginBottom: '8px', fontWeight: 'bold' }}>Email Endpoint</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: theme.textMuted }} />
                  <input type="email" placeholder="aaryan@gmail.com" required value={loginInput.email} onChange={(e) => setLoginInput({...loginInput, email: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 45px', background: 'rgba(15,23,42,0.6)', border: `1px solid ${theme.border}`, borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <button type="submit" style={{ width: '100%', background: theme.primary, color: '#fff', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Establish Core Session <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* VIEW 2: PROFILE DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div>
            <div style={{ background: `linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)`, padding: '50px', borderRadius: '24px', marginBottom: '35px', border: `1px solid ${theme.border}`, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
              <h1 style={{ fontSize: '42px', fontWeight: '900', margin: '0 0 14px 0' }}>Welcome, <span style={{ color: theme.primary }}>{user.name}</span></h1>
              <p style={{ color: theme.textMuted, fontSize: '17px', margin: '0 0 30px 0' }}>Your profile details are loaded. Press the button below to inputs your parameters and find your city match.</p>
              <button onClick={() => setCurrentPage('matcher')} style={{ background: theme.primary, color: '#fff', padding: '16px 36px', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: `0 8px 25px ${theme.primaryGlow}` }}>
                Configure Parameters & Interests <Sliders size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
              <div style={{ background: theme.surface, padding: '26px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                <span style={{ fontSize: '13px', color: theme.textMuted, display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>USER PROFILE NAME</span>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{user.name}</div>
              </div>
              <div style={{ background: theme.surface, padding: '26px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                <span style={{ fontSize: '13px', color: theme.textMuted, display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>USER EMAIL ID</span>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{user.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MATCHING INTERFACE GRID */}
        {currentPage === 'matcher' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0 }}>Parameter Matrix Input</h2>
              <button onClick={() => setCurrentPage('dashboard')} style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.textMain, padding: '12px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: '700' }}>
                Return to Dashboard
              </button>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: `1px solid rgba(16, 185, 129, 0.25)`, padding: '20px 25px', borderRadius: '16px', marginBottom: '35px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <HelpCircle size={24} color={theme.primary} />
              <div style={{ fontSize: '14px' }}>
                <strong style={{ color: '#fff' }}>System Regulations:</strong> Input ranking scales values from <strong style={{ color: theme.primary }}>1 (Worst Ranking)</strong> up to <strong style={{ color: theme.primary }}>10 (Best Ranking)</strong>. Importance weights scale from 1 to 5.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '35px', marginBottom: '45px' }}>
              <div style={{ background: theme.surface, padding: '30px', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                <h3 style={{ color: theme.primary, marginTop: 0, marginBottom: '25px' }}><Activity size={18} /> 1. User Metric Preferences (1 - 10)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {attributes.map(attr => (
                    <div key={attr} style={{ background: 'rgba(15,23,42,0.4)', padding: '16px', borderRadius: '12px' }}>
                      <label style={{ display: 'block', textTransform: 'capitalize', fontSize: '13px', marginBottom: '10px', color: '#E2E8F0' }}>{attr.replace(/_/g, ' ')}</label>
                      <input type="number" min="1" max="10" value={preferences[attr]} onChange={(e) => handlePreferenceChange(attr, e.target.value)} style={{ width: '100%', padding: '12px', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.primary, textAlign: 'center', outline: 'none', fontWeight: 'bold', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: theme.surface, padding: '30px', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                <h3 style={{ color: theme.secondary, marginTop: 0, marginBottom: '25px' }}><Shield size={18} /> 2. Core Priority Importance Weights (1 - 5)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {attributes.map(attr => (
                    <div key={attr} style={{ background: 'rgba(15,23,42,0.4)', padding: '16px', borderRadius: '12px' }}>
                      <label style={{ display: 'block', textTransform: 'capitalize', fontSize: '13px', marginBottom: '10px', color: '#E2E8F0' }}>{attr.replace(/_/g, ' ')} Weight</label>
                      <input type="number" min="1" max="5" value={weights[attr]} onChange={(e) => handleWeightChange(attr, e.target.value)} style={{ width: '100%', padding: '12px', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.secondary, textAlign: 'center', outline: 'none', fontWeight: 'bold', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button onClick={handleCalculate} disabled={loading} style={{ background: theme.primary, color: '#fff', border: 'none', padding: '18px 60px', fontSize: '18px', borderRadius: '40px', cursor: 'pointer', fontWeight: '900', boxShadow: `0 8px 30px ${theme.primaryGlow}` }}>
                {loading ? 'Processing System Matrix...' : 'Calculate Best City Match'}
              </button>
            </div>

            {results && (
              <div style={{ marginTop: '60px' }}>
                <div style={{ background: 'linear-gradient(90deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)', borderLeft: `6px solid ${theme.primary}`, padding: '35px', borderRadius: '16px', marginBottom: '45px', borderTop: `1px solid ${theme.border}`, borderRight: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
                  <h2 style={{ margin: '0 0 14px 0', fontSize: '26px', fontWeight: '900' }}>👑 Crown Destination: <span style={{ color: theme.primary }}>{results.top_match}</span></h2>
                  <p style={{ fontSize: '16px', lineHeight: '1.75', color: '#E2E8F0', fontStyle: 'italic', margin: 0 }}>"{results.ai_explanation}"</p>
                </div>
                
                <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px' }}>Ranked Projections</h3>
                <div style={{ overflowX: 'auto', background: theme.surface, borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', color: '#E2E8F0' }}>
                    <thead>
                      <tr style={{ background: 'rgba(30,41,59,0.9)', textAlign: 'left', borderBottom: `2px solid ${theme.border}` }}>
                        <th style={{ padding: '18px' }}>Rank</th>
                        <th style={{ padding: '18px' }}>City</th>
                        <th style={{ padding: '18px' }}>State</th>
                        <th style={{ padding: '18px' }}>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.all_results.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)', background: idx === 0 ? 'rgba(16,185,129,0.04)' : 'transparent' }}>
                          <td style={{ padding: '18px', fontWeight: 'bold', color: idx === 0 ? theme.primary : theme.textMuted }}>#{idx + 1}</td>
                          <td style={{ padding: '18px', fontWeight: '800', color: '#fff' }}>{item.City}</td>
                          <td style={{ padding: '18px', color: theme.textMuted }}>{item.State}</td>
                          <td style={{ padding: '18px', fontWeight: 'bold', color: idx === 0 ? theme.primary : '#fff' }}>{item.Match_Score} pts</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;