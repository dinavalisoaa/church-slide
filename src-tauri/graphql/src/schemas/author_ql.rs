use async_graphql::{Context, Object, Result, SimpleObject};
// use sea_orm::{EntityTrait, DatabaseConnection};
// use repository::DbConnection;
use repository::DbConnection;
use sea_orm::{
    ActiveModelTrait, ActiveValue, ColumnTrait, EntityTrait, JoinType, ModelTrait, QueryFilter,
    QueryOrder, QuerySelect, RelationTrait,
};
use entity::{author, author::Entity as Author};
use serde::{Deserialize, Serialize};
use anyhow::Error;
use sea_orm::DbErr;

#[derive(Default)]
pub struct AuthorQuery;

#[derive(Default)]
pub struct AuthorMutation;

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct AuthorDTO {
    pub id: i32,
    pub name: String
}

#[Object]
impl AuthorQuery {

    async fn find_author_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32, 
    ) -> Result<Option<AuthorDTO>, Error> {
        let db = ctx.data::<DbConnection>().unwrap();
    
        if let Some(author) = Author::find_by_id(id).one(&db.connection).await? {
            let author_dto = AuthorDTO {
                id: author.id,
                name: author.name,
            };
    
            Ok(Some(author_dto))
        } else {
            Ok(None)
        }
    }
    
    async fn all_authors(
        &self, 
        ctx: &Context<'_>, 
        filter: Option<String>, 
        offset: Option<i32>,
        limit: Option<i32>
    ) -> Result<Vec<AuthorDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = Author::find()
            .order_by_asc(author::Column::Name);

        if let Some(offset_val) = offset {
            query = query.offset(offset_val as u64);
        }
        if let Some(limit_val) = limit {
            query = query.limit(limit_val as u64);
        }
        if let Some(filter_str) = filter {
            if !filter_str.is_empty() {
                query = query.filter(author::Column::Name.like(format!("%{}%", filter_str).as_str()));
            }
        }

        let results = query
            .all(&db.connection)
            .await?;

        let categories: Vec<AuthorDTO> = results
            .into_iter()
            .map(|author| {
                AuthorDTO {
                    id: author.id,
                    name: author.name,
                }
            })
            .collect();

        Ok(categories)
    }
}

#[Object]
impl AuthorMutation {
    async fn create_author(
        &self,
        ctx: &Context<'_>,
        name: String,
    ) -> Result<AuthorDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if name.trim().is_empty() {
            return Err(Error::msg("Le nom de l'auteur ne peut pas être vide."));
        }

        let new_author = author::ActiveModel {
            id: ActiveValue::NotSet,
            name: ActiveValue::Set(name.clone())
        };

        // Exécution de l'insertion
        match new_author.insert(&db.connection).await {
            Ok(inserted_author) => {
                Ok(AuthorDTO {
                    id: inserted_author.id,
                    name: inserted_author.name,
                })
            }
            Err(err) => {return Err(Error::msg("Le nom de l'auteur ne peut pas être vide."));
                Err(Error::msg(format!(
                    "Erreur lors de la création de l'auteur : {}",
                    err)))
            }
        }
    }
   
    async fn update_author_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32,
       name :  String,
    ) -> Result<AuthorDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();
        let author: author::ActiveModel = Author::find_by_id(id)
            .one(&db.connection)
            .await?
            .ok_or(DbErr::Custom("Cannot find author.".to_owned()))
            .map(Into::into)?;

       let new=author::ActiveModel {
            id: sea_orm::Set(id.to_owned()),
            name: sea_orm::Set(name.to_owned())
        }
        .update(&db.connection)
        .await;

        match new {
            Ok(inserted_author) => {
                Ok(AuthorDTO {
                    id: inserted_author.id,
                    name: inserted_author.name,
                })
            }
            Err(err) => {return Err(Error::msg("Le nom de l'auteur ne peut pas être vide."));
                Err(Error::msg(format!(
                    "Erreur lors de la création de l'auteur : {}",
                    err)))
            }
        }
    }
  
    
}

/* 
#[Object]
impl QueryRoot {
    async fn categories(
        &self, 
        ctx: &Context<'_>, 
        filter: Option<String>, 
        offset: Option<i32>,
        limit: Option<i32>
    ) -> Result<Vec<AuthorDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = match offset {
            Some(offset) => Author::find().order_by_asc(author::Column::Name).offset(offset as u64),
            None => Author::find().order_by_asc(author::Column::Name),
        };

        query = match limit {
            Some(limit) => query.limit(limit as u64),
            None => query,
        };

        match filter {
            Some(filter_str) => {
                let results = query
                    .filter(author::Column::Name.like(format!("%{}%", filter_str).as_str())) 
                    .all(&db.connection)
                    .await?;

                Ok(results.into_iter().map(|author| {
                    AuthorDTO {
                        id: author.id,
                        name: author.name,
                        author: None, // Pas de author associés ici
                    }
                }).collect())
            }
            None => {
                let results = query.all(&db.connection).await?;
                Ok(results.into_iter().map(|author| {
                    AuthorDTO {
                        id: author.id,
                        name: author.name,
                        author: None, // Pas de author associés ici
                    }
                }).collect())
            }
        }
    }
}
*/
/* 
impl QueryRoot {
    async fn categories(&self, 
    ctx: &Context<'_>, 
    filter: Option<String>,
    offset: Option<i32>,
    limit: Option<i32>) -> Result<Vec<AuthorDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();
        // let results = Author::find().all(&db.connection).await?;
        // let categories: Vec<AuthorDTO> = results.into_iter().map(|author| {
        //     AuthorDTO {
        //         id: author.id,
        //         name: author.name
        //     }
        // }).collect();
        // Ok(categories)
        println!(">{}<",id);
        let results = Author::find()
        .find_with_related(author::Entity) // Charge la relation avec "Type"
        .all(&db.connection)
        .await?;

        let categories: Vec<AuthorDTO> = results.into_iter().map(|(author, author)| {
            AuthorDTO {
                id: author.id,
                name: author.name,
                author: author.into_iter().next().map(|t| TypeDTO { 
                    id: t.id,
                    name: t.name
                }),
            }
        }).collect();
    
        Ok(categories)
    }
    
}
*/
