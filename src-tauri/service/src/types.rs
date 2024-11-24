use ::entity::{types, types::Entity as Types};
use sea_orm::*;
use repository::{
    sea_orm::{Database, DatabaseConnection},
   TypesRepository
};
pub struct TypesService;

impl TypesService {

pub async fn save(
    db: &DbConn,
    form_data: types::Model,
) -> Result<types::ActiveModel, DbErr> {
    types::ActiveModel {
        name: Set(form_data.name.to_owned()),
        ..Default::default()
    }
    .save(db)
    .await
}
pub async fn find_all( db: &DbConn)->  
Result <Vec<types::Model>,DbErr> {
    TypesRepository::find_all(db).await
}


pub async fn find_by_id( db: &DbConn,id: i32)-> Result <Option<types::Model>,DbErr> {
    TypesRepository::find_by_id(db,id).await
}
pub async fn update_by_id(
    db: &DbConn,
    id: i32,
    form_data: types::Model,
) -> Result<types::Model, DbErr> {
    let types_ = TypesRepository::find_by_id(db, id).await?;

    let mut active_model = match types_ {
        Some(model) => types::ActiveModel {
            id: Set(model.id), // Set id based on the found model
            name: Set(form_data.name.to_owned()),
            ..Default::default()
        },
        None => return Err(DbErr::Custom("Cannot find type with the specified ID.".to_owned())),
    };

    active_model.update(db).await
}
}