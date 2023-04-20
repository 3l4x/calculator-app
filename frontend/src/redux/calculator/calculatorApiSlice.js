import apiSlice from '../api/apiSlice';

const calculatorApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Number'],
    endpoints: (builder) => ({
        getNumber: builder.query({
            query: () => ({
                url: 'number/',
                method: 'get',
            }),
            providesTags: 'Number',
            keepUnusedDataFor: 20, //20sec
            transformResponse: response => {
                return response?.message
            },
        }),
        postNumber: builder.mutation({
            query: (expression) => ({
                url: 'number/',
                method: 'post',
                body: {
                    calcNumber: expression
                }
            }),
            invalidatesTags: 'Number',
        }),
    })

});



export const { useGetNumberQuery, usePostNumberMutation } = calculatorApiSlice;