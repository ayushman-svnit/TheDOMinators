import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OwnerPage from "./pages/OwnerPage";
import UserPage from "./pages/UserPage";

function App() {
  const [userType, setUserType] = useState(null);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage setUserType={setUserType} />} />
        <Route
          path="/owner"
          element={userType === "owner" ? <OwnerPage /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={userType === "user" ? <UserPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
