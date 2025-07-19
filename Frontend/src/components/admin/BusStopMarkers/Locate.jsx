import { useEffect, useRef } from 'react';

function Locate({ updateStop }) {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const mapInstance = useRef(null);
    const currentMarker = useRef(null);

    useEffect(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.error('Google Maps API or Places library not loaded.');
            return;
        }

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 21.1702, lng: 72.8311 },
            zoom: 13,
        });

        mapInstance.current = map;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
                console.error('No geometry found for the selected place.');
                return;
            }

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const address = place.formatted_address;

            map.setCenter({ lat, lng });
            map.setZoom(15);

            if (currentMarker.current) currentMarker.current.setMap(null);

            currentMarker.current = new window.google.maps.Marker({
                position: { lat, lng },
                map,
            });

            updateStop(prev => ({
                ...prev,
                lat: parseFloat(lat.toFixed(6)),
                lng: parseFloat(lng.toFixed(6)),
                details: address,
            }));
        });

        const geocoder = new window.google.maps.Geocoder();

        map.addListener('click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const address = results[0].formatted_address;

                    if (currentMarker.current) currentMarker.current.setMap(null);

                    currentMarker.current = new window.google.maps.Marker({
                        position: { lat, lng },
                        map,
                    });

                    updateStop(prev => ({
                        ...prev,
                        lat: parseFloat(lat.toFixed(6)),
                        lng: parseFloat(lng.toFixed(6)),
                        details: address,
                    }));
                } else {
                    console.error('Geocoder failed due to:', status);
                }
            });
        });
    }, []);

    return (
        <>
            <input
                type="text"
                placeholder="Search location..."
                ref={inputRef}
                autoComplete="off"
                style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                }}
            />
            <div
                ref={mapRef}
                style={{ width: '100%', height: '20vh' }}
            />
        </>
    );
}

export default Locate;
