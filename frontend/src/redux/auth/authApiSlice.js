import apiSlice from '../api/apiSlice';


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (validatedFormData) => ({
                url: 'auth/login',
                method: 'POST',
                body: validatedFormData
            })
        }),
        register: builder.mutation({
            query: (validatedFormData) => ({
                url: 'auth/register',
                method: 'POST',
                body: validatedFormData
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'get',
            })
        }),
        who: builder.query({
            query: () => ({
                url: 'auth/who',
                method: 'get',
            })
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useWhoQuery } = authApiSlice;