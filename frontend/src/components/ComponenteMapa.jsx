import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { REACT_APP_GOOGLE_MAPS_KEY } from "../utils/constants"
import { useEffect, useState } from 'react';
import { PropiedadCard } from "../components/PropiedadCard";

export const ComponenteMapa = ({ addresses }) => {

    const [markers, setMarkers] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({
        lat: 24.7889499,
        lng: -107.399263

    });

    const [cargando, setCargando] = useState(true);

    const mapStyles = {
        height: "600px",
        width: "1024px",
        margin: "0 auto"
    };

    const radius = 10;


    const DecoderAddress = async (address) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=${REACT_APP_GOOGLE_MAPS_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error geocoding address:", error);
            return null;
        }
    };
    const decodeEstatesInRange = async (
        lat1,
        lon1,
        lat2,
        lon2,
        radius
    ) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance <= radius;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error);
            }
        );
    }, []);

    useEffect(() => {
        const getEstateLocCoor = async () => {
            const estatesLocCoorAux = [];
            for (const publicacion of addresses) {
                const location = await DecoderAddress(publicacion.address);
                if (location) {
                    const isInRange = await decodeEstatesInRange(
                        currentLocation.lat,
                        currentLocation.lng,
                        location.lat,
                        location.lng,
                        radius
                    );

                    if (isInRange) {
                        estatesLocCoorAux.push({ location: location, post: publicacion.post });
                    }
                }

            }
            setMarkers(estatesLocCoorAux);
            setCargando(false);
        }
        if (currentLocation && addresses)
            getEstateLocCoor();
    }, [currentLocation, addresses]);

    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <>
            {
                cargando ? <p> Cargando...</p > :
                    <APIProvider apiKey={REACT_APP_GOOGLE_MAPS_KEY}>
                        <Map style={mapStyles} defaultCenter={currentLocation} defaultZoom={12} mapId={"8e3445474e3760c1"}>
                            <AdvancedMarker position={currentLocation}>
                                <Pin background={"green"} />
                            </AdvancedMarker>
                            {markers.map((marker, index) => (
                                <AdvancedMarker key={index} position={marker.location} onClick={() => setSelectedMarker(index)}>
                                    <Pin background={"red"} />
                                </AdvancedMarker>
                            ))}

                            {
                                selectedMarker != null && (
                                    <InfoWindow
                                        key={selectedMarker}
                                        position={markers[selectedMarker].location}
                                        onCloseClick={() => setSelectedMarker(null)}
                                    >
                                        <div className="w-64">
                                            <PropiedadCard
                                                key={markers[selectedMarker].post.idPublicacion}
                                                idPublicacion={markers[selectedMarker].post.idPublicacion}
                                                fotoURL={markers[selectedMarker].post.fotoURL}
                                                titulo={markers[selectedMarker].post.titulo}
                                                ciudad={markers[selectedMarker].post.ciudad}
                                                numRecamaras={markers[selectedMarker].post.numRecamaras}
                                                superficieTotal={markers[selectedMarker].post.superficieTotal}
                                                tipo={markers[selectedMarker].post.tipo}
                                                precio={markers[selectedMarker].post.precio}
                                            />
                                        </div>
                                    </InfoWindow>
                                )
                            }
                        </Map>
                    </APIProvider>

            }
        </>


    )
}