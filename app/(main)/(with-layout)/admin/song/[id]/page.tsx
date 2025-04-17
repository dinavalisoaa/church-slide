'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import {Card, CardContent} from '@/src/components/ui/card';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PageContainer from '@/src/components/layout/page-container';
import { Heading } from '@/src/components/ui/heading';
import { Separator } from '@/src/components/ui/separator';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/src/components/ui/carousel";
import React from "react";

// Zod schema (plus de 'reference' global)
const formSchema = z.object({
    title: z.string().min(1),
    category: z.string().min(1),
    author: z.string().min(1),
    reference:z.string(),
    versesText: z.string().min(1)
});

function versesToText(verses: { lyrics: string, reference: string }[]) {
    return verses
        .map((verse, index) => `[And ${index + 1}]\n${verse.lyrics}`)
        .join('\n\n');
}
function textToVerses(text: string) {
    const chunks = text.split(/\[And \d+\]/).map(chunk => chunk.trim()).filter(Boolean);
    return chunks.map((lyrics, index) => ({
        lyrics,
        reference: String(index + 1)
    }));
}
const initialVerses = [
    {
        reference: '1',
        lyrics: `Ray ô ! mba faniriako\nRaha toa ka sitrakao\nNy handova lanitra\nDieny ety an-tany`
    },
    {
        reference: '2',
        lyrics: `Ray ô ! mba faniriako\nRaha toa ka sitrakao\nNy ho zanaka manoa`
    }
];

const defaultValues = {
    title: 'Faniriko',
    category: 'FF',
    author: 'JJ Rabearivelo',
    versesText: versesToText(initialVerses),
    reference:''
};


type SongForm = z.infer<typeof formSchema>;

const categories = [
    { id: '1', name: 'FF' },
    { id: '2', name: 'Hira fiderana' }
];

const authors = [
    { id: '1', name: 'JJ Rabearivelo' },
    { id: '2', name: 'Rakoto Frah' }
];

export default function CreateSongPage() {
    const form = useForm<SongForm>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: 'verses'
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const verses = textToVerses(values.versesText);

        const song = {
            title: values.title,
            category: values.category,
            author: values.author,
            verses
        };

        console.log('🎵 Nouvelle chanson :', song);
    }


    return (
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-start justify-between'>
                    <Heading title='Hira vaovao' description='Ajoute un nouveau hira' />
                </div>
                <Separator />

                <div className="flex flex-row gap-4">
                    <div className={"w-1/2"}>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                                    <div className="flex flex-row gap-4">
                                        <div className="w-1/2"><FormField
                                            control={form.control}
                                            name='title'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='Titrin’ilay hira' {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        /></div>
                                        <div className="w-1/2">
                                            <FormField
                                                control={form.control}
                                                name='reference'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Reference</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder='Référence (ex: FF 34)' {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <div className="w-1/2"><FormField
                                            control={form.control}
                                            name='category'
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Catégorie</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Choisir une catégorie'/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map((cat) => (
                                                                <SelectItem key={cat.id} value={cat.id}>
                                                                    {cat.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        </div>
                                        <div className="w-1/2">
                                            <FormField
                                                control={form.control}
                                                name='author'
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Auteur</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Choisir un auteur'/>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {authors.map((auth) => (
                                                                    <SelectItem key={auth.id} value={auth.id}>
                                                                        {auth.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-4'>
                                        <FormLabel>Verses</FormLabel>
                                        <div className='grid grid-cols-1 gap-4'>
                                            <div
                                                className='border rounded-2xl shadow-sm p-4 space-y-4 bg-white'>
                                                <FormField
                                                    control={form.control}
                                                    name='versesText'
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel>Couplets</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    className='resize-none min-h-[300px]'
                                                                    placeholder='[And 1]\nTon texte ici...\n\n[And 2]\nAutre couplet...'
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                            </div>

                                        </div>

                                        <Button
                                            type='button'
                                            onClick={() =>
                                                append({lyrics: '', reference: String(fields.length + 1)})
                                            }
                                            variant='outline'
                                        >
                                            Ajouter un verset
                                        </Button>
                                    </div>


                                    <Button type='submit'>Créer la chanson</Button>
                                </form>
                            </Form>

                        </CardContent>
                    </div>
                    <div className={"w-1/2 h-1/2 min-h-200"}>
                        <CarouselDemo/>
                    </div>
                </div>
            </div>
        </PageContainer>

    );
}
function CarouselDemo() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel setApi={setApi}>
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
