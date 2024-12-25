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
  const { data, loading, error } = useGetCategoryQuery({
    variables: {
      filter: "",
      offset: 0,
      limit: 10,
    },
  });