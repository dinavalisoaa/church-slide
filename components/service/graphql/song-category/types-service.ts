import createApolloClient from "@/lib/apolloClient";
import {ApolloClient, gql, NormalizedCacheObject} from "@apollo/client";

export class TypesService {
   client: ApolloClient<NormalizedCacheObject>;
    constructor() {
        this.client = createApolloClient();
    }

     create(name:string){
       return this.client.mutate({
           mutation: gql`
             mutation TypesMutation($name: String!) {
                 createType(name: $name) {
                 id
                 name
               }
             }
           `,
           variables: { name:name},
         }).then(({ data }) => data.createType );
     }
    findAll() {
        return this.client
        .query({
            query: gql`
                query TypesQuery {
                    allTypes {
                        id
                        name
                    }
                }
            `,
        })
        .then(({ data }) => data.allTypes );
    }
}