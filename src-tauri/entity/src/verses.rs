use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "verses")]
pub struct Verses {
    #[sea_orm(primary_key, auto_increment = true)]
    pub id: i32,
    pub song_id: i32,
    #[sea_orm(column_type = "Text", nullable)]
    pub reference: Option<String>,
    #[sea_orm(column_type = "Text", not_null)]
    pub lyrics: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum VersesRelation {
    #[sea_orm(belongs_to = "super::song::Entity", from = "Column::SongId", to = "super::song::Column::Id")]
    Song,
}

impl Related<super::song::Entity> for Verses {
    fn to() -> RelationDef {
        VersesRelation::Song.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}