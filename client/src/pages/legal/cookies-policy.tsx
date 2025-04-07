import { useEffect } from "react";
import ReactGA from 'react-ga4';
import { getCookiesContent } from "./api";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

function CookiesPolicy() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Cookies Policy" });
    }, []);
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['legal-content', 'cookies-policy'],
        queryFn: getCookiesContent,
        refetchOnWindowFocus: false
    })
    return (
        <div className="container mx-auto mb-24">
            <div className="flex justify-center items-center max-w-2xl mx-auto mt-3 max-sm:px-6">
                <h1 className="text-3xl font-bold text-center">Lunch N Specials</h1>
            </div>
            <div className="text-center mt-5 max-w-2xl mx-auto max-sm:px-4">
                <h2 className="text-xl font-semibold my-2">Cookies Policy</h2>
                {isLoading && <Loader />}
                {isSuccess && <div className="revert-tailwind font-montserrat" dangerouslySetInnerHTML={{ __html: data.content || '' }} />}
            </div>
        </div>
    )
}

export default CookiesPolicy