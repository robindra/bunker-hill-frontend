import { useEffect, useState } from "react";

const useCounter = (forwards = true) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prevCounter) => {
                return forwards ? prevCounter + 1 : prevCounter -1
            });
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, [forwards]);

    return counter;
};

export default useCounter;