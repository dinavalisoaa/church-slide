use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Ajoute la colonne 'published_at' à la table 'posts'
        manager
            .alter_table(
                Table::alter()
                    .table(Post::Table)
                    .add_column(
                        ColumnDef::new(Post::PublishedAt)
                        .date_time()
                        .not_null(), // Permet que les valeurs existantes soient NULL
                    )
                    
                    .to_owned(),
            )
            .await;
        manager
        .alter_table(
            Table::alter()
                .table(Comment::Table)
                .add_column(
                    ColumnDef::new(Comment::CreatedAt)
                    .date_time()
                    .not_null(), // Permet que les valeurs existantes soient NULL
                )
                
                .to_owned(),
        )
        .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Supprime la colonne 'published_at' lors du rollback
        manager
            .alter_table(
                Table::alter()
                    .table(Post::Table)
                    .drop_column(Post::PublishedAt)
                    .to_owned(),
            )
            .await
    }
}

#[derive(DeriveIden)]
enum Post {
    Table,
    Id,
    Title,
    Text,
    Verification,
    Amount,
    PublishedAt, // Ajout de la nouvelle colonne PublishedAt
}

#[derive(DeriveIden)]

enum Comment {
    Table,
    Id,
    CreatedAt, // Ajout de la nouvelle colonne PublishedAt
}