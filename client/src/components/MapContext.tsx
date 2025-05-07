import { createContext } from "react";
import ArcGISMap from "@arcgis/core/Map.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

// Define the context data type
export interface MapContextType {
    MapState: ArcGISMap | null;
    setLocation: (longitude: number, latitude: number) => void
    addGraphicsLayer: (gl: GraphicsLayer) => void
    doseLayerExist: (id: string) => __esri.Layer | undefined,
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

export default MapContext;
