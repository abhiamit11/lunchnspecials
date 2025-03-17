import { useNavigate } from '@tanstack/react-router';

function useCoordinates() {
    const navigate = useNavigate({ from: '/' })
    // const { x, y } = useSearch({ from: "/" })
    // function getCoordinates() {
    //     return { x, y }
    // }

    function setCoordinates(x: number, y: number) {
        navigate({
            search: (prev) => ({
                ...prev,
                x,
                y
            })
        })
    }

    return { setCoordinates }
}

export default useCoordinates