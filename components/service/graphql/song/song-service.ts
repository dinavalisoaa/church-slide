import createApolloClient from "@/lib/apolloClient";
import {ApolloClient, gql, NormalizedCacheObject} from "@apollo/client";

export interface SongDTO {
    id: number;
    reference: string;
    title: string;
    category: CategoryDTO;
    author: AuthorDTO;
    verses: VerseDTO[];
}

export interface CategoryDTO {
    id: number;
    name: string;
    typesId:number;
}
export interface VerseDTO {

}
export interface AuthorDTO {
    id: number;
    name: string;
}
export class SongService {
   client: ApolloClient<NormalizedCacheObject>;
    constructor() {

        this.client = createApolloClient();

    }
     create(title:string,reference:string,authorId:number,categoryId:number){
        this.client.mutate({
           mutation: gql`
             mutation CreateSong($title: String!,$reference: String!, $authorId: ID!,$categoryId: ID!) {
                 createSong(title: $title, reference : $reference,authorId:$authorId,categoryId:$categoryId) {
                     id
                     title
                     reference
                 }
             }
           `,
           variables: { title:title, reference:reference,authorId:authorId,categoryId:categoryId},
         });
     }
    findAll() {
        return this.client
        .query({
            query: gql`query SongQuery {
                allSongs {
                    id
                    reference
                    title
                    category {
                        id
                        name
                    }
                    author{
                        id
                        name
                    }
                }
            }
            `,
        })
        .then(({ data }) => data.allSongs );
    }
}