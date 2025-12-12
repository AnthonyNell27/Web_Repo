function HeaderBar({ auth, onLogout }) {
  return (
    <header className="header">
      <div>
        <p className="muted">Welcome back</p>
        <h2>{auth.user?.name || auth.user?.email}</h2>
      </div>
      <div className="header-actions">
        <span className="tag">Logged in</span>
        <button className="ghost" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default HeaderBar;

