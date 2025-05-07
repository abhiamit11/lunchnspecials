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
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";
import { createRoot } from "react-dom/client";
import MapPopupTemplate from "./MapPopupTemplate";
import ReactGA from 'react-ga4';
import graphicsLayerToMap from "@/lib/graphics-layer";
import CoffeeMarker from "../assets/coffee-pin.svg"

const markerConfig = {
    lunch: { url: LunchMarker },
    drink: { url: DrinkMarker },
    ct: { url: CoffeeMarker },
    both: { url: BothMarker }
};

const getMarkerSymbol = (category: "drink" | "lunch" | "ct" | "both") => {
    return ({
        type: "picture-marker",
        url: markerConfig[category]?.url || markerConfig.lunch.url,
        width: 42,
        height: 52
    })
};

const layerId = 'restaurantsLocationLayer';

function Map() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, []);

    const { doseLayerExist, addGraphicsLayer } = useMap();
    const { x, y, day }: CoordinatesParms & { day: string } = useSearch({ from: "/" });

    const { data, isSuccess } = useQuery({
        queryKey: ['restaurants', [x, y, day]],
        queryFn: () => getRestaurants(x, y, 25, day),
        refetchOnWindowFocus: false,
        enabled: Boolean(x && y)
    });

    const onSetRestaurantPoint = (restaurant: Restaurant) => {
        const { coordinates: { latitude, longitude }, name, _id, category } = restaurant;
        const point: any = {
            type: "point",
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude)
        };

        const popupTemplate = {
            title: name,
            outFields: ["*"],
            content: [
                new CustomContent({
                    outFields: ['*'],
                    creator: async () => {
                        const div = document.createElement('div');
                        const res = await getRestaurant(_id, day);
                        ReactGA.event({
                            category: 'engagement',
                            action: 'restaurant_engagement',
                            label: res.data.name
                        });
                        const root = createRoot(div);
                        root.render(<MapPopupTemplate data={res.data} day={day} />);
                        return div;
                    }
                })
            ]
        };

        const symbol: any = getMarkerSymbol(category || "lunch");

        const pointGraphic = new Graphic({
            geometry: point,
            symbol,
            attributes: { _id },
            popupTemplate
        });

        return pointGraphic;
    };

    const clearGraphicsLayer = () => {
        const existingLayer = doseLayerExist(layerId);
        if (existingLayer) existingLayer.destroy();
    };

    useEffect(() => {
        if (isSuccess && data?.data) {
            clearGraphicsLayer();

            const points = data.data.map(onSetRestaurantPoint);
            const gl = graphicsLayerToMap(layerId, points);
            addGraphicsLayer(gl);
        }

        return () => {
            clearGraphicsLayer(); // Clean up on unmount
        };
    }, [isSuccess, data, addGraphicsLayer, doseLayerExist]);

    return null; // The component does not render any JSX itself
}

export default Map;
