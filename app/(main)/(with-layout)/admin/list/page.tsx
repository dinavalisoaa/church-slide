"use client";
import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { apps } from './data/apps'
import {Main} from "./main";
const appText = new Map<string, string>([
    ['all', 'All Apps'],
    ['connected', 'Connected'],
    ['notConnected', 'Not Connected'],
])

export default function Apps() {
    const [sort, setSort] = useState('ascending')
    const [appType, setAppType] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredApps = apps
        .sort((a, b) =>
            sort === 'ascending'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        )
        .filter((app) =>
            appType === 'connected'
                ? app.connected
                : appType === 'notConnected'
                    ? !app.connected
                    : true
        )
        .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <>

            <Main fixed>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>
                      Lisitry ny hira rehetra
                    </h1>
                    <p className='text-muted-foreground'>
                       Ato izy ato
                    </p>
                </div>
                <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
                    <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
                        <Input
                            placeholder='Filter hira...'
                            className='h-9 w-40 lg:w-[250px]'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select value={appType} onValueChange={setAppType}>
                            <SelectTrigger className='w-36'>
                                <SelectValue>{appText.get(appType)}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>Karazan-kira</SelectItem>
                                <SelectItem value='connected'>FFPM</SelectItem>
                                <SelectItem value='notConnected'>FF</SelectItem>
                                <SelectItem value='notConnected'>Antema</SelectItem>
                                <SelectItem value='notConnected'>Tsanta</SelectItem>
                                <SelectItem value='notConnected'>Baiboly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger className='w-16'>
                            <SelectValue>

                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent align='end'>
                            <SelectItem value='ascending'>
                                <div className='flex items-center gap-4'>
                                </div>
                            </SelectItem>
                            <SelectItem value='descending'>
                                <div className='flex items-center gap-4'>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Separator className='shadow' />
                <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
                    {filteredApps.map((app) => (
                        <li
                            key={app.name}
                            className='rounded-lg border p-4 hover:shadow-md'
                        >
                            <div className='mb-8 flex items-center justify-between'>
                                <div
                                    className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                                >
                                    {app.logo}
                                </div>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className={`${app.connected ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                                >
                                    {app.connected ? 'FFPM' : 'Lotorjia'}
                                </Button>
                            </div>
                            <div>
                                <h2 className='mb-1 font-semibold'>{app.name}</h2>
                                <p className='line-clamp-2 text-gray-500'>{app.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Main>
        </>
    )
}
