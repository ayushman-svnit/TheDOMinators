import "./Sidebar.css";
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Sidebar({ busStops, setStops, focus, setFocus }) {
    const [showModal, setShowModal] = useState(false);
    const [Stop, setStop] = useState({});
    const [mode, setMode] = useState("update");

    // Delete a stop
    const handleDelete = async (id) => {
        await fetch(`/api/admin/stops/${id}`, { method: 'DELETE' });
        setStops(prev => prev.filter(t => t._id !== id));
    };

    const handleUpdate = (idToFind) => {
        setMode("update");
        setShowModal(true);
        const stop = busStops.find(stop => stop._id === idToFind);
        setStop(stop)
    };

    const handleAdd = () => {
        setMode("add");
        setShowModal(true);
        const stop = {
            name: "",
            details: "",
            lat: "",
            lng: "",
            timetable: []
        };
        setStop(stop);
    }

    const [query, setQuery] = useState("");
    useEffect(() => {
        setFilteredStops(busStops);
    }, [busStops]);
    const [filteredStops, setFilteredStops] = useState(busStops);

    const handleSearch = (text) => {
        setQuery(text);
        const filtered = busStops.filter((stop) =>
            stop.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredStops(filtered);
    };

    const handleFocus = (idToFind) => {
        const stop = busStops.find(stop => stop._id === idToFind);
        setFocus({ lat: stop.lat, lng: stop.lng })
    }

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <input
                        type="text"
                        placeholder="Search bus stop..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button type="button" onClick={handleAdd}>ADD STOP</button>
                </div>
                <ul type="none">
                    {filteredStops.map((stop, index) => (
                        <motion.li
                            className="stop"
                            data-id={stop._id}
                            key={stop._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                            onClick={() => handleFocus(stop._id)}
                        >
                            <h3>{stop.name}</h3>
                            <p>{stop.details}</p>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdate(stop._id);
                                }}
                            >
                                UPDATE
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(stop._id);
                                }}
                            >
                                DELETE
                            </button>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <Modal currStop={Stop} show={showModal} onClose={() => setShowModal(false)} setStops={setStops} mode={mode}>
            </Modal>
        </>
    );
}

export default Sidebar;
