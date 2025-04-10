import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ReactGA from 'react-ga4';
import { getPrivacyContent } from "./api";
import Loader from "./Loader";

function PrivacyPolicy() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Privacy Policy" });
    }, []);
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['legal-content', 'privacy-policy'],
        queryFn: getPrivacyContent,
        refetchOnWindowFocus: false
    })
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center max-w-2xl mx-auto mt-3 max-sm:px-6">
                <h1 className="text-3xl font-bold text-center">Lunch N Specials</h1>
            </div>
            {isLoading &&
                <div className="flex justify-center items-center w-full h-full fixed text-center bg-background/90 px-2.5 top-0 z-50 left-0">
                    <Loader />
                </div>
            }
            {isSuccess &&
                <div className="mb-32 mt-5 max-sm:px-4 max-w-full overflow-x-hidden">
                    <div className="no-tailwind" dangerouslySetInnerHTML={{ __html: data.data?.content || '' }}></div>
                </div>
            }
        </div >
    )
}

export default PrivacyPolicy