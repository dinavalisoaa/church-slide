// useSongTypes.ts
import { useEffect, useState } from 'react';
import { SongCategoryService } from "@/components/service/graphql/song-category/song-category-service";
import {TypesService} from "@/components/service/graphql/song-category/types-service";

export function useTypes() {
    const [types, setTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const typesService = new TypesService();
        typesService.findAll()
            .then((response) => {
                setTypes(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                console.error(error);
                setLoading(false);
            });
    },[types]);

    return { types, loading, error };
}
export function useCreateType(name : string) {
    const [newTypes, setNewTypes] = useState<any>();
    useEffect(() => {

        const typesService = new TypesService();
        typesService.create(name)
            .then((response) => {
                setNewTypes(response);
            })
            .catch((error) => {


                console.error(error);
            });
    });
    return newTypes
}