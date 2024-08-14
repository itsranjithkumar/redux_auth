import { apiSlice } from "../../../app/api/apiSlice";

export const userAPiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5,
               
            })
        })
    })


    export const {
        useGetUsersQuery

    } = userAPiSlice