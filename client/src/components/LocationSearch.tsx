import { useEffect, useMemo, useState } from 'react';
import { ApiKeyManager, IPoint } from "@esri/arcgis-rest-request";
import { geocode } from "@esri/arcgis-rest-geocoding";
import debouce from "lodash/debounce"
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading
} from "@/components/ui/command"
import useMap from '@/hooks/useMap';
import { MAP_KEY } from '@/constant';
import useCoordinates from '@/hooks/useCoordinates';
import axios from 'axios';
import ReactGA from 'react-ga4';

const LocationSearch = () => {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState<{ address: string, key: string }[] | null>();
    const [loading, setLoading] = useState(false);
    const { setLocation } = useMap()
    const { setCoordinates } = useCoordinates()
    const accessToken = MAP_KEY;

    const handleInputChange = (value: string) => {
        setAddress(value);
    };

    const handleSearch = async (value: string) => {
        setLoading(true);
        setResult(null);

        const authentication = ApiKeyManager.fromKey(accessToken);

        try {
            const response = await geocode({
                address: value,
                authentication
            });
            const res: IPoint[] = []
                ; (response.candidates).forEach((item) => {
                    res.push(item.location)
                })

            if (res.length < 1) {
                throw new Error("")
            }

            return res[0]

        } catch (error) {
            console.error("Geocode error:", error);
            return { x: 0, y: 0 }
        } finally {
            setLoading(false);
        }
    };

    async function handleSuggestions() {
        setLoading(true);
        setResult(null);
        try {
            const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=pjson&countryCode=USA&maxSuggestions=5&sourceCountry=USA&returnCollections=false&text=`
            const response = await axios.get(url + address)
            if (response.status === 200 && response.data) {
                const { suggestions } = response.data;
                const res: { address: string, key: string }[] = []
                    ; (suggestions).forEach((item: { text: string, magicKey: string }) => {
                        res.push({ address: item.text, key: item.magicKey })
                    })
                setResult(res);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (address) {
            handleSuggestions()
        } else {
            setResult(null);
        }
        return () => {
        }
    }, [address])


    const debouncedResults = useMemo(() => {
        return debouce(handleInputChange, 1000);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const onGoToLocation = async (value: string) => {
        ReactGA.event({
            category: 'engagement',
            action: 'Location_engagement',
            label: value
        });
        const { x, y } = await handleSearch(value)
        setLocation(x, y)
        setCoordinates(x, y)
        setResult([])
        setAddress('')
    }

    return (
        <div className='max-w-md w-full col-span-2 md:px-0 drop-shadow-sm'>
            <Command className='w-full border relative overflow-visible'>
                <CommandInput placeholder="Type Address or Zip Code to Search for Specials.." value={address} onValueChange={handleInputChange} />
                <CommandList className='max-sm:absolute bg-white max-w-md w-full top-[36px] rounded-b-md left-0 z-10'>
                    {loading && address && <CommandLoading className='text-center py-1'>Hang on…</CommandLoading>}
                    {(Array.isArray(result) && result.length > 0) &&
                        result.map((item, index) => {
                            return (
                                <CommandItem className='' key={`${item.key}_${index}`} onSelect={onGoToLocation}>{item.address}</CommandItem>
                            )
                        })
                    }
                </CommandList>
            </Command>
        </div>
    );
};

export default LocationSearch;
