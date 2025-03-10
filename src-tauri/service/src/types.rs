use ::entity::{types, types::Entity as Types};
use repository::TypesRepository;
use sea_orm::*;
pub struct TypesService;

impl TypesService {
    pub async fn save(db: &DbConn, form_data: types::Model) -> Result<types::ActiveModel, DbErr> {
        types::ActiveModel {
            name: Set(form_data.name.to_owned()),
            ..Default::default()
        }
        .save(db)
        .await
    }
    pub async fn find_all(db: &DbConn) -> Result<Vec<types::Model>, DbErr> {
        TypesRepository::find_all(db).await
    }

    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Option<types::Model>, DbErr> {
        TypesRepository::find_by_id(db, id).await
    }

    pub async fn update_by_id(
        db: &DbConn,
        id: i32,
        form_data: types::Model,
    ) -> Result<types::Model, DbErr> {
        let types: types::ActiveModel = Types::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find types.".to_owned()))
            .map(Into::into)?;

        types::ActiveModel {
            id: types.id,
            name: Set(form_data.name.to_owned())
        }
        .update(db)
        .await
    }

    pub async fn delete_by_id(db: &DbConn, id: i32) -> Result<DeleteResult, DbErr> {
        TypesRepository::delete(db, id).await
    }
}
