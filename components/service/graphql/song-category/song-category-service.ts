import createApolloClient from "@/lib/apolloClient";
import {ApolloClient, gql, NormalizedCacheObject} from "@apollo/client";

export class SongCategoryService {
   client: ApolloClient<NormalizedCacheObject>;
    constructor() {

        this.client = createApolloClient();

    }

     create(name:string,typeId:number){
        this.client.mutate({
           mutation: gql`
             mutation CategoryMutation($name: String!, $typeId: ID!) {
                 createCategory(name: $name, typeId: $typeId) {
                 id
                 name
               }
             }
           `,
           variables: { name:name, typeId:typeId},
         });
     }
    findAll() {
        return this.client
        .query({
            query: gql`
                query CategoryQuery {
                    allCategories {
                        id
                        name
                        types {
                            id
                            name
                        }
                    }
                }
            `,
        })
        .then(({ data }) => data.allCategories );
    }
}