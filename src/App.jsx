import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('login');
  const [userName, setUserName] = useState('');

  function handleLogin(name) {
    setUserName(name);
    setPage('dashboard');
  }

  return (
    <div className="app">
      {page === 'login' && <LoginPage onLogin={handleLogin} onNavigate={setPage} />}
      {page === 'signup' && <SignupPage onLogin={handleLogin} onNavigate={setPage} />}
      {page === 'dashboard' && <DashboardPage userName={userName} onNavigate={setPage} />}
    </div>
  );
}

/* ── LOGIN PAGE ──────────────────────────────── */
function LoginPage({ onLogin, onNavigate }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name.trim());
  };

  return (
    <div className="auth-layout">
      <div className="auth-hero">
        <div className="logo">🛡️ WeatherShield AI</div>
        <h1>Protect your earnings from unpredictable weather.</h1>
        <p>AI-powered insurance for delivery partners. Get automatic payouts when extreme weather hits.</p>
      </div>

      <div className="auth-form-side">
        <div className="form-card">
          <h2>Welcome back</h2>
          <p className="subtitle">Enter your details to access your dashboard.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary">Login →</button>
          </form>

          <p className="auth-link">
            Don't have an account?{' '}
            <button className="link-btn" onClick={() => onNavigate('signup')}>Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── SIGNUP PAGE ─────────────────────────────── */
function SignupPage({ onLogin, onNavigate }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name.trim());
  };

  return (
    <div className="auth-layout">
      <div className="auth-hero">
        <div className="logo">🛡️ WeatherShield AI</div>
        <h1>Join the future of delivery protection.</h1>
        <p>Takes less than 2 minutes to secure your income.</p>
      </div>

      <div className="auth-form-side">
        <div className="form-card">
          <h2>Create Account</h2>
          <p className="subtitle">Get protected earnings starting today.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary">Sign Up →</button>
          </form>

          <p className="auth-link">
            Already have an account?{' '}
            <button className="link-btn" onClick={() => onNavigate('login')}>Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── DASHBOARD PAGE ──────────────────────────── */
function DashboardPage({ userName, onNavigate }) {
  const [selectedPlan, setSelectedPlan] = useState(30);
  const [weather, setWeather] = useState(null);

  const plans = [
    { price: 30, coverage: 500 },
    { price: 50, coverage: 800, popular: true },
    { price: 80, coverage: 1200 },
  ];

  const earnings = plans.find(p => p.price === selectedPlan)?.coverage;

  const weatherOptions = [
    { id: 'rain',   icon: '🌧️', label: 'Heavy Rain',   type: 'success', message: '₹500 credited to your account!' },
    { id: 'heat',   icon: '🌡️', label: 'Extreme Heat', type: 'warning', message: '₹300 credited to your account!' },
    { id: 'normal', icon: '☀️', label: 'Normal',        type: 'info',    message: 'No payout. Weather conditions are normal.' },
  ];

  const currentWeather = weatherOptions.find(w => w.id === weather);

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="logo-sm">🛡️ WeatherShield AI</div>
        <button className="logout-btn" onClick={() => onNavigate('login')}>Logout</button>
      </header>

      <div className="greeting">
        <h1>Hello, <span className="highlight">{userName || 'there'}</span> 👋</h1>
        <p>Manage your protection plans and simulate payouts.</p>
      </div>

      <div className="dashboard-grid">

        {/* Worker Details */}
        <div className="card worker-card">
          <div className="worker-info">
            <div className="avatar">👤</div>
            <div>
              <h3>{userName || 'Delivery Worker'}</h3>
              <span className="badge badge-blue">Delivery Partner</span>
            </div>
          </div>
          <div className="detail-row">
            <span>Selected Plan</span>
            <strong>₹{selectedPlan}/week</strong>
          </div>
          <div className="detail-row">
            <span>Risk Level</span>
            <strong className="badge badge-orange">Medium</strong>
          </div>
          <div className="earnings-box">
            <span>Earnings Protected</span>
            <div className="earnings-amount">₹{earnings}</div>
            <small>per extreme weather event</small>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="card">
          <h2>🛡️ Select Protection Plan</h2>
          <p className="subtitle">Choose the coverage that fits your weekly goals.</p>
          <div className="plan-list">
            {plans.map(plan => (
              <button
                key={plan.price}
                className={`plan-btn ${selectedPlan === plan.price ? 'plan-active' : ''}`}
                onClick={() => setSelectedPlan(plan.price)}
              >
                {plan.popular && <span className="popular-badge">POPULAR</span>}
                <div className="plan-price">₹{plan.price}<span>/week</span></div>
                <div className="plan-coverage">Protects <strong>₹{plan.coverage}</strong> per event</div>
                <div className={`plan-radio ${selectedPlan === plan.price ? 'radio-active' : ''}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Weather Simulation */}
        <div className="card">
          <h2>🌦️ Weather Simulator</h2>
          <p className="subtitle">Trigger a weather event to test your payout.</p>
          <div className="weather-buttons">
            {weatherOptions.map(w => (
              <button
                key={w.id}
                className={`weather-btn weather-btn-${w.id} ${weather === w.id ? 'weather-active' : ''}`}
                onClick={() => setWeather(w.id)}
              >
                <span className="weather-icon">{w.icon}</span>
                <span>{w.label}</span>
              </button>
            ))}
          </div>

          {currentWeather && (
            <div className={`payout-status payout-${currentWeather.type}`}>
              <div className="payout-icon">
                {currentWeather.type === 'success' && '✅'}
                {currentWeather.type === 'warning' && '⚠️'}
                {currentWeather.type === 'info' && 'ℹ️'}
              </div>
              <div>
                <strong>Payout Status</strong>
                <p>{currentWeather.message}</p>
              </div>
            </div>
          )}

          {!weather && (
            <div className="payout-placeholder">
              Click a weather button above to simulate a payout.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
