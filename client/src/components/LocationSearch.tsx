import { useEffect, useState } from 'react';
import { ApiKeyManager, IPoint } from '@esri/arcgis-rest-request';
import { geocode } from '@esri/arcgis-rest-geocoding';
import debounce from 'lodash/debounce';
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading,
} from '@/components/ui/command';
import useMap from '@/hooks/useMap';
import { MAP_KEY } from '@/constant';
import useCoordinates from '@/hooks/useCoordinates';
import axios from 'axios';
import ReactGA from 'react-ga4';

const LocationSearch = () => {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState<{ address: string; key: string }[] | null>(null);
    const [loading, setLoading] = useState(false);
    const { setLocation } = useMap();
    const { setCoordinates } = useCoordinates();
    const accessToken = MAP_KEY;


    const handleInputChange = debounce((value: string) => {
        setAddress(value);
    });

    const handleSearch = async (value: string) => {
        setLoading(true);
        try {
            const authentication = ApiKeyManager.fromKey(accessToken);
            const response = await geocode({ address: value, authentication });
            const res: IPoint[] = response.candidates.map((item) => item.location);

            if (res.length < 1) throw new Error('No results found');
            return res[0];
        } catch (error) {
            console.error('Geocode error:', error);
            return { x: 0, y: 0 };
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestions = async () => {
        if (!address) return setResult(null);

        setLoading(true);
        try {
            const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=pjson&countryCode=USA&maxSuggestions=5&sourceCountry=USA&returnCollections=false&text=${address}`;
            const response = await axios.get(url);
            if (response.status === 200 && response.data.suggestions) {
                const res = response.data.suggestions.map((item: { text: string, magicKey: string }) => ({
                    address: item.text,
                    key: item.magicKey,
                }));
                setResult(res);
            }
        } catch (error) {
            console.error('Suggestions fetch error:', error);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const onGoToLocation = async (value: string) => {
        ReactGA.event({
            category: 'engagement',
            action: 'Location_engagement',
            label: value,
        });

        const { x, y } = await handleSearch(value);
        setLocation(x, y);
        setCoordinates(x, y);
        setResult(null);
        setAddress('');
    };

    useEffect(() => {
        if (address) {
            handleSuggestions();
        } else {
            setResult(null);
        }
    }, [address]);

    useEffect(() => {
        return () => {
            handleInputChange.cancel();
        };
    }, []);

    return (
        <div className='max-w-md w-full col-span-2 md:px-0 drop-shadow-sm'>
            <Command className='w-full border relative overflow-visible'>
                <CommandInput
                    className='max-sm:text-xs'
                    placeholder="Type Address or Zip Code to Search for Specials.."
                    value={address}
                    onValueChange={(value) => handleInputChange(value)}
                />
                <CommandList className='absolute bg-white max-w-md w-full top-[36px] rounded-b-md left-0 z-10'>
                    {loading && address && <CommandLoading className='text-center py-1'>Hang on…</CommandLoading>}
                    {Array.isArray(result) && result.length > 0 && result.map((item, index) => (
                        <CommandItem key={`${item.key}_${index}`} onSelect={() => onGoToLocation(item.address)}>
                            {item.address}
                        </CommandItem>
                    ))}
                </CommandList>
            </Command>
        </div>
    );
};

export default LocationSearch;
