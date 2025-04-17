'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import {useAddCategoryMutation} from "@/components/service/graphql/graphql";
import createApolloClient from "@/lib/apolloClient";
import {gql} from "@apollo/client";
import {SongCategoryService} from "@/components/service/graphql/song-category/song-category-service";
import {useSongCategories} from "@/components/hooks/useCategories";
import {useCreateType, useTypes} from "@/components/hooks/useTypes";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {TypesService} from "@/components/service/graphql/song-category/types-service";
import { CirclePlus } from 'lucide-react';

type SearchableSelectProps = {
  setSelectedId:Dispatch<SetStateAction<string | undefined>>;
  selectedId:string | undefined;
  types:any;
};

const SearchableSelect: FC<SearchableSelectProps> = ({ types,setSelectedId, selectedId }) => {
  // const { data, loading, error, refetch } = useQuery(GET_OPTIONS);

  // const [addOption] = useMutation(ADD_OPTION);
  const [search, setSearch] = useState("");
  const[filteredOptions,setFilteredOptions] = useState<any[]>();
  // const [selectedId, setSelectedId] = useState<string | null>(null);
    const[selectedOption,setSelectedOption] = useState<any>();
  useEffect(() => {
    const filteredOptions = types?.filter((option) =>
        option?.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  }, [types]);
  useEffect(() => {
    console.log(selectedOption+"<<<");
    setSelectedOption(types?.find((opt) => opt.id as string == selectedId));
  }, [selectedId]);
  const handleAddOption = async () => {
    try {  const typesService = new TypesService();
      const newType = typesService.create(search)
          .then((response) => {
            if (response?.id) {
              setSelectedId(response.id);
              setSearch("");
            }
          })
          .catch((error) => {
            console.error(error);
          });

    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };
  return (
        <Select onValueChange={setSelectedId} value={selectedId as string} >
          <SelectTrigger >
            <SelectValue placeholder={selectedOption===undefined ? "Sélectionner une option": selectedOption?.name }>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <div >
              <Input
                  placeholder="Rechercher ou ajouter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-2"
              />
            </div>
            {filteredOptions?.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
            ))}
            {search && !filteredOptions?.some((opt) => opt.name.toLowerCase() === search.toLowerCase()) && (
                <div className="p-2 flex justify-between items-center">
                  <span onClick={handleAddOption}>Créer le type<b> <i>{search}</i></b> </span>
                </div>
            )}
          </SelectContent>
        </Select>
  );
}
export default  function NewSongCategoryDialog({ onCategoryAdded })  {
  // const client = createApolloClient();
  const songCategoryService = new SongCategoryService();
  const [type, setType] = useState<string>();
  const [types, setTypes] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetch = ()=>{
    const typesService = new TypesService();
    typesService.findAll()
        .then((response) => {
          setTypes(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  }
  useEffect(() => {
    fetch();
  },[]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const types = new TypesService();
    const {title, description} = Object.fromEntries(formData);
    if (type != null) {
      const typeId = Number.parseInt(type);
      songCategoryService.create(title.toString(), typeId);
      onCategoryAdded();
    }//type? type?.toString() as unknown as number:1;
  };
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size='lg' className="border-2">
            Nouveau <CirclePlus />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Ajout d&apos;un type de chant</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <form
              id='todo-form'
              className='grid gap-4 py-4'
              onSubmit={handleSubmit}
          >
            <div className='grid grid-cols-4 items-center gap-4'>
              <Input
                  id='title'
                  name='title'
                  placeholder='Titre'
                  className='col-span-4'
              />
            </div>
            <div className='grid'>
              {/*<Select name={"type"} onValueChange={setType}>*/}
              {/*  <SelectTrigger className='w-36'>*/}
              {/*    <SelectValue placeholder={'Selection'} >{type?.name}</SelectValue>*/}
              {/*  </SelectTrigger>*/}
              {/*  <SelectContent>*/}
              {/*    {types.map((typesItem) => (*/}
              {/*   <>*/}
              {/*     <SelectItem key={typesItem.id} value={typesItem}>{typesItem.name}</SelectItem></>*/}
              {/*      ))}*/}
              {/*  </SelectContent>*/}
              {/*</Select>*/}
              <SearchableSelect setSelectedId={setType} selectedId={type} types={types} />
            </div>
          </form>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type='submit' size='sm' form='todo-form'>
               Cr&eacute;er <CirclePlus />
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
