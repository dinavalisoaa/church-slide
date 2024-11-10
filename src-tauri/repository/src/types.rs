use ::entity::{types, types::Entity as Types};
use sea_orm::*;
pub struct TypesRepository;

impl TypesRepository {
   
    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Option<types::Model>, DbErr> {
        Types::find_by_id(id).one(db).await
    }
    pub async fn find_all(db: &DbConn) -> Result<Vec<types::Model>, DbErr> {
        Types::find().all(db).await
    }

    pub async fn delete(db: &DbConn, id: i32) -> Result<DeleteResult, DbErr> {
        let types: types::ActiveModel = Types::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find types.".to_owned()))
            .map(Into::into)?;

        types.delete(db).await
    }

    pub async fn delete_all(db: &DbConn) -> Result<DeleteResult, DbErr> {
        Types::delete_many().exec(db).await
    }
}