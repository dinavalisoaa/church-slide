import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
const defaultOptions = {} as const;
export type Maybe<T> = T | null;

export type InputMaybe<T> = Maybe<T>;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GetCategoryQueryVariables = Exact<{
  filter?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
}>;

export const GetCategoryDocument = gql`
query categories($filter: String, $offset: Int, $limit: Int) {
  categories(filter: $filter, offset: $offset, limit: $limit) {
    id
    name
    typeInfo {
      id
      name
    }
  }
}

`;
export type GetCategoryQuery = {
    __typename?: "Query";
    categories: Array<{
      __typename?: "Category";
      id: string;
      name: string;
      typeInfo: {
        __typename?: "Types";
        id: string;
        name: string;
      };
    }>;
  };
  
export function useGetCategoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(
    GetCategoryDocument,
    options
  );
}



export type AddCategoryMutationVariables = Exact<{
  name: Scalars["String"];
  typeId: Scalars["ID"];
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

export const AddCategoryDocument = gql`
  mutation createcategory($name: String!, $typeId: ID!) {
    createcategory(name: $name, typeId: $typeId) {
      id
      name
      typeInfo {
        id
        name
      }
    }
  }`

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
