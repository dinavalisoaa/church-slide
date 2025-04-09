'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import {StandardSchemaV1} from "zod/lib/standard-schema";
import {TypeSong} from "@/src/interface/interface";

export const columnsTypes: ColumnDef<TypeSong>[] = [
    {
        accessorKey: 'Id',
        header: 'ID',
        cell: ({ row }) => {
            return (
                <div className='relative aspect-square'>
                    <Image
                        src={row.getValue('photo_url')}
                        alt={row.getValue('name')}
                        fill
                        className='rounded-lg'
                    />
                </div>
            );
        }
    },
    {
        accessorKey: 'name',
        header: 'NAME'
    }
];
