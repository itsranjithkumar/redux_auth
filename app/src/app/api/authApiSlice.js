import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>
    ({
        login: builder.mutation({
            login: builder.mutation({
                queryL: credentials => ({
                    url: '/auth',
                    method: 'POST',
                    body: { ...credentials }
                })
            }),
    })

    })
})

export const {
    useLoginMutation
} = authApiSlice

