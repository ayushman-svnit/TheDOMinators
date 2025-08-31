import { useState } from "react";
import Locate from "./Locate"
import './Form.css';


function Form({ Stop, setStops, mode }) {
    const [stop, updateStop] = useState(Stop);
    const [showLocate, setShowLocate] = useState(false);
    const handleToggleLocate = () => {
        setShowLocate(prev => !prev);
    };
    const handleStop = (e) => {
        const { name, value } = e.target;
        updateStop((currStop) => ({
            ...currStop,
            [name]: value,
        }));
    };

    const handleTimetableChange = (index, field, value) => {
        const updatedTimetable = stop.timetable.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        updateStop((prev) => ({
            ...prev,
            timetable: updatedTimetable,
        }));
    };

    const [obj, setObj] = useState({
        bus_number: "",
        destination: "",
        time: ""
    });

    const handleObj = (e) => {
        const { name, value } = e.target;
        setObj((currObj) => ({
            ...currObj,
            [name]: value,
        }));
    };

    const handleDelete = (indexToDelete) => {
        const newTimetable = stop.timetable.filter((_, i) => i !== indexToDelete);
        updateStop((prev) => ({
            ...prev,
            timetable: newTimetable,
        }));
    };


    const handleAdd = () => {
        const newTimetable = [...stop.timetable, obj];
        updateStop((prev) => ({
            ...prev,
            timetable: newTimetable,
        }));
        setObj({ bus_number: "", destination: "", time: "" });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`/api/admin/stops/${stop._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stop)
        });
        const updated = await res.json();
        console.log(updated)
        setStops(prev => prev.map(t => (t._id === updated._id ? updated : t)));
    };
    const handleAddSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch("/api/admin/stops", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stop)
        });
        const inserted = await res.json();
        updateStop({
            name: '',
            details: '',
            lat: '',
            lng: '',
            timetable: [],
        });
        console.log(inserted)
        setStops(prev => [...prev, inserted]);
    };
    return (
        <>
            <div className="form-container">
                <h2 className="form-title">
                    {mode === "add" ? "Add New Bus Stop" : "Edit Bus Stop"}
                </h2>
                <form onSubmit={mode === "update" ? handleUpdateSubmit : handleAddSubmit}>
                    <div className="basic-info-section">
                        <label htmlFor="name" className="form-label">
                            Name:
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={stop.name}
                                placeholder="Enter name of the stop"
                                onChange={handleStop}
                            />
                        </label>
                        <label htmlFor="details" className="form-label">
                            Details:
                            <input
                                type="text"
                                id="details"
                                name="details"
                                value={stop.details}
                                placeholder="Enter details of the stop (address)"
                                onChange={handleStop}
                                disabled={mode === "update"}
                                className="form"
                            />
                        </label>
                        <label htmlFor="lat" className="form-label">
                            Latitude:
                            <input type="text" className="form" name="lat" id="lat" value={stop.lat} placeholder="Enter latitude" onChange={handleStop} disabled={mode === "update"} />
                        </label>
                        <label htmlFor="lng" className="form-label">
                            Longitude:
                            <input type="text" className="form" name="lng" id="lng" value={stop.lng} placeholder="Enter longitude" onChange={handleStop} disabled={mode === "update"} />
                        </label>
                        {mode === "add" && (
                            <>
                                <button type="button" onClick={handleToggleLocate} className="locate-button butn">
                                    {showLocate ? "HIDE LOCATE" : "LOCATE ON MAP"}
                                </button>
                                {showLocate && <Locate updateStop={updateStop} />}
                            </>
                        )}
                    </div>

                    <div className="timetable-section">
                        <h3>Existing Timetable</h3>
                        {stop.timetable.map((t, index) => (
                            <div className="timetable-item" data-id={t._id} key={t._id}>
                                <label htmlFor={`bus_number_${index}`} className="form-label">
                                    Bus number:
                                    <input
                                        type="text" className="form"
                                        id={`bus_number_${index}`}
                                        value={t.bus_number}
                                        onChange={(e) =>
                                            handleTimetableChange(index, "bus_number", e.target.value)
                                        }
                                    />
                                </label>
                                <label htmlFor={`destination_${index}`} className="form-label">
                                    Destination:
                                    <input
                                        type="text" className="form"
                                        id={`destination_${index}`}
                                        value={t.destination}
                                        onChange={(e) =>
                                            handleTimetableChange(index, "destination", e.target.value)
                                        }
                                    />
                                </label>
                                <label htmlFor={`time_${index}`} className="form-label">
                                    Time:
                                    <input
                                        type="text" className="form"
                                        id={`time_${index}`}
                                        value={t.time}
                                        onChange={(e) =>
                                            handleTimetableChange(index, "time", e.target.value)
                                        }
                                    />
                                </label>
                                <div className="button-group">
                                    <button type="button" onClick={() => handleDelete(index)} className="delete-button butn">
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="timetable-section">
                        <h3>Add New Timetable Entry</h3>
                        <label htmlFor="bus_number" className="form-label">
                            Bus number:
                            <input
                                type="text"
                                id="bus_number"
                                name="bus_number"
                                value={obj.bus_number}
                                onChange={handleObj}
                                placeholder="Enter bus number"
                            />
                        </label>
                        <label htmlFor="destination" className="form-label">
                            Destination:
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                value={obj.destination}
                                onChange={handleObj}
                                placeholder="Enter destination"
                            />
                        </label>
                        <label htmlFor="time" className="form-label">
                            Time:
                            <input
                                type="text"
                                id="time"
                                name="time"
                                value={obj.time}
                                onChange={handleObj}
                                placeholder="Enter time"
                            />
                        </label>
                        <div className="button-group">
                            <button 
                                type="button" 
                                onClick={handleAdd} 
                                disabled={!obj.bus_number || !obj.destination || !obj.time} 
                                className="timetable-add butn"
                            >
                                ADD TO TIMETABLE
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="submit-button butn">
                        {mode === "add" ? "ADD BUS STOP" : "UPDATE BUS STOP"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Form;