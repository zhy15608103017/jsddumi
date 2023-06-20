// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';

type Loading = boolean;
type Run = (...args: any[]) => Promise<any>;

function useRequest(requestFn: any): [Loading, Run] {
    const [loading, setLoading] = useState(false);
    const run = async (requestPayload: any) => {
        setLoading(true);
        const response = await requestFn(requestPayload).finally(() => setLoading(false));
        return Promise.resolve(response);
    };
    return [loading, run];
}

export default useRequest;
