import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

export default function useSafeUpdate(data) {
    const ref = useRef();
    const [state, setState] = useState(data);
    useEffect(() => {
        ref.current = data;
    }, []);

    const setSafeState = (newState) => {
        if (isEqual(newState, ref.current)) {
            return;
        }
        ref.current = newState;
        setState(newState);
    };

    return [state, setSafeState];

}