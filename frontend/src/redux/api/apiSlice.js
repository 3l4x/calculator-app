import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deleteCredentials, setCredentials } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    }
})



const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        const accessToken = await baseQuery('refresh/', api, extraOptions)
        const { dispatch, getState } = api;
        if (!accessToken?.data) {
            dispatch(deleteCredentials());
        }
        else {
            dispatch(setCredentials({ accessToken: accessToken.data?.accessToken, user: getState().auth.user }));
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
}


const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: (builder) => ({
        //
    }),
})

export default apiSlice;