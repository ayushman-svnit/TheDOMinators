import { useState } from "react";
import AuthForm from "../components/AuthForm";
import OwnerDashboard from "../components/OwnerDashboard";

function OwnerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSubmit = (data) => {
    console.log("Auth data:", data);
    setIsAuthenticated(true);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  if (!isAuthenticated) {
    return (
      <div className="owner-auth">
        <h2>{isLogin ? "Owner Login" : "Owner Sign Up"}</h2>
        <AuthForm isLogin={isLogin} onSubmit={handleAuthSubmit} />
        <button onClick={toggleAuthMode} className="toggle-auth">
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    );
  }

  return <OwnerDashboard />;
}

export default OwnerPage;
