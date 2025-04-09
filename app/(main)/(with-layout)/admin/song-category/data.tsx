'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
export type SongCategory = {
    id: number;
   typeName: number;
   name: string;
};
export const columns: ColumnDef<SongCategory>[] = [
    {
        accessorKey: 'photo_url',
        header: 'IMAGE'
    },
    {
        accessorKey: 'name',
        header: 'NAME'
    },
    {
        accessorKey: 'category',
        header: 'CATEGORY'
    },
    {
        accessorKey: 'price',
        header: 'PRICE'
    },
    {
        accessorKey: 'description',
        header: 'DESCRIPTION'
    },

    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];
