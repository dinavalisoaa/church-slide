// useSongCategories.ts
import { useEffect, useState } from 'react';
import { SongCategoryService } from "@/components/service/graphql/song-category/song-category-service";

export function useSongCategories() {
    const [categories, setCategories] = useState<any[]>([]);
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
    });

    return { categories, loading, error };
}