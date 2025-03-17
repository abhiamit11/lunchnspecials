import { IndividualRestaurant } from "@/lib/api"
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { Check, Clipboard, Clock, Globe, MapPin, Navigation, Phone, Star } from "lucide-react";
import { useState } from "react";

interface Props {
    data: IndividualRestaurant,
    day?: string
}

function MapPopupTemplate({ data, day }: Props) {
    try {
        const today = format(Date.now(), "eeee").toLowerCase();
        const { name, address, category, url, rating, phone, updatedAt } = data;
        const menuItems = data.menu || [];
        const specialCategory =
            category == "drink"
                ? "Drink"
                : category == "lunch"
                    ? "Lunch"
                    : "Drink & Lunch";

        let query = name.replace("'", "").split(" ").join("+");
        query = query + "+" + address.replace("'", "").split(" ").join("+");

        const [copied, setCopied] = useState(false)
        const copyAddress = () => {
            setCopied(true)
            navigator.clipboard.writeText(address)
            setTimeout(() => {
                setCopied((x) => !x)
            }, 2000);
        }
        const lastUpdated = format(updatedAt, "MM/dd/yyyy")
        return (
            // <ScrollArea className="h-[210px] p-0">
            <div id="popupEl" className="max-sm:mb-12">
                <div className="flex justify-between items-center">
                    <div className="text-base capitalize font-black">
                        {`${day && (day === today ? `Today's` : day + `'s`)} Special ${specialCategory}`}
                    </div>
                    {rating && <div className="flex justify-end items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-300 stroke-amber-400" />
                        <div className="font-semibold text-base">{rating}/5</div>
                    </div>}
                </div>
                {lastUpdated && <div className="text-right text-xs mt-2">
                    Last Updated: {lastUpdated}
                </div>}
                <table className="mb-3 w-full text-sm text-left rtl:text-right border text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-1.5">
                                Name & Timings
                            </th>
                            <th scope="col" className="p-1.5">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menuItems.map((item, index) => (
                                <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={`${item.name}_${item.category}_${item.day}_${index}`}>
                                    <th scope="row" className="p-1.5">
                                        <div className='grid grid-cols-1 gap-1'>
                                            <div className="font-medium text-gray-900 text-wrap max-w-2xs text-base">
                                                {item.name}
                                                {item.description && <p className="truncate text-ellipsis max-h-6 max-w-3xs">{item.description}</p>}
                                            </div>
                                            <div className="text-gray-600 font-medium text-xs flex justify-start items-start gap-1">
                                                <Clock className="h-3 w-3" />  <Timings timings={item.timings} />
                                            </div>
                                        </div>
                                    </th>
                                    <td className="font-medium text-gray-900">
                                        ${item.price}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <div className="my-3 grid grid-cols-1 gap-3">

                    <div className="active:text-gray-700 flex justify-start items-center gap-1 flex-nowrap  text-gray-900 text-sm cursor-pointer" onClick={copyAddress}>
                        <MapPin className="h-4 w-4" />
                        {address}
                        {copied ? <Check className="h-4 w-4" />
                            : <Clipboard className="h-4 w-4" />}
                    </div>

                    {phone && <a className="flex justify-start items-center gap-1" href={`tel:${phone}`}>
                        <Phone className="h-4 w-4" /> {phone}
                    </a>}

                    {url && <div className="">
                        <a href={`${url}`} className="flex justify-start items-center gap-1" target="_blank"> <Globe className="h-4 w-4" /> {url.length > 50 ? "Website" : url}</a>
                    </div>}

                    <div className="">
                        <a className="flex justify-start items-center gap-1" href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank">
                            <Navigation className="h-4 w-4" />
                            Get directions
                        </a>
                    </div>
                </div>
            </div>
            // </ScrollArea>
        )
    } catch (error) {
        return null
    }
}

export default MapPopupTemplate

export const Timings = ({ timings }: {
    timings: {
        opening: string;
        closing: string;
    }
}) => {
    if (timings && timings.opening && timings.closing) {
        const openingTime = parse(timings.opening, 'HH:mm', new Date());
        const closingTime = parse(timings.closing, 'HH:mm', new Date());
        return <>
            {timings && <div className="flex justify-start items-center gap-1 w-fit">
                <span>{format(openingTime, 'hh:mm a')}</span>
                <span>to</span>
                <span>{format(closingTime, 'hh:mm a')}</span>
            </div>}
        </>
    }
}