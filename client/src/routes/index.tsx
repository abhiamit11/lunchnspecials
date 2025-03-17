import Header from '@/components/Header'
import Map from '@/components/Map'
import MapComponent from '@/components/MapProvider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <MapComponent>
            <Header />
            <Map />
        </MapComponent>
    )
}