use ::entity::{category, category::Entity as Category};
use repository::{
    CategoryRepository,
};
use sea_orm::*;
pub struct CategoryService;

impl CategoryService {
    pub async fn save(db: &DbConn, form_data: category::Model) -> Result<category::ActiveModel, DbErr> {
        category::ActiveModel {
            name: Set(form_data.name.to_owned()),
            type_id: Set(form_data.type_id.to_owned()),
            ..Default::default()
        }
        .save(db)
        .await
    }
    pub async fn find_all(db: &DbConn) -> Result<Vec<category::Model>, DbErr> {
        CategoryRepository::find_all(db).await
    }

    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Option<category::Model>, DbErr> {
        CategoryRepository::find_by_id(db, id).await
    }

    pub async fn update_by_id(
        db: &DbConn,
        id: i32,
        form_data: category::Model,
    ) -> Result<category::Model, DbErr> {
        let category: category::ActiveModel = Category::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::Custom("Cannot find category.".to_owned()))
            .map(Into::into)?;

        category::ActiveModel {
            id: category.id,
            name: Set(form_data.name.to_owned()),
            type_id: Set(form_data.type_id.to_owned())
        }
        .update(db)
        .await
    }

    pub async fn delete_by_id(db: &DbConn, id: i32) -> Result<DeleteResult, DbErr> {
        CategoryRepository::delete(db, id).await
    }
}
