import Header from '@/components/Header'
import Map from '@/components/Map'
import MapComponent from '@/components/MapProvider'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
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