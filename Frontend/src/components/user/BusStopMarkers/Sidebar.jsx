import "./Sidebar.css";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Sidebar({ busData, setData }) {
    const [query, setQuery] = useState("");
    const [filteredBusNumber, setFilteredBusNumber] = useState(busData);

    useEffect(() => {
        setFilteredBusNumber(busData);
    }, [busData]);

    const handleSearch = (text) => {
        setQuery(text);
        const filtered = busData.filter((busNumber) =>
            busNumber.bus_number.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredBusNumber(filtered);
    };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <input
                        type="text"
                        placeholder="Search bus number..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <ul type="none">
                    {filteredBusNumber.map((busNumber, index) => (
                        <>
                            <motion.li
                                className="stop"
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                                data-bs-toggle="collapse" data-bs-target={"#collapseExample" + index} aria-expanded="false" aria-controls="collapseExample"
                            >
                                <h3>{busNumber.bus_number}</h3>
                                <div className="bus-route">
                                    <img className="bus-symbol" src="/bus.svg" alt="Bus" />
                                    <p>
                                        {busNumber.coordinates[0]?.name} &#8596; {busNumber.coordinates.at(-1)?.name}
                                    </p>
                                </div>
                            </motion.li>
                            <div className="collapse timeline" id={"collapseExample" + index}>
                                <ul className="card card-body">
                                    {busNumber.coordinates.map((stop, index) => (
                                        <li key={index}>{stop.name}</li>
                                    ))}                                </ul>
                            </div>
                        </>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Sidebar;



