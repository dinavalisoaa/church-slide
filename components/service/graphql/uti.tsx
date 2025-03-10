import createApolloClient from "@/lib/apolloClient";
import {gql} from "@apollo/client";

export async function fetch(){
    const client = createApolloClient();
    const {data} = await client.query({
        query: gql`
            query ListCategories {
                categories {
                    id
                    name
                    typeInfo {
                        id
                        name
                    }
                }
            }
        `,
    });

    return {

        categories: data.categories
    };
}