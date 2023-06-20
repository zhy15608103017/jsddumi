import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useUnmountedRef from './useUnmountedRef';


function useSafeGetState<S>(initialState?: S | (() => S)) {
    const unmountedRef = useUnmountedRef();
    const [state, setState] = useState(initialState);
    const stateRef = useRef(state);
    stateRef.current = state;
    const getState = useCallback(() => stateRef.current, []);
    const setCurrentState = useCallback((currentState) => {
        /** if component is unmounted, stop update */
        if (unmountedRef.current) return;
        setState(currentState);
    }, []);

    return [state, setCurrentState, getState] as const;
}

export default useSafeGetState;