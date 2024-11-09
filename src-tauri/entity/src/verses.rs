use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "verses")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: i32,
    pub text: String,  
    pub number: i32,  
    pub returns  : bool,  
    pub song_id  : i32
   }


   #[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
   pub enum Relation {
       #[sea_orm(belongs_to = "super::song::Entity", from = "Column::category_id", to = "super::song::Column::Id")]
       Song
   }
   
   impl Related<super::song::Entity> for Entity {
       fn to() -> RelationDef {
           Relation::Song.def()
       }
   }
   
   
   impl ActiveModelBehavior for ActiveModel {}
   