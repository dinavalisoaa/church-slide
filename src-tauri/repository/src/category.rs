use ::entity::{category, category::Entity as Category};
use ::entity::{types, types::Entity as Types};
use sea_orm::*;
pub struct CategoryRepository;
use crate::DbConnection;

impl CategoryRepository {
/* 
    pub async fn findById(db: &DbConnection,id : i32) ->Result<Option<Category>, DbErr>{
        if let Some(category_model) = Category::find_by_id(id).one(&db.connection).await? {
            // Étape 2 : Charger les relations avec "types"
                let related_types = category_model.find_related(types::Entity).all(&db.connection).await?;
        
            // Étape 3 : Transformation en DTO
                let category_dto = category::Model {
                    id: category_model.id,
                    name: category_model.name,
                    type_id:0,
                    types: related_types.into_iter().next().map(|t|  types::Model {
                        id: t.id,
                        name: t.name,
                    }),
                };
        
                Ok(Some(category_dto))
            } else {
                Ok(None)
            }
    }
  */
    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Option<category::Model>, DbErr> {
        Category::find_by_id(id).one(db).await
    }
    pub async fn find_all(db: &DbConn) -> Result<Vec<category::Model>, DbErr> {
//         let results: Vec<(category::Model, Vec<types::Model>)> =
//         category::Entity::find()
//             // .filter(track_entity::Column::Id.eq(id))
//             .find_with_related(types::Entity)
//             .all(db)
//             .await?;
//     if results.len() == 0 {
//         return Err(Error::msg("Track not found"));
//     }
//     // let track = results[0].0.clone();
//     // let album =
//     //     album_entity::Entity::find_by_id(track.album_id.unwrap_or_default().to_string())
//     //         .one(&self.db)
//     //         .await?;
//     Ok(category::Model {
//         artists: results[0].1.clone(),
//         album: album.unwrap(),
//         id: track.id,
//         title: track.title,
//         duration: track.duration,
//         uri: track.uri,
//         types: track.artist,
//         track: track.track,
//         ..Default::default()
//     })
// // }

        Category::find().all(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<DeleteResult, DbErr> {
        let category: category::ActiveModel = Category::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find Category.".to_owned()))
            .map(Into::into)?;

            category.delete(db).await
    }

    pub async fn delete_all(db: &DbConn) -> Result<DeleteResult, DbErr> {
        Category::delete_many().exec(db).await
    }
}