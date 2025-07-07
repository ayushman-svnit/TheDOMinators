import { useState } from "react";
import ParkingMap from "./ParkingMap";

function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRate, setFilterRate] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [maxRate, setMaxRate] = useState(null);

  // In your return statement
  <ParkingMap searchQuery={searchQuery} maxRate={maxRate} />;

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter parking spots
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="user-dashboard">
      <h2>Find Available Parking</h2>

      <div className="search-controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="filter-controls">
          <label>
            Max Rate:
            <select
              value={filterRate || ""}
              onChange={(e) =>
                setFilterRate(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">Any</option>
              <option value="5">$5 or less</option>
              <option value="10">$10 or less</option>
              <option value="15">$15 or less</option>
            </select>
          </label>

          <button onClick={() => setShowMap(!showMap)} className="toggle-view">
            {showMap ? "Show List View" : "Show Map View"}
          </button>
        </div>
      </div>

      {showMap ? (
        <ParkingMap searchQuery={searchQuery} maxRate={maxRate} />
      ) : (
        <div className="list-view">
          {/* List view implementation would go here */}
          <p>List view of parking spots would be displayed here</p>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
