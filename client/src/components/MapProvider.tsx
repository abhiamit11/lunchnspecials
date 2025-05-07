import {
    useRef,
    useEffect,
    useState,
    useMemo,
    ReactNode,
    useCallback,
} from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Zoom from '@arcgis/core/widgets/Zoom';
import MapContext from './MapContext';
import { useSearch } from '@tanstack/react-router';
import useCoordinates from '@/hooks/useCoordinates';
import { isEmpty } from 'lodash';
import isWithinRadius from '@/lib/is-within-radius';
import { useSearchAreaStore } from './SearchThisArea';
import { Loader2 } from 'lucide-react';

export type CoordinatesParms = {
    x: number;
    y: number;
    day?: string;
};

const DEFAULT_COORDS: [number, number] = [-96.8059789, 32.8655361];

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const [mapState, setMapState] = useState<ArcGISMap | null>(null);
    const [mapView, setMapView] = useState<MapView | null>(null);
    const [loading, setLoading] = useState(true);

    const { x, y, day }: CoordinatesParms = useSearch({ from: '/' });
    const { setCoordinates } = useCoordinates();
    const { toggleButton, setPoints } = useSearchAreaStore((state) => state);

    const coords = [x ?? DEFAULT_COORDS[0], y ?? DEFAULT_COORDS[1]];

    // Set default coordinates if none provided
    useEffect(() => {
        if (x === undefined && y === undefined) {
            setCoordinates(...DEFAULT_COORDS);
        }
    }, [x, y, setCoordinates]);

    // Close popup on day change
    useEffect(() => {
        if (day && mapView && !isEmpty(mapView.popup)) {
            mapView.popup.close();
        }
    }, [day, mapView]);

    // Initialize Map
    useEffect(() => {
        if (!mapDiv.current) return;

        const map = new ArcGISMap({ basemap: 'streets-navigation-vector' });
        setMapState(map);
    }, []);

    // Initialize MapView
    useEffect(() => {
        if (!mapDiv.current || !mapState) return;

        const view = new MapView({
            map: mapState,
            container: mapDiv.current,
            center: coords,
            zoom: 11,
        });

        const zoomWidget = new Zoom({ view, id: 'zoom' });

        view.ui.remove('search');
        view.ui.remove('zoom');

        view.when(() => {
            if (!view.ui.find('zoom')) {
                view.ui.add(zoomWidget, 'manual');
            }
            setLoading(false);
        });

        view.on('drag', (event) => searchThisArea(event, view));

        setMapView(view);

        return () => view?.destroy(); // Clean up
    }, [mapState]);

    // Move map to location
    const setLocation = useCallback(
        (longitude: number, latitude: number) => {
            if (mapView) {
                mapView.goTo({ center: [longitude, latitude], zoom: 12 });
            }
        },
        [mapView]
    );

    const addGraphicsLayer = useCallback(
        (gl: GraphicsLayer) => {
            if (mapState) {
                mapState.add(gl);
            }
        },
        [mapState]
    );

    const doesLayerExist = useCallback(
        (id: string) => {
            return mapState?.findLayerById(id);
        },
        [mapState]
    );

    const searchThisArea = useCallback(
        async (_event: __esri.ViewDragEvent, view: MapView) => {
            const { latitude, longitude } = view.center;
            const origin = { longitude: x, latitude: y };
            const target = { longitude, latitude };

            const movedFar = !isWithinRadius(origin, target, 15);
            toggleButton(movedFar);
            if (movedFar) setPoints(target);
        },
        [x, y, toggleButton, setPoints]
    );

    // Context value memoized
    const contextValue = useMemo(
        () => ({
            MapState: mapState,
            setLocation,
            doseLayerExist: doesLayerExist,
            addGraphicsLayer,
        }),
        [mapState, setLocation, doesLayerExist, addGraphicsLayer]
    );

    return (
        <MapContext.Provider value={contextValue}>
            {children}
            {loading && (
                <div className="fixed top-0 left-0 w-full h-dvh bg-foreground/60 flex justify-center items-center z-20">
                    <div role="status">
                        <Loader2 className="w-16 h-16 text-gray-200 animate-spin" />
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <div ref={mapDiv} className="w-full h-dvh z-10 absolute" />
        </MapContext.Provider>
    );
};

export default MapProvider;
