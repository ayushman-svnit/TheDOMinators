import { useState } from "react";
import AuthForm from "../components/AuthForm";
import UserDashboard from "../components/UserDashboard";

function UserPage() {
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
      <div className="user-auth">
        <h2>{isLogin ? "User Login" : "User Sign Up"}</h2>
        <AuthForm isLogin={isLogin} onSubmit={handleAuthSubmit} />
        <button onClick={toggleAuthMode} className="toggle-auth">
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    );
  }

  return <UserDashboard />;
}

export default UserPage;
