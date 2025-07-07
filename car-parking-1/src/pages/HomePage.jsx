import { useNavigate } from "react-router-dom";

function HomePage({ setUserType }) {
  const navigate = useNavigate();

  const handleOwnerClick = () => {
    setUserType("owner");
    navigate("/owner");
  };

  const handleUserClick = () => {
    setUserType("user");
    navigate("/user");
  };

  return (
    <div className="home-page">
      <h1>Smart Parking System</h1>
      <div className="selection-container">
        <div className="option-card" onClick={handleOwnerClick}>
          <h2>Parking Owner</h2>
          <p>Manage your parking space</p>
        </div>
        <div className="option-card" onClick={handleUserClick}>
          <h2>Find Parking</h2>
          <p>Search for available spots</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
