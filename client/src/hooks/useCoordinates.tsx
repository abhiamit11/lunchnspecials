import { useNavigate } from '@tanstack/react-router';

function useCoordinates() {
    const navigate = useNavigate({ from: '/' })
    // const { x, y } = useSearch({ from: "/" })
    // function getCoordinates() {
    //     return { x, y }
    // }

    function setCoordinates(x: number, y: number, init?: boolean) {
        navigate({
            search: (prev) => ({
                ...prev,
                x,
                y,
                init
            })
        })
    }

    return { setCoordinates }
}

export default useCoordinates