import { Link } from "@tanstack/react-router"
import { useEffect } from "react";
import ReactGA from 'react-ga4';

function CookiesPolicy() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Cookies Policy" });
    }, []);
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center max-w-lg mx-auto mt-3 max-sm:px-6">
                <h1 className="text-3xl font-bold text-center">Lunch N Specials</h1>
            </div>
            <div className="text-center mt-5 max-w-xl mx-auto">
                <h2 className="text-xl font-semibold my-2">Cookies Policy</h2>
                <p>
                    We are currently working on our Cookies Policy and will be adding it to our site soon.
                    Thank you for visiting!
                </p>

                <Link to="/" className="underline mt-3">Click here to return.</Link>
            </div>
        </div>
    )
}

export default CookiesPolicy