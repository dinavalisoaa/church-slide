import createApolloClient from "@/lib/apolloClient";
import {ApolloClient, gql, NormalizedCacheObject} from "@apollo/client";

export class SongCategoryService {
   client: ApolloClient<NormalizedCacheObject>;
    constructor() {

        this.client = createApolloClient();

    }

     create(title:string,typeId:number){
        this.client.mutate({
           mutation: gql`
             mutation CreateCategory($name: String!, $typeId: ID!) {
               createcategory(name: $name, typeId: $typeId) {
                 id
                 name
                 typeInfo {
                   id
                   name
                 }
               }
             }
           `,
           variables: { name:title, typeId:typeId},
         });
     }
    findAll() {
        return this.client
        .query({
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
        })
        .then(({ data }) => data.categories);
    }
}