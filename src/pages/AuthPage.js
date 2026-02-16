import React, { useState } from 'react';

function AuthPage() {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const isLogin = authMode === 'login';

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setFeedback({ type: '', text: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedEmail || !trimmedPassword || (!isLogin && !trimmedName)) {
      setFeedback({ type: 'danger', text: 'Please fill all required fields.' });
      return;
    }

    if (trimmedPassword.length < 6) {
      setFeedback({ type: 'danger', text: 'Password must be at least 6 characters.' });
      return;
    }

    const successText = isLogin
      ? `Login successful for ${trimmedEmail}`
      : `Signup successful. Welcome, ${trimmedName}!`;

    setFeedback({ type: 'success', text: successText });
    window.alert(successText);

    setFormData((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      password: '',
    }));
  };

  return (
    <section className="auth-section">
      <div className="card auth-card border-0 mx-auto">
        <div className="card-body p-3">
          {feedback.text && (
            <div className={`alert alert-${feedback.type} py-2`} role="alert">
              {feedback.text}
            </div>
          )}

          <div className="d-flex gap-2 mb-3 auth-toggle-wrap">
            <button
              type="button"
              className={`btn w-50 auth-toggle-btn ${isLogin ? 'btn-warning' : 'btn-outline-light'}`}
              onClick={() => switchAuthMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`btn w-50 auth-toggle-btn ${!isLogin ? 'btn-warning' : 'btn-outline-light'}`}
              onClick={() => switchAuthMode('signup')}
            >
              Signup
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label" htmlFor="signupName">
                  Full Name
                </label>
                <input
                  id="signupName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your name"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label" htmlFor={isLogin ? 'loginEmail' : 'signupEmail'}>
                Email
              </label>
              <input
                id={isLogin ? 'loginEmail' : 'signupEmail'}
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor={isLogin ? 'loginPassword' : 'signupPassword'}>
                Password
              </label>
              <input
                id={isLogin ? 'loginPassword' : 'signupPassword'}
                name="password"
                type="password"
                placeholder={isLogin ? 'Enter password' : 'Create password'}
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 auth-submit-btn">
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>

          <div className="auth-divider my-3">
            <span>or</span>
          </div>

          <div className="d-grid gap-2">
            <button type="button" className="btn btn-outline-light auth-social-btn">
              <i className="bi bi-google me-2" />
              Continue with Google
            </button>
            <button type="button" className="btn btn-outline-light auth-social-btn">
              <i className="bi bi-github me-2" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
