// useSongCategories.ts
import { useEffect, useState } from 'react';
import { SongCategoryService } from "@/components/service/graphql/song-category/song-category-service";
import {TypesService} from "@/components/service/graphql/song-category/types-service";
import {CategorySong} from "@/app/(main)/(with-layout)/admin/nl/page";

export function useSongCategories() {
    const [categories, setCategories] = useState<CategorySong[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const songCategoryService = new SongCategoryService();
        songCategoryService.findAll()
            .then((response) => {
                setCategories(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    },[categories]);
    return { categories, loading, error };
}

export function useCreateSongCategory(name : string,typeId: number) {
    useEffect(() => {
        const songService = new SongCategoryService();
        songService.create(name,typeId);
    });
}