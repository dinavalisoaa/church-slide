use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "author")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: i32,
    pub name: String,  // Foreign key to the Post model
   }

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
 
}

impl ActiveModelBehavior for ActiveModel {}
