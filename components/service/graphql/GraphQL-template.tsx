
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const defaultOptions = {} as const;

export function useGetArtistQuery(baseOptions: Apollo.QueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, options);
}
export const GetArtistDocument = gql`
    query GetArtist($id: ID!) {
  artist(id: $id) {
    id
    name
    picture
    songs {
      id
      title
      artist
      artists {
        id
        name
      }
      album {
        id
        title
        cover
      }
      duration
    }
    albums {
      ...AlbumFragment
    }
  }
}`;
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
  };

export type GetArtistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;
export type GetArtistQuery = {
     __typename?: 'Query',
      artist: {
         __typename?: 'Artist', 
         id: string, 
         name: string, 
         picture: string, 
         songs: Array<{
             __typename?: 'Track',
            id: string,
            title: string,
            artist: string,
            duration?: number | null,
            artists:Array<{
                __typename?: 'Artist',
                id: string,
                name: string }>,
                album: {
                __typename?: 'Album',
                id: string,
                title: string,
                cover?: string | null } }>,
                albums: Array<{ 
                    __typename?: 'Album', 
                    id: string,
                    title: string,
                    artist: string,
                    year?: number | null,
                    cover?: string | null }> } };


                  

export const AddCategoryDocument = gql`
  mutation addCategory($name: String!, $typeInfoId: ID!) {
    addCategory(name: $name, typeInfoId: $typeInfoId) {
      id
      name
      typeInfo {
        id
        name
      }
    }
  }
`;


export type AddCategoryMutationVariables = Exact<{
  name: Scalars["String"];
  typeInfoId: Scalars["ID"];
}>;

export type AddCategoryMutation = {
  __typename?: "Mutation";
  addCategory: {
    __typename?: "Category";
    id: string;
    name: string;
    typeInfo: {
      __typename?: "Types";
      id: string;
      name: string;
    };
  };
};


export function useAddCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCategoryMutation,
    AddCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(
    AddCategoryDocument,
    options
  );
}
