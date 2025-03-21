use async_graphql::{Context, Object, Result, SimpleObject};
// use sea_orm::{EntityTrait, DatabaseConnection};
// use repository::DbConnection;
use repository::DbConnection;
use sea_orm::{
    ActiveModelTrait, ActiveValue, ColumnTrait, EntityTrait, JoinType, ModelTrait, QueryFilter,
    QueryOrder, QuerySelect, RelationTrait,
};
use entity::{types, types::Entity as Types};
use serde::{Deserialize, Serialize};
use anyhow::Error;
use sea_orm::DbErr;

#[derive(Default)]
pub struct TypesQuery;

#[derive(Default)]
pub struct TypesMutation;

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct TypesDTO {
    pub id: i32,
    pub name: String
}

#[Object]
impl TypesQuery {

    async fn find_type_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32, 
    ) -> Result<Option<TypesDTO>, Error> {
        let db = ctx.data::<DbConnection>().unwrap();
    
        if let Some(types) = Types::find_by_id(id).one(&db.connection).await? {
            let types_dto = TypesDTO {
                id: types.id,
                name: types.name,
            };
    
            Ok(Some(types_dto))
        } else {
            Ok(None)
        }
    }
    
    async fn all_types(
        &self, 
        ctx: &Context<'_>, 
        filter: Option<String>, 
        offset: Option<i32>,
        limit: Option<i32>
    ) -> Result<Vec<TypesDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = Types::find()
            .order_by_asc(types::Column::Name);

        if let Some(offset_val) = offset {
            query = query.offset(offset_val as u64);
        }
        if let Some(limit_val) = limit {
            query = query.limit(limit_val as u64);
        }
        if let Some(filter_str) = filter {
            if !filter_str.is_empty() {
                query = query.filter(types::Column::Name.like(format!("%{}%", filter_str).as_str()));
            }
        }

        let results = query
            .all(&db.connection)
            .await?;

        let categories: Vec<TypesDTO> = results
            .into_iter()
            .map(|types| {
                TypesDTO {
                    id: types.id,
                    name: types.name,
                }
            })
            .collect();

        Ok(categories)
    }
}

#[Object]
impl TypesMutation {
    async fn create_type(
        &self,
        ctx: &Context<'_>,
        name: String,
    ) -> Result<TypesDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if name.trim().is_empty() {
            return Err(Error::msg("Le nom de la catégorie ne peut pas être vide."));
        }

        let new_types = types::ActiveModel {
            id: ActiveValue::NotSet,
            name: ActiveValue::Set(name.clone())
        };

        // Exécution de l'insertion
        match new_types.insert(&db.connection).await {
            Ok(inserted_types) => {
                Ok(TypesDTO {
                    id: inserted_types.id,
                    name: inserted_types.name,
                })
            }
            Err(err) => {return Err(Error::msg("Le nom de la catégorie ne peut pas être vide."));
                Err(Error::msg(format!(
                    "Erreur lors de la création de la catégorie : {}",
                    err)))
            }
        }
    }
   
    async fn update_type_by_id(
        &self,
        ctx: &Context<'_>,
        id: i32,
       name :  String,
    ) -> Result<TypesDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();
        let types: types::ActiveModel = Types::find_by_id(id)
            .one(&db.connection)
            .await?
            .ok_or(DbErr::Custom("Cannot find types.".to_owned()))
            .map(Into::into)?;

       let new=types::ActiveModel {
            id: sea_orm::Set(id.to_owned()),
            name: sea_orm::Set(name.to_owned())
        }
        .update(&db.connection)
        .await;

        match new {
            Ok(inserted_types) => {
                Ok(TypesDTO {
                    id: inserted_types.id,
                    name: inserted_types.name,
                })
            }
            Err(err) => {return Err(Error::msg("Le nom de la types ne peut pas être vide."));
                Err(Error::msg(format!(
                    "Erreur lors de la création de la catégorie : {}",
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
    ) -> Result<Vec<TypesDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = match offset {
            Some(offset) => Types::find().order_by_asc(types::Column::Name).offset(offset as u64),
            None => Types::find().order_by_asc(types::Column::Name),
        };

        query = match limit {
            Some(limit) => query.limit(limit as u64),
            None => query,
        };

        match filter {
            Some(filter_str) => {
                let results = query
                    .filter(types::Column::Name.like(format!("%{}%", filter_str).as_str())) 
                    .all(&db.connection)
                    .await?;

                Ok(results.into_iter().map(|types| {
                    TypesDTO {
                        id: types.id,
                        name: types.name,
                        types: None, // Pas de types associés ici
                    }
                }).collect())
            }
            None => {
                let results = query.all(&db.connection).await?;
                Ok(results.into_iter().map(|types| {
                    TypesDTO {
                        id: types.id,
                        name: types.name,
                        types: None, // Pas de types associés ici
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
    limit: Option<i32>) -> Result<Vec<TypesDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();
        // let results = Types::find().all(&db.connection).await?;
        // let categories: Vec<TypesDTO> = results.into_iter().map(|types| {
        //     TypesDTO {
        //         id: types.id,
        //         name: types.name
        //     }
        // }).collect();
        // Ok(categories)
        println!(">{}<",id);
        let results = Types::find()
        .find_with_related(types::Entity) // Charge la relation avec "Type"
        .all(&db.connection)
        .await?;

        let categories: Vec<TypesDTO> = results.into_iter().map(|(types, types)| {
            TypesDTO {
                id: types.id,
                name: types.name,
                types: types.into_iter().next().map(|t| TypeDTO { 
                    id: t.id,
                    name: t.name
                }),
            }
        }).collect();
    
        Ok(categories)
    }
    
}
*/
