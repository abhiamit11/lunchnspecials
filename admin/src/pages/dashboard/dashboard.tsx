import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { analyticsOverview, analyticsOverviewType } from "./api"
import { useMemo, useState } from "react"

function Dashboard() {
    const { data, isSuccess } = useQuery({
        queryKey: ["analytics"], //Array according to Documentation
        queryFn: analyticsOverview,

    })
    const [overview, setOverview] = useState<analyticsOverviewType>({
        visitor: 0,
        uniqueVisitor: 0,
        totalRestaurants: 0,
        topViewedRestaurant: {
            visitCount: 0,
            restaurantId: "",
            restaurantName: "",
            location: ""
        }
    })

    useMemo(() => {
        if (isSuccess && data) {
            setOverview((pre) => ({ ...pre, ...data }))
        }
    }, [isSuccess, data])
    return (
        <>
            <div className="flex justify-between items-center p-4 rounded-lg">
                <h1 className="text-2xl font-medium">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                <AnalyticsCard title={"Visitor"} description="Total Visitors to the Site" value={overview.visitor.toString()} />
                <AnalyticsCard title={"Unique visitor"} description="Unique visitor to the Site" value={overview.uniqueVisitor.toString()} />
                <AnalyticsCard title={"Top viewed restaurant"} description={overview.topViewedRestaurant.location} value={overview.topViewedRestaurant.restaurantName} />
                <AnalyticsCard title={"Restaurants"} description="Total number of Restaurants" value={overview.totalRestaurants.toString()} />
            </div>
        </>
    )
}

export default Dashboard

type AnalyticsCardProps = {
    title: string
    description?: string
    value: string
}
const AnalyticsCard = ({ title, description, value }: AnalyticsCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="truncate">{description!}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-3xl text-right font-bold">
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}