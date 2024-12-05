use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

use crate::types;
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "category")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: i32,
    pub name: String,  
    pub type_id: i32,
    #[sea_orm(ignore)]
    pub types: Option<types::Model>
   }


#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(belongs_to = "super::types::Entity", from = "Column::TypeId", to = "super::types::Column::Id")]
    Types
}
   
   impl Related<super::types::Entity> for Entity {
       fn to() -> RelationDef {
           Relation::Types.def()
       }
   }

impl ActiveModelBehavior for ActiveModel {}
