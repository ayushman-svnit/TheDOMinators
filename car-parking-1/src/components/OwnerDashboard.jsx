import { useState } from "react";

function OwnerDashboard() {
  const [parkingData, setParkingData] = useState({
    totalSlots: 0,
    availableSlots: 0,
    address: "",
    rate: 0,
    images: [],
    openTime: "",
    closeTime: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setParkingData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setParkingData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parking data submitted:", parkingData);
    alert("Parking information updated successfully!");
  };

  return (
    <div className="owner-dashboard">
      <h2>Manage Your Parking Space</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total Parking Slots</label>
          <input
            type="number"
            name="totalSlots"
            value={parkingData.totalSlots}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Available Slots</label>
          <input
            type="number"
            name="availableSlots"
            value={parkingData.availableSlots}
            onChange={handleChange}
            min="0"
            max={parkingData.totalSlots}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={parkingData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Rate per hour ($)</label>
          <input
            type="number"
            name="rate"
            value={parkingData.rate}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Opening Time</label>
          <input
            type="time"
            name="openTime"
            value={parkingData.openTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Closing Time</label>
          <input
            type="time"
            name="closeTime"
            value={parkingData.closeTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <div className="image-preview">
            {parkingData.images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Parking space ${index}`}
                width="100"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default OwnerDashboard;
