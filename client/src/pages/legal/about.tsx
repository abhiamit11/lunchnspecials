import { Link } from "@tanstack/react-router"

function About() {
    return (
        <>
            <div className="flex justify-center items-center max-w-lg mx-auto mt-3 max-sm:px-6">
                <div className="text-left grid grid-cols-1 gap-3">
                    <div className="mx-auto">
                        <img src="/logo.png" alt="" className="h-32 w-32  max-sm:h-28 max-sm:w-28" />
                    </div>
                    <h1 className="text-3xl font-bold text-center">Lunch N Specials</h1>

                    <div>
                        <h2 className="text-xl font-semibold">Your Guide to Delicious Deals!</h2>

                        <p className="text-base font-normal">
                            Welcome to Lunch N Specials, your ultimate resource for finding the best lunch and drink specials near you! Whether you're craving a quick bite or looking for a spot to unwind with friends, we've got you covered with unbeatable deals.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">Built by Customers, for Customers!</h2>

                        <p className="text-base font-normal">
                            Our community is at the heart of Lunch N Specials. We believe that the best recommendations come from people just like you. Join us by sharing your favorite lunch and drink spots, helping others discover new places and save money along the way. Together, we create a vibrant, helpful network of food lovers.
                        </p>
                    </div>

                    <p className="text-base font-normal">
                        Have a suggestion or want to connect with us? Reach out to us at&nbsp;
                        <a href="mailto:lns@lunchnspecials.com" className="underline">lns@lunchnspecials.com</a>
                        , or find us on&nbsp;<a href="https://www.facebook.com/" target="_blank" className="underline">Facebook</a> and&nbsp;
                        <a href="https://www.instagram.com/" target="_blank" className="underline">Instagram</a>. We'd love to hear from you!
                    </p>

                    <Link to="/" className="underline">Click here to return.</Link>
                </div>
            </div>
        </>
    )
}

export default About