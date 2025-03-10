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
import {useAddCategoryMutation} from "@/components/service/graphql/GraphQL";
import createApolloClient from "@/lib/apolloClient";
import {gql} from "@apollo/client";
import {SongCategoryService} from "@/components/service/graphql/song-category/song-category-service";


export default  function NewSongCategoryDialog() {
  // const client = createApolloClient();
  const songCategoryService = new SongCategoryService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const {title, description} = Object.fromEntries(formData);
    songCategoryService.create(title.toString(), 1);
    const type = 1;
    // const { data } = await client.mutate({
    //   mutation: gql`
    //     mutation CreateCategory($name: String!, $typeId: ID!) {
    //       createcategory(name: $name, typeId: $typeId) {
    //         id
    //         name
    //         typeInfo {
    //           id
    //           name
    //         }
    //       }
    //     }
    //   `,
    //   variables: { name:title, typeId:type},
    // });
  };

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='default' size='lg' className="border-2">
            Nouveau de type de chant
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Ajout d'un type de chant</DialogTitle>
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
            <div className='grid grid-cols-4 items-center gap-4'>
              <Textarea
                  id='description'
                  name='description'
                  placeholder='Description...'
                  className='col-span-4'
              />
            </div>
          </form>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type='submit' size='sm' form='todo-form'>
                Ajouter
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
