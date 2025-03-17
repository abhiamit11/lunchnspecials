import MapContext, { MapContextType } from "@/components/MapContext";
import { useContext } from "react";

const useMap = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default useMap