import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { create } from 'domain'
import { HYDRATE } from "next-redux-wrapper";

interface Breed {
  id?: string
  name?: string
  image: {
    url: string
    id: string
  }
}
interface Image {
  id?: string
  url?: string | ""
  width: number
  height: number
}

interface BreedDetail {
  id: string
  name: string
  bred_for: string
  breed_group: string
  life_span: string
  temperament: string
  origin: string
  url?: string
  reference_image_id: string
}
interface Vote {
  image_id: string
  sub_id: string
  value: number
}

type VotesResponse = Vote[]

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', process.env.NEXT_PUBLIC_DOGS_API_KEY as string)

      return headers
    }
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number|void> ({
        query(limit = 10) {
          return `/breeds?limit=${limit}`
        }
      }),
      searchBreed: builder.query<BreedDetail, string |void> ({
        query(name) {
          return `/breeds/search?q=${name}`
        },
        transformResponse: (response) => {
          // console.log(response)
          const t = response as BreedDetail[]
          return t[0]
        }
      }),
      fetchVotes: builder.query<Vote[], number | void>({
        query(subId) {
          return `/votes?sub_id=${subId}`
        }
      }),
      fetchImage: builder.query<Image, string | void>({
        query(id) {
          return `/images/${id}`
        },
        transformResponse: (response) => {
          // console.log(response)
          return response as Image
        }
      }),
      fetchVote: builder.query<Vote, number | void>({
        query(voteId) {
          return `/votes/${voteId}`
        }
      }),
      addVote: builder.mutation<Vote, Partial<Vote>>({
        query: (body) => ({
          url: `votes`,
          method: 'POST',
          body,
        }),
      }),
    }
  }
})

// Export hooks for usage in functional components
export const { 
  useFetchBreedsQuery, 
  useFetchVotesQuery, 
  useAddVoteMutation,
  useSearchBreedQuery,
  useFetchImageQuery,
  util: { getRunningOperationPromises },
} = apiSlice

// export endpoints for use in SSR
export const { 
  searchBreed,
} = apiSlice.endpoints;
