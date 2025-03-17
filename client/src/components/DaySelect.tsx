import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { format } from "date-fns/format"
import { useNavigate, useSearch } from "@tanstack/react-router";

function DaySelect() {
    const navigate = useNavigate({ from: '/' })
    const { day }: { day: string | undefined } = useSearch({ from: "/" })
    const [selectedDay, setSelectedDay] = useState<string>(day ? day : format(Date.now(), 'eeee').toLowerCase())

    useEffect(() => {
        if (!day) {
            navigate({
                search: (prev) => ({
                    ...prev,
                    day: selectedDay
                })
            })
        }
        return () => {

        }
    }, [day])


    const weekdays = [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" }
    ];
    const onDayChange = (day: string) => {
        setSelectedDay(day)
        navigate({
            search: (prev) => ({
                ...prev,
                day
            })
        })
    }
    return (
        <div className="px-2 md:px-0 max-w-full md:max-w-[156px] w-full">
            <Select onValueChange={onDayChange} defaultValue={selectedDay}>
                <SelectTrigger className={cn("bg-background w-full h-[42px]")}>
                    <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                    {weekdays.map((day, index) => (
                        <SelectItem key={`weekday_${day.value}_${index}`} value={day.value}>{day.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default DaySelect