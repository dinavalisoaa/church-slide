use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
        .create_table(
            Table::create()
                .table(Types::Table)
                .if_not_exists()
                .col(pk_auto(Types::Id))  
                .col(string(Types::Name))
                .to_owned(),
        )
        .await;
      

      
        manager
        .create_table(
            Table::create()
                .table(Author::Table)
                .if_not_exists()
                .col(pk_auto(Author::Id))  
                .col(string(Author::Name))
                .to_owned(),
        )
        .await;

         manager
        .create_table(
            Table::create()
                .table(Category::Table)
                .if_not_exists()
                .col(pk_auto(Category::Id))  
                .col(string(Category::Name))
                .to_owned(),
        )
        .await;
            // Create Song table
            manager
            .create_table(
                Table::create()
                    .table(Song::Table)
                    .if_not_exists()
                    .col(pk_auto(Song::Id))  
                    .col(string(Song::Title))
                    .col(integer(Song::CategoryId))
                    .foreign_key(
                        ForeignKeyCreateStatement::new()
                            .name("song_category_id_fk_id")
                            .from_tbl(Song::Table)
                            .from_col(Song::CategoryId)
                            .to_tbl(Category::Table)
                            .to_col(Category::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )  
                    .col(integer(Song::AuthorId))
                    .foreign_key(
                        ForeignKeyCreateStatement::new()
                            .name("song_author_id_fk_id")
                            .from_tbl(Song::Table)
                            .from_col(Song::AuthorId)
                            .to_tbl(Author::Table)
                            .to_col(Author::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    ) 
                    .col(string(Song::Verses))
                    .to_owned(),
            )    .await;
        
            // Create Song table
            manager
            .create_table(
                Table::create()
                    .table(Verses::Table)
                    .if_not_exists()
                    .col(pk_auto(Verses::Id))  
                    .col(string(Verses::Number))
                    .col(boolean(Verses::Returns))
                    .col(integer(Verses::SongId))
                    .foreign_key(
                        ForeignKeyCreateStatement::new()
                            .name("verses_song_id_fk_id")
                            .from_tbl(Verses::Table)
                            .from_col(Verses::SongId)
                            .to_tbl(Song::Table)
                            .to_col(Song::Id)
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
enum Category {
    Table,
    Id,
    Name
}

#[derive(Iden)]
enum Types {
    Table,
    Id,
    Name
}

#[derive(Iden)]
enum Author {
    Table,
    Id,
    Name
}


#[derive(Iden)]
enum Song {
    Table,
    Id, 
    Title,
    CategoryId,
    AuthorId,
    Number,
    Verses
}


#[derive(Iden)]
enum Verses {
    Table,
    Id,
    SongId,  
    Text,
    Number,
    Returns
}
