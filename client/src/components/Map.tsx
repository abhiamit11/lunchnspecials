import Graphic from "@arcgis/core/Graphic";
import useMap from '@/hooks/useMap';
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
import getMarkerSymbol from "./MarkerSymbol";
import { differenceInWeeks } from "date-fns";

const layerId = 'restaurantsLocationLayer';

function Map() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, []);

    const { doseLayerExist, addGraphicsLayer } = useMap();
    const { x, y, day }: CoordinatesParms & { day: string, init: boolean } = useSearch({ from: "/" });

    const { data, isSuccess } = useQuery({
        queryKey: ['restaurants', [x, y, day]],
        queryFn: () => getRestaurants(x, y, 25, day),
        refetchOnWindowFocus: false,
        enabled: Boolean(x && y)
    });

    const onSetRestaurantPoint = (restaurant: Restaurant) => {
        const { coordinates: { latitude, longitude }, name, _id, category, isPartner, isNewOrRevised, updatedAt } = restaurant;
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

        let isNew = false
        if (isNewOrRevised) {
            const weekDiff = differenceInWeeks(new Date(), new Date(updatedAt))
            // Check if it's new within the last 4 weeks.
            isNew = weekDiff <= 4
        }
        const symbol: any = getMarkerSymbol(category || "lunch", isPartner, isNew);

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
