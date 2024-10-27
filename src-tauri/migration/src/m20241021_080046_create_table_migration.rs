use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
        .create_table(
            Table::create()
                .table(Post::Table)
                .if_not_exists()
                .col(pk_auto(Post::Id))  
                .col(string(Post::Title))
                .col(string(Post::Text)) 
                .col(float(Post::Amount).default(0.0))
                .col(float(Post::Verification).default(0.0))
                .to_owned(),
        )
        .await;
         // Créer la table 'Comment'
         manager
         .create_table(
             Table::create()
                 .table(Comment::Table)
                 .if_not_exists()
                 .col(pk_auto(Comment::Id))  
                 .col(string(Comment::Content))
                 .col(integer(Comment::PostId))
                 .foreign_key(
                     ForeignKeyCreateStatement::new()
                         .name("comment_post_fk_id")
                         .from_tbl(Comment::Table)
                         .from_col(Comment::PostId)
                         .to_tbl(Post::Table)
                         .to_col(Post::Id)
                         .on_delete(ForeignKeyAction::Cascade),
                 ) 
                 .to_owned(),
         )
         .await
       
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Supprimer la table 'Post'
        manager
            .drop_table(Table::drop().table(Post::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
enum Post {
    Table,
    Id,
    Title,
    Amount,
    Text,
    Verification
}

#[derive(Iden)]
enum Comment {
    Table,
    Id,
    PostId,  
    Content,
    CreatedAt
}
