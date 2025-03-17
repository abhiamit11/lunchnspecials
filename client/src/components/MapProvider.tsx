// src/components/MapComponent.tsx
import { useRef, useEffect, useState, useMemo, ReactNode, useCallback } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
// import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapContext from './MapContext';
import { useSearch } from '@tanstack/react-router';
import useCoordinates from '@/hooks/useCoordinates';
import Zoom from "@arcgis/core/widgets/Zoom.js";

export type CoordinatesParms = {
    x: number,
    y: number
}

const MapProvider = ({ children }: { children: ReactNode; }) => {
    const mapDiv = useRef<HTMLDivElement>(null); // reference for the map container
    const [MapState, setMapState] = useState<ArcGISMap>()
    const [Mapview, setMapview] = useState<MapView>(new MapView())
    // const [graphicsLayer, setGraphicsLayer] = useState(new GraphicsLayer())
    const [loading, setLoading] = useState(false)
    const { x, y }: CoordinatesParms = useSearch({ from: "/" })
    const { setCoordinates } = useCoordinates()
    useEffect(() => {
        if (x == undefined && y == undefined) {
            setCoordinates(-96.8059789, 32.8655361)
        }

        return () => {

        }
    }, [x, y])

    const setLocation = useCallback((longitude: number, latitude: number) => {
        if (Mapview) {
            Mapview.goTo({
                center: [longitude, latitude]
            });
            Mapview.zoom = 12
        }
    }, [Mapview]);

    const addGraphicsLayer = useCallback((gl: GraphicsLayer) => {
        if (MapState) {
            MapState.add(gl)
        }
    }, [MapState]);

    const doseLayerExist = useCallback((id: string) => {
        if (MapState) {
            return MapState.findLayerById(id)
        }
    }, [MapState]);

    // const clearGraphicsLayer = useCallback(() => {
    //     if (graphicsLayer) {
    //         setGraphicsLayer((gl) => {
    //             gl.removeAll()
    //             return gl
    //         })
    //     }
    // }, [graphicsLayer]);

    useEffect(function initView() {
        if (MapState && mapDiv.current) {
            setMapview((view) => {
                view.set(
                    {
                        map: MapState,
                        container: mapDiv.current,
                        center: [x || -96.8059789, y || 32.8655361],
                        zoom: 11
                    }
                )

                let zoom = new Zoom({
                    view: view,
                    id: 'zoom'
                });



                view.ui.remove('search');
                view.ui.remove('zoom');
                view.when(() => {

                    if (!view.ui.find('zoom')) {
                        view.ui.add(zoom, "manual")
                    }
                    // MapState.add(graphicsLayer)
                    setTimeout(() => {
                        setLoading(false)
                    }, 500);
                })

                return view
            })
        }
        return () => {

        }
    }, [MapState])

    useEffect(function initMap() {
        if (mapDiv.current) {
            setLoading(true)
            setMapState(new ArcGISMap({
                basemap: "streets-navigation-vector"
            }));
        }

        return () => {

        };
    }, []);

    // Memoized value of the authentication context
    const contextValue = useMemo(
        function setContext() {
            return ({
                MapState,
                // setGraphicsLayer,
                setLocation,
                doseLayerExist,
                addGraphicsLayer
            })
        },
        [MapState]
    );

    return <>
        <MapContext.Provider value={contextValue}>
            {children}
            {loading && <div className='fixed top-0 left-0 w-full h-dvh bg-foreground/60 z-10 flex justify-center items-center'>
                <div role="status">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

            </div>}
            <div ref={mapDiv} className='w-full h-dvh' />
        </MapContext.Provider>
    </>
};

export default MapProvider;
