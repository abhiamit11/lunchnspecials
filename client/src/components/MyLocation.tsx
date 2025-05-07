import useMap from '@/hooks/useMap';
import { Button } from "./ui/button";
import { Locate } from "lucide-react";
import Marker from "../assets/location_marker.svg"
import Graphic from "@arcgis/core/Graphic";
import useCoordinates from '@/hooks/useCoordinates';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

const markerSymbol: Pick<__esri.PictureMarkerSymbol, 'type' | 'url' | 'width' | 'height'> = {
    type: "picture-marker",
    url: Marker,
    width: 40,
    height: 40,
}

function MyLocation() {
    const { doseLayerExist, setLocation, addGraphicsLayer } = useMap()
    const { setCoordinates } = useCoordinates()
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position: { coords: { latitude: number, longitude: number } }) {

        const longitude = position.coords.longitude
        const latitude = position.coords.latitude
        setLocation(longitude, latitude)
        setCoordinates(longitude, latitude)

        const point: any = {
            type: "point",
            longitude: longitude,
            latitude: latitude
        };


        const pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol as __esri.SymbolProperties,
            attributes: {
                _id: 'user_location'
            },
        });
        const existLayer = doseLayerExist('userLocationLayer');
        const gl = new GraphicsLayer({ 'id': 'userLocationLayer' })
        gl.add(pointGraphic);

        if (!existLayer) {
            addGraphicsLayer(gl)
        } else {
            existLayer.destroy()
            addGraphicsLayer(gl)
        }

    }

    return (
        <div className='px-2 md:px-0'>
            <Button aria-label="my-location" size={"icon"} onClick={getLocation} className="h-[42px] w-[42px]">
                <Locate />
            </Button>
        </div>
    )
}

export default MyLocation