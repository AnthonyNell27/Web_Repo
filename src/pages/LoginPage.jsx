import LoginCard from '../components/LoginCard';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login, loginError, loginLoading, auth } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const ok = await login(loginForm);
    if (ok) {
      setLoginForm({ email: '', password: '' });
      navigate('/');
    }
  };

  // If already logged in, bounce to home
  if (auth) {
    navigate('/');
    return null;
  }

  return (
    <div className="page">
      <LoginCard
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        onSubmit={handleLogin}
        error={loginError}
        loading={loginLoading}
      />
    </div>
  );
}

export default LoginPage;

