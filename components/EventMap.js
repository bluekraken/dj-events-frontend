import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

const EventMap = ({ evt }) => {
    const [lat, setLat] = useState(40.69689);
    const [lng, setLng] = useState(-74.0456);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: lng,
        width: "100%",
        height: "500px",
        zoom: 12
    });

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    // useEffect(() => {
    //     console.log("In use effect!!!");
    //     // Get latitude & longitude from address.
    //     Geocode.fromAddress(evt.address).then(
    //         (response) => {
    //             console.log(response);
    //             const { lat, lng } = response.results[0].geometry.location;
    //             setLat(lat);
    //             setLng(lng);
    //             setViewport({ ...viewport, latitude: lat, longitude: lng });
    //             setLoading(false);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }, []);

    useEffect(() => {
        // Get latitude & longitude from address.
        const getLatLng = async (address) => {
            const res = await Geocode.fromAddress(address);

            const { lat, lng } = res.results[0].geometry.location;
            setLat(lat);
            setLng(lng);
            setViewport({ ...viewport, latitude: lat, longitude: lng });
            setLoading(false);
        };

        getLatLng(evt.address);
    }, []);

    if (loading) return false;

    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            onViewportChange={(vp) => setViewport(vp)}
        >
            <Marker key={evt.id} latitude={lat} longitude={lng}>
                <Image src="/images/pin.svg" width={30} height={30} alt="pin" />
            </Marker>
        </ReactMapGl>
    );
};

export default EventMap;
