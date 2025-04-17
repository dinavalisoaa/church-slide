import createApolloClient from "@/lib/apolloClient";
import {ApolloClient, gql, NormalizedCacheObject} from "@apollo/client";

export class AuthorService {
   client: ApolloClient<NormalizedCacheObject>;
    constructor() {
        this.client = createApolloClient();
    }

     create(name:string){
       return this.client.mutate({
           mutation: gql`
             mutation CreateAuthor($name: String!) {
                 createAuthor  (name: $name) {
                 id
                 name
               }
             }
           `,
           variables: { name:name}
         }).then(({ data }) => data.createAuthor );
     }
    findAll() {
        return this.client
        .query({
            query: gql`
                query Author {
                    allAuthors {
                        id
                        name
                    }
                }
            `,
        })
        .then(({ data }) => data.allAuthors );
    }
}