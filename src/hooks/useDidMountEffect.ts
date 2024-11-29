import { useEffect, useRef } from 'react';

const useDidMountEffect = (func: () => void, deps: React.DependencyList) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            func(); // Call the function if not the first render
        } else {
            didMount.current = true; // Set to true after the first render
        }
    }, deps);
};

export default useDidMountEffect;