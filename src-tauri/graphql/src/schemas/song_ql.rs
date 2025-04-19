use async_graphql::{Context, Object, Result, SimpleObject};
use sea_orm::{EntityTrait, ModelTrait, QueryOrder, QuerySelect, RelationTrait};
use repository::DbConnection;
use entity::{song, song::Entity as Song, author, category,verses, verses::Entity as Verses};
use serde::{Deserialize, Serialize};
use anyhow::Error;
use sea_orm::ActiveValue::Set;
use sea_orm::ActiveValue;
use sea_orm::ActiveModelTrait;
use sea_orm::DbErr;
use sea_orm::Set as OtherSet;
use sea_orm::QueryFilter;
use sea_orm::ColumnTrait;
use crate::schemas::author_ql::AuthorDTO;
use crate::schemas::category_ql::CategoryDTO;
use crate::schemas::verses_ql::VerseDTO;
use sea_orm::PaginatorTrait;
#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct SongDTO {
    pub id: i32,
    pub title: String,
    pub reference: String,
    pub category: Option<CategoryDTO>,
    pub author: Option<AuthorDTO>,
    pub verses: Vec<VerseDTO>, // Ajout des versets
}

#[derive(Default)]
pub struct SongQuery;

#[Object]
impl SongQuery {

    async fn find_song_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32,
    ) -> Result<Option<SongDTO>, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if let Some(song) = Song::find_by_id(id).one(&db.connection).await? {
            let related_author = song.find_related(author::Entity).one(&db.connection).await?;
            let related_category = song.find_related(category::Entity).one(&db.connection).await?;

            let song_dto = SongDTO {
                id: song.id,
                title: song.title,
                reference: song.reference,
                author: related_author.map(|a| AuthorDTO {
                    id: a.id,
                    name: a.name,
                }),
                category: related_category.map(|c| CategoryDTO {
                    id: c.id,
                    name: c.name,
                    types:None,
                    type_id: c.type_id,
                }),
                verses: vec![],
            };

            Ok(Some(song_dto))
        } else {
            Ok(None)
        }
    }

    async fn all_songs(
        &self,
        ctx: &Context<'_>,
        offset: Option<i32>,
        limit: Option<i32>,
    ) -> Result<Vec<SongDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = Song::find()
            .order_by_asc(song::Column::Title);

        if let Some(offset_val) = offset {
            query = query.offset(offset_val as u64);
        }
        if let Some(limit_val) = limit {
            query = query.limit(limit_val as u64);
        }

        let songs = query.all(&db.connection).await?;

        let mut song_dtos = Vec::new();
        for song in songs {
            let related_author = song.find_related(author::Entity).one(&db.connection).await?;
            let related_category = song.find_related(category::Entity).one(&db.connection).await?;

            let song_dto = SongDTO {
                id: song.id,
                title: song.title,
                reference: song.reference,
                author: related_author.map(|a| AuthorDTO {
                    id: a.id,
                    name: a.name,
                }),
                category: related_category.map(|c| CategoryDTO {
                    id: c.id,
                    name: c.name,
                    types: None,
                    type_id : c.type_id
                }),
                verses: vec![],
            };
            song_dtos.push(song_dto);
        }

        Ok(song_dtos)
    }
    async fn find_song_with_verses_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32,
    ) -> Result<Option<SongDTO>, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if let Some(song) = Song::find_by_id(id).one(&db.connection).await? {
            let related_author = song.find_related(author::Entity).one(&db.connection).await?;
            let related_category = song.find_related(category::Entity).one(&db.connection).await?;
            let related_verses = Verses::find()
               .filter(verses::Column::SongReference.eq(song.reference.clone()))
                .all(&db.connection)
                .await?;

            let song_dto = SongDTO {
                id: song.id,
                title: song.title,
                reference: song.reference,
                author: related_author.map(|a| AuthorDTO {
                    id: a.id,
                    name: a.name,
                }),
                category: related_category.map(|c| CategoryDTO {
                    id: c.id,
                    name: c.name,
                    types: None,
                    type_id: c.type_id,
                }),
                verses: related_verses.into_iter().map(|v| VerseDTO {
                    id: v.id,
                    lyrics: v.lyrics,
                    reference: v.reference,
                    song: None,
                }).collect(),
            };

            Ok(Some(song_dto))
        } else {
            Ok(None)
        }
    }
async fn song_count_by_category(
        &self,
        ctx: &Context<'_>,
        category_id: i32,
    ) -> Result<i64, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        let count = Song::find()
            .filter(song::Column::CategoryId.eq(category_id)) // Filtre par category_id
            .count(&db.connection)
            .await?;

       Ok(count.try_into().unwrap())

    }

    // Nombre de chansons pour un auteur spécifique
    async fn song_count_by_author(
        &self,
        ctx: &Context<'_>,
        author_id: i32,
    ) -> Result<i64, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        let count = Song::find()
            .filter(song::Column::AuthorId.eq(author_id)) // Filtre par author_id
            .count(&db.connection)
            .await?;

       Ok(count.try_into().unwrap())

    }
}

#[derive(Default)]
pub struct SongMutation;

#[Object]
impl SongMutation {

    async fn create_song(
        &self,
        ctx: &Context<'_>,
        title: String,
        reference: String,
        category_id: i32,
        author_id: i32,
    ) -> Result<SongDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if title.trim().is_empty() {
            return Err(Error::msg("Le titre de la chanson ne peut pas être vide."));
        }
        if reference.trim().is_empty() {
            return Err(Error::msg("La référence de la chanson ne peut pas être vide."));
        }

        let new_song = song::ActiveModel {
            id: ActiveValue::NotSet,
            title: ActiveValue::Set(title.clone()),
            reference: ActiveValue::Set(reference.clone()),
            category_id: ActiveValue::Set(category_id),
            author_id: ActiveValue::Set(author_id),
        };

        let inserted_song = new_song.insert(&db.connection).await?;
        let related_author = inserted_song.find_related(author::Entity).one(&db.connection).await?;
        let related_category = inserted_song.find_related(category::Entity).one(&db.connection).await?;

        Ok(SongDTO {
            id: inserted_song.id,
            title: inserted_song.title,
            reference: inserted_song.reference,
            author: related_author.map(|a| AuthorDTO { id: a.id, name: a.name }),
            category: related_category.map(|c| CategoryDTO { id: c.id, name: c.name, types: None, type_id: 0 }),
            verses: vec![],
        })
    }

    // Mettre à jour une chanson par ID
    async fn update_song_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32,
        title: String,
        reference: String,
        category_id: i32,
        author_id: i32,
    ) -> Result<SongDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if title.trim().is_empty() {
            return Err(Error::msg("Le titre de la chanson ne peut pas être vide."));
        }
        if reference.trim().is_empty() {
            return Err(Error::msg("La référence de la chanson ne peut pas être vide."));
        }

        let song: song::ActiveModel = Song::find_by_id(id)
            .one(&db.connection)
            .await?
            .ok_or(DbErr::Custom("Chanson non trouvée".to_owned()))
            .map(Into::into)?;

        let mut updated_song: song::ActiveModel = song;
        updated_song.title = Set(title.clone());
        updated_song.reference = Set(reference.clone());
        updated_song.category_id = Set(category_id);
        updated_song.author_id = Set(author_id);

        // Mettre à jour dans la base de données
        let updated_song = updated_song.update(&db.connection).await?;

        // Récupérer les relations
        let related_author = updated_song.find_related(author::Entity).one(&db.connection).await?;
        let related_category = updated_song.find_related(category::Entity).one(&db.connection).await?;

        Ok(SongDTO {
            id: updated_song.id,
            title: updated_song.title,
            reference: updated_song.reference,
            author: related_author.map(|a| AuthorDTO { id: a.id, name: a.name }),
            category: related_category.map(|c| CategoryDTO { id: c.id, name: c.name, types:None, type_id: 0 }),
            verses: vec![],
        })
    }
}