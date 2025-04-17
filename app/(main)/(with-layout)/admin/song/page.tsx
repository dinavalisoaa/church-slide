"use client"

import * as React from "react"
import {useState} from "react"
import {Input} from "@/src/components/ui/input"
import PageContainer from "@/src/components/layout/page-container"

import {Heading} from '@/src/components/ui/heading';
import {Separator} from '@/src/components/ui/separator';
import NewSongCategoryDialog from "@/components/slide/common/new-song-category-dialog";
import {SongDTO, SongService} from "@/components/service/graphql/song/song-service";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import { useRouter } from "next/navigation"

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const pageSizeOptions = [10, 20, 30, 40, 50];
export default function Page() {

    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const fetchSongs = () => {
        const songService = new SongService();
        setLoading(true);
        songService.findAll()
            .then((response) => {
                console.log(response);
                setSongs(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };
    React.useEffect(() => {
        fetchSongs();
        console.log(songs);
    }, []);
    const router = useRouter();
    const songs_new:SongDTO[] = React.useMemo(() =>
            songs?.map((song: SongDTO) => ({
                id: song.id,
                title: song.title,
                reference: song.reference,
                author:
                    {
                        id: song?.author.id,
                        name: song?.author.name
                    },
                category:
                    {
                        id: song?.category.id,
                        name: song?.category.name,
                        typesId:null
                    },
                    verses :[]
            })) || [],
        [songs]);
    const [keyWord, setKeyWord] = useState("");
    // const totalItems = songs_new.length;
    // const filtered = songs_new.filter((cat) => cat.name.includes(keyWord));
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(1);
const pageDetail = (id:number) => {
    router.push(`song/${id}`);
}
    return (
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <Heading
                        title='HIRA'
                        description='All songs'
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
                        <NewSongCategoryDialog onCategoryAdded={fetchSongs}/>
                    </div>
                    <br/>
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        {songs_new.map((value,index) => {
                            return (
                                   <Card key={index} >
                                       <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                           <CardTitle className='text-sm font-medium'>
                                               <div className='text-2xl font-bold'>{value.title}</div>
                                               <div className='text-2xl font-bold'>{value.reference}</div>
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
                                                       {(value.category.name)}
                                                   </p>
                                               </div>
                                               <div onClick={()=>pageDetail(value.id)}>
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