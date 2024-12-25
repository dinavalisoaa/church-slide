use async_graphql::{Context, Object, Result, SimpleObject};
// use sea_orm::{EntityTrait, DatabaseConnection};
// use repository::DbConnection;
use repository::DbConnection;
use sea_orm::{
    ActiveModelTrait, ActiveValue, ColumnTrait, EntityTrait, JoinType, ModelTrait, QueryFilter,
    QueryOrder, QuerySelect, RelationTrait,
};
use entity::{category, category::Entity as Category};
use entity::{types, types::Entity as Types};
use serde::{Deserialize, Serialize};
use anyhow::Error;
use sea_orm::DbErr;
#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct TypeDTO {
    pub id: i32,
    pub name: String,
}

#[derive(Default)]
pub struct CategoryQuery;

#[derive(Default)]
pub struct CategoryMutation;

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct CategoryDTO {
    pub id: i32,
    pub name: String,
    pub typeInfo: Option<TypeDTO>
}

#[Object]
impl CategoryQuery {

    async fn findById(
        &self,
        ctx: &Context<'_>,
        id: i32, 
    ) -> Result<Option<CategoryDTO>, Error> {
        let db = ctx.data::<DbConnection>().unwrap();
    
        if let Some(category) = Category::find_by_id(id).one(&db.connection).await? {
            let related_types = category.find_related(types::Entity).all(&db.connection).await?;
    
            let category_dto = CategoryDTO {
                id: category.id,
                name: category.name,
                typeInfo: related_types.into_iter().next().map(|t| TypeDTO {
                    id: t.id,
                    name: t.name,
                }),
            };
    
            Ok(Some(category_dto))
        } else {
            Ok(None)
        }
    }
    
    async fn categories(
        &self, 
        ctx: &Context<'_>, 
        filter: Option<String>, 
        offset: Option<i32>,
        limit: Option<i32>
    ) -> Result<Vec<CategoryDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = Category::find()
            .order_by_asc(category::Column::Name);

        if let Some(offset_val) = offset {
            query = query.offset(offset_val as u64);
        }
        if let Some(limit_val) = limit {
            query = query.limit(limit_val as u64);
        }
        if let Some(filter_str) = filter {
            if !filter_str.is_empty() {
                query = query.filter(category::Column::Name.like(format!("%{}%", filter_str).as_str()));
            }
        }

        let results = query
            .find_with_related(types::Entity) 
            .all(&db.connection)
            .await?;

        let categories: Vec<CategoryDTO> = results
            .into_iter()
            .map(|(category, types)| {
                CategoryDTO {
                    id: category.id,
                    name: category.name,
                    typeInfo: types.into_iter().next().map(|t| TypeDTO {
                        id: t.id,
                        name: t.name,
                    }),
                }
            })
            .collect();

        Ok(categories)
    }
}

#[Object]
impl CategoryMutation {
    async fn createcategory(
        &self,
        ctx: &Context<'_>,
        name: String,
        type_id: i32, 
    ) -> Result<CategoryDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();

        if name.trim().is_empty() {
            return Err(Error::msg("Le nom de la catégorie ne peut pas être vide."));
        }

        let new_category = category::ActiveModel {
            id: ActiveValue::NotSet,
            name: ActiveValue::Set(name.clone()),
            type_id: ActiveValue::Set(type_id),
        };

        // Exécution de l'insertion
        match new_category.insert(&db.connection).await {
            Ok(inserted_category) => {
                Ok(CategoryDTO {
                    id: inserted_category.id,
                    name: inserted_category.name,
                    typeInfo: None, 
                })
            }
            Err(err) => {return Err(Error::msg("Le nom de la catégorie ne peut pas être vide."));
                Err(Error::msg(format!(
                    "Erreur lors de la création de la catégorie : {}",
                    err)))
            }
        }
    }
   
    async fn updateById(
        &self,
        ctx: &Context<'_>,
        id: i32,
       name :  String,
       type_id :  i32,
    ) -> Result<CategoryDTO, Error> {
        let db = ctx.data::<DbConnection>().unwrap();
        let category: category::ActiveModel = Category::find_by_id(id)
            .one(&db.connection)
            .await?
            .ok_or(DbErr::Custom("Cannot find category.".to_owned()))
            .map(Into::into)?;

       let new=category::ActiveModel {
            id: category.id,
            name: sea_orm::Set(name.to_owned()),
            type_id: sea_orm::Set(type_id.to_owned())
        }
        .update(&db.connection)
        .await;

        match new {
            Ok(inserted_category) => {
                Ok(CategoryDTO {
                    id: inserted_category.id,
                    name: inserted_category.name,
                    typeInfo: None, 
                })
            }
            Err(err) => {return Err(Error::msg("Le nom de la catégorie ne peut pas être vide."));
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
    ) -> Result<Vec<CategoryDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();

        let mut query = match offset {
            Some(offset) => Category::find().order_by_asc(category::Column::Name).offset(offset as u64),
            None => Category::find().order_by_asc(category::Column::Name),
        };

        query = match limit {
            Some(limit) => query.limit(limit as u64),
            None => query,
        };

        match filter {
            Some(filter_str) => {
                let results = query
                    .filter(category::Column::Name.like(format!("%{}%", filter_str).as_str())) 
                    .all(&db.connection)
                    .await?;

                Ok(results.into_iter().map(|category| {
                    CategoryDTO {
                        id: category.id,
                        name: category.name,
                        typeInfo: None, // Pas de types associés ici
                    }
                }).collect())
            }
            None => {
                let results = query.all(&db.connection).await?;
                Ok(results.into_iter().map(|category| {
                    CategoryDTO {
                        id: category.id,
                        name: category.name,
                        typeInfo: None, // Pas de types associés ici
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
    limit: Option<i32>) -> Result<Vec<CategoryDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();
        // let results = Category::find().all(&db.connection).await?;
        // let categories: Vec<CategoryDTO> = results.into_iter().map(|category| {
        //     CategoryDTO {
        //         id: category.id,
        //         name: category.name
        //     }
        // }).collect();
        // Ok(categories)
        println!(">{}<",id);
        let results = Category::find()
        .find_with_related(types::Entity) // Charge la relation avec "Type"
        .all(&db.connection)
        .await?;

        let categories: Vec<CategoryDTO> = results.into_iter().map(|(category, types)| {
            CategoryDTO {
                id: category.id,
                name: category.name,
                typeInfo: types.into_iter().next().map(|t| TypeDTO { 
                    id: t.id,
                    name: t.name
                }),
            }
        }).collect();
    
        Ok(categories)
    }
    
}
*/
