use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "types")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: i32,
    pub name: String,  
   }

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
 
}


impl ActiveModelBehavior for ActiveModel {}
