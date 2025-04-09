"use client"

import * as React from "react"
import {useEffect, useState} from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, MoreHorizontal, Plus} from "lucide-react"

import {Button} from "@/src/components/ui/button"
import {Checkbox} from "@/src/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {Input} from "@/src/components/ui/input"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import {useSongCategories} from "@/components/hooks/useCategories";
import {CategorySong} from "@/app/(main)/(with-layout)/admin/nl/page";
import PageContainer from "@/src/components/layout/page-container"
import Link from "next/link";

import {Heading} from '@/src/components/ui/heading';
import {Separator} from '@/src/components/ui/separator';
import NewSongCategoryDialog from "@/components/slide/common/new-song-category-dialog";
import {SongCategoryService} from "@/components/service/graphql/song-category/song-category-service";

const datas: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@example.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    }, {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@example.com",
    },
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const pageSizeOptions = [10, 20, 30, 40, 50];
export default function Page() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [categories, setCategories] = useState<CategorySong[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const fetchCategories = () => {
        const songCategoryService = new SongCategoryService();
        setLoading(true);
        songCategoryService.findAll()
            .then((response) => {
                setCategories(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };
    React.useEffect(() => {
        fetchCategories();
    }, []);
    const categories_new = React.useMemo(() =>
            categories?.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                typeId: cat.types?.id || "Unknown",
                typeName: cat.types?.name || "Unknown",
            })) || [],
        [categories]);
    const[ keyWord,setKeyWord]=useState("");
    const totalItems = categories_new.length;
    const filtered = categories_new.filter((cat) => cat.name.includes(keyWord));
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    return (
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <Heading
                        title='Categorie de chant'
                        description=''
                    />

                </div>
                <Separator/>
                {/*<ProductTableAction />*/}
                <div className="w-full">
                    <div className="flex flex-row justify-between m-3 gap-2">
                        <Input
                            placeholder="Recherche le nom"
                            onChange={(event) =>
                                setKeyWord(event.target.value as string)
                            }
                            className="max-w-sm"
                        />
                        <NewSongCategoryDialog onCategoryAdded={fetchCategories} />
                    </div>
                    <br/>
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>

                        {filtered.map(value => {
                            return (
                               <>
                                   <Card>
                                       <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                           <CardTitle className='text-sm font-medium'>
                                               <div className='text-2xl font-bold'>{value.name}</div>
                                           </CardTitle>
                                       </CardHeader>
                                       <CardContent>
                                           <div className="flex justify-between">
                                               <div>
                                                   <p className='text-xs text-muted-foreground'>
                                                       258 Hira
                                                   </p>
                                               </div>
                                               <div>
                                                   <p className='text-xs text-muted-foreground'>
                                                       {(value.typeName)}
                                                   </p>
                                               </div>
                                               <div>
                                                   <svg
                                                       xmlns='http://www.w3.org/2000/svg'
                                                       fill='none'
                                                       viewBox='0 0 24 24'
                                                       strokeWidth='1.5'
                                                       stroke='currentColor'
                                                       className='h-6 w-6'
                                                   >
                                                       <path
                                                           strokeLinecap='round'
                                                           strokeLinejoin='round'
                                                           d='M8.25 4.5l7.5 7.5-7.5 7.5'
                                                       />
                                                   </svg>
                                               </div>
                                           </div>


                                       </CardContent>
                                       <CardFooter className='flex'>

                                       </CardFooter>
                                   </Card>
                               </>
                            )
                        })}

                    </div>

                    {/*<div className="rounded-md border">*/}
                    {/*    <Table>*/}
                    {/*        <TableHeader>*/}
                    {/*            {table.getHeaderGroups().map((headerGroup) => (*/}
                    {/*                <TableRow key={headerGroup.id}>*/}
                    {/*                    {headerGroup.headers.map((header) => {*/}
                    {/*                        return (*/}
                    {/*                            <TableHead key={header.id}>*/}
                    {/*                                {header.isPlaceholder*/}
                    {/*                                    ? null*/}
                    {/*                                    : flexRender(*/}
                    {/*                                        header.column.columnDef.header,*/}
                    {/*                                        header.getContext()*/}
                    {/*                                    )}*/}
                    {/*                            </TableHead>*/}
                    {/*                        )*/}
                    {/*                    })}*/}
                    {/*                </TableRow>*/}
                    {/*            ))}*/}
                    {/*        </TableHeader>*/}
                    {/*        <TableBody>*/}
                    {/*            {table.getRowModel().rows?.length ? (*/}
                    {/*                table.getRowModel().rows.map((row) => (*/}
                    {/*                    <TableRow*/}
                    {/*                        key={row.id}*/}
                    {/*                        data-state={row.getIsSelected() && "selected"}*/}
                    {/*                    >*/}
                    {/*                        {row.getVisibleCells().map((cell) => (*/}
                    {/*                            <TableCell key={cell.id}>*/}
                    {/*                                {flexRender(*/}
                    {/*                                    cell.column.columnDef.cell,*/}
                    {/*                                    cell.getContext()*/}
                    {/*                                )}*/}
                    {/*                            </TableCell>*/}
                    {/*                        ))}*/}
                    {/*                    </TableRow>*/}
                    {/*                ))*/}
                    {/*            ) : (*/}
                    {/*                <TableRow>*/}
                    {/*                    <TableCell*/}
                    {/*                        colSpan={columns.length}*/}
                    {/*                        className="h-24 text-center"*/}
                    {/*                    >*/}
                    {/*                        No results.*/}
                    {/*                    </TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            )}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</div>*/}


                    {/*<div className="flex items-center justify-end space-x-2 py-4">*/}
                    {/*    <div className="flex-1 text-sm text-muted-foreground">*/}
                    {/*        {table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
                    {/*        {table.getFilteredRowModel().rows.length} row(s) selected.*/}
                    {/*    </div>*/}
                    {/*    <div className="space-x-2">*/}
                    {/*        <Button*/}
                    {/*            variant="outline"*/}
                    {/*            size="sm"*/}
                    {/*            onClick={() => table.previousPage()}*/}
                    {/*            disabled={!table.getCanPreviousPage()}*/}
                    {/*        >*/}
                    {/*            Previous*/}
                    {/*        </Button>*/}
                    {/*        <Button*/}
                    {/*            variant="outline"*/}
                    {/*            size="sm"*/}
                    {/*            onClick={() => table.nextPage()}*/}
                    {/*            disabled={!table.getCanNextPage()}*/}
                    {/*        >*/}
                    {/*            Next*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                {/*<Suspense*/}
                {/*    key={key}*/}
                {/*    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}*/}
                {/*>*/}
                {/*    <ProductListingPage />*/}
                {/*</Suspense>*/}
            </div>
        </PageContainer>

    )
}