"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

import { Separator } from '@/src/components/ui/separator';
import { Main } from "./main";
import NewSongCategoryDialog from "@/components/slide/common/new-song-category-dialog";
import { SongCategoryService } from "@/components/service/graphql/song-category/song-category-service";
import {useSongCategories} from "@/components/slide/hook/useCategories";

const appText = new Map<string, string>([
    ['all', 'All Apps'],
    ['connected', 'Connected'],
    ['notConnected', 'Not Connected'],
]);

export default function SongCategory() {
    const [sort, setSort] = useState('ascending');
    const [appType, setAppType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState<any[]>([]); // Type the state appropriately
    const songCategoryService = new SongCategoryService();
    const { categories, loading, error } = useSongCategories();


    // Filter categories based on search term
    const filteredApps = categories
        ?.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <Main fixed>
            <div>
                <h1 className='text-2xl font-bold tracking-tight'>
                    Type de chant
                </h1>
                <p className='text-muted-foreground'></p>
            </div>

            <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
                <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
                    <Input
                        placeholder='Filter hira...'
                        className='h-9 w-40 lg:w-[250px]'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <NewSongCategoryDialog />
            </div>
            <Separator className='shadow' />
            <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredApps.map((app) => (
                    <li
                        key={app.id} // Use a unique identifier like id instead of name
                        className='rounded-lg border p-4 hover:shadow-md'
                    >
                        <div className='mb-8 flex items-center justify-between'>
                            <div
                                className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                            >
                                {/* Add app logo/icon here if available */}
                            </div>
                            <Button
                                variant='outline'
                                size='sm'
                                className={`${true ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                            >
                                {true ? 'FFPM' : 'Lotorjia'}
                            </Button>
                        </div>
                        <div>
                            <h2 className='mb-1 font-semibold'>{app.name}</h2>
                            <p className='line-clamp-2 text-gray-500'>
                                {/* Add description field if available in your data */}
                                {app.typeInfo?.name || 'No description'}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </Main>
    );
}