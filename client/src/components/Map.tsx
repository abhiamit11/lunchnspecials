import Graphic from "@arcgis/core/Graphic";
import useMap from '@/hooks/useMap';
import LunchMarker from "../assets/foods-pin.svg"
import DrinkMarker from "../assets/drinks-pin.svg"
import BothMarker from "../assets/food-and-drink.svg"
import { useQuery } from "@tanstack/react-query";
import { getRestaurant, getRestaurants, Restaurant } from "../lib/api";
import { useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import { CoordinatesParms } from "./MapProvider";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";
import { createRoot } from "react-dom/client";
import MapPopupTemplate from "./MapPopupTemplate";

const lunchMarker: Pick<__esri.PictureMarkerSymbol, 'type' | 'url' | 'width' | 'height'> = {
    type: "picture-marker",
    url: LunchMarker,
    width: 42,
    height: 52,
}

const drinkMarker: Pick<__esri.PictureMarkerSymbol, 'type' | 'url' | 'width' | 'height'> = {
    type: "picture-marker",
    url: DrinkMarker,
    width: 42,
    height: 52,
}

const bothMarker: Pick<__esri.PictureMarkerSymbol, 'type' | 'url' | 'width' | 'height'> = {
    type: "picture-marker",
    url: BothMarker,
    width: 42,
    height: 52,
}

const layerId = 'restaurantsLocationLayer'
function Map() {
    const { doseLayerExist, addGraphicsLayer } = useMap()
    const { x, y, day }: CoordinatesParms & { day: string } = useSearch({ from: "/" })
    const { data, isSuccess } = useQuery({
        queryKey: ['restaurants', [x, y, day]],
        queryFn: () => getRestaurants(x, y, 25, day),
        refetchOnWindowFocus: false
    },
    )

    const symbolSwitch = (category: "drink" | "lunch" | "both") => {
        switch (category) {
            case "drink":
                return drinkMarker;
            case "lunch":
                return lunchMarker;
            case "both":
                return bothMarker;
            default:
                return lunchMarker;
        }
    }

    const onSetRestaurantPoint = (restaurant: Restaurant) => {
        const { coordinates: { latitude, longitude }, name, _id, category } = restaurant
        const point: any = {
            type: "point",
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
        };

        const popupTemplate = {
            title: name,
            content: [
                new CustomContent({
                    outFields: ['*'],
                    creator: async (event) => {
                        const div = document.createElement('div');
                        if (event) {
                            const res = await getRestaurant(_id, day)

                            const root = createRoot(div);
                            root.render(<MapPopupTemplate data={res.data} day={day} />);
                        }
                        return div;
                    },
                }),
            ]
        };

        const symbol = symbolSwitch(category || "lunch") as __esri.SymbolProperties;
        //(category == "drink" ? drinkMarker : lunchMarker) as __esri.SymbolProperties;

        const pointGraphic = new Graphic({
            geometry: point,
            symbol,
            attributes: {
                _id
            },
            popupTemplate,
        });

        return [pointGraphic];
    }

    const clearGraphicsLayer = () => {
        const existLayer = doseLayerExist(layerId)
        if (existLayer) existLayer.destroy();
    }

    useEffect(() => {
        clearGraphicsLayer()
        if (isSuccess) {
            const restaurants = data.data
            const points: Graphic[] = []
            restaurants.forEach(restaurant => {
                points.push(...onSetRestaurantPoint(restaurant))
            });

            const gl = new GraphicsLayer({ 'id': layerId })
            gl.addMany(points)
            addGraphicsLayer(gl)
        }
        return () => {

        }
    }, [isSuccess, data])

    return (
        <>

        </>
    )
}

export default Map