import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ReactGA from 'react-ga4';
import { getAboutContent } from "./api";
import Loader from "./Loader";
import { LOGO_URL } from "@/constant";

function About() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "About" });
    }, []);
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['legal-content', 'about'],
        queryFn: getAboutContent,
        refetchOnWindowFocus: false
    })
    return (
        <>
            <div className="flex justify-center items-center max-w-2xl mx-auto mt-3 max-sm:px-6 mb-24">
                <div className="text-left grid grid-cols-1 gap-3">
                    <div className="mx-auto">
                        <img src={LOGO_URL || "/logo.png"} alt="" className="h-32 w-32  max-sm:h-28 max-sm:w-28" />
                    </div>
                    <h1 className="text-3xl font-bold text-center">Lunch N Specials</h1>
                    {isLoading && <Loader />}
                    {isSuccess && <div className="revert-tailwind font-montserrat" dangerouslySetInnerHTML={{ __html: data.content || '' }} />}
                </div>
            </div>
        </>
    )
}

export default About