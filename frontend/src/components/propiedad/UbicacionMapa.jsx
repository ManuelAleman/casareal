import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../utils/constants"
import { useEffect, useState } from "react";



export const UbicacionMapa = ({ post }) => {

    const mapStyles = {
        width: "100%",
        height: "300px",
    };

    const [currentLocation, setCurrentLocation] = useState(null);

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

    useEffect(() => {
        const address = `${post.calle} ${post.numeroExterior}, ${post.colonia}, ${post.ciudad}, ${post.estado}, ${post.codigoPostal}`;
        DecoderAddress(address).then((location) => {
            if (location) {
                setCurrentLocation(location);
            }
        });
    }, [post]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Ubicación</h3>
            <p className="text-gray-700 mb-4">{post.calle + " #" + post.numeroExterior}</p>
            {
                currentLocation === null ? <p>Cargando...</p> : (
                    <APIProvider apiKey={REACT_APP_GOOGLE_MAPS_KEY}>
                        <Map style={mapStyles} defaultCenter={currentLocation} zoom={15} mapId={"8e3445474e3760c1"}>
                            <AdvancedMarker position={currentLocation} >
                                <Pin background={"red"} />
                            </AdvancedMarker>
                        </Map>
                    </APIProvider>
                )
            }

        </div>
    );
};
