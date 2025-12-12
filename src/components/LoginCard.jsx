function LoginCard({ loginForm, setLoginForm, onSubmit, error, loading }) {
  return (
    <div className="card">
      <h1>Login</h1>
      <p className="muted">Use the seeded account to continue.</p>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            placeholder="test@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, password: e.target.value }))
            }
            required
            placeholder="Password123!"
          />
        </label>
        {error && (
          <p className="error">
            {error} Please double-check and try again.
          </p>
        )}
        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <div className="hint">
        <strong>Demo credentials</strong>
        <div>test@example.com / Password123!</div>
      </div>
    </div>
  );
}

export default LoginCard;

