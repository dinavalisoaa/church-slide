use async_graphql::{Context, Object, Result, SimpleObject};
// use sea_orm::{EntityTrait, DatabaseConnection};
// use repository::DbConnection;
use repository::DbConnection;

use entity::{category, category::Entity as Category};
use entity::{types, types::Entity as Types};
use serde::{Deserialize, Serialize};
use sea_orm::EntityTrait;
use anyhow::Error;

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct TypeDTO {
    pub id: i32,
    pub name: String,
}

#[derive(Default)]
pub struct QueryRoot;

#[derive(Debug, Serialize, Deserialize, SimpleObject)]
pub struct CategoryDTO {
    pub id: i32,
    pub name: String,
    pub typeInfo: Option<TypeDTO>
}
#[Object]
impl QueryRoot {
    async fn categories(&self, ctx: &Context<'_>) -> Result<Vec<CategoryDTO>, sea_orm::DbErr> {
        let db = ctx.data::<DbConnection>().unwrap();
        // let results = Category::find().all(&db.connection).await?;
        // let categories: Vec<CategoryDTO> = results.into_iter().map(|category| {
        //     CategoryDTO {
        //         id: category.id,
        //         name: category.name
        //     }
        // }).collect();
        // Ok(categories)
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
                    name: t.name,
                }),
            }
        }).collect();
    
        Ok(categories)
    }
    
}

#[derive(Default)]
pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn set_volume(&self, ctx: &Context<'_>, volume: i32) -> Result<bool> {
        println!("Volume: {}", volume);
        Ok(true)
    }

    async fn set_mute(&self, ctx: &Context<'_>, mute: bool) -> Result<bool> {
        println!("Mute: {}", mute);
        Ok(true)
    }
}
