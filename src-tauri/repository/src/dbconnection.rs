
use ::entity::{types as other_types, types::Entity as Types};
use ::entity::{category as other, category::Entity as Category};
use entity::post;
use migration::sea_orm::EntityTrait;
use migration::{Migrator, MigratorTrait};
use serde::{Deserialize, Serialize};
use sea_orm::DatabaseConnection;
use std::env;
use std::fs;
#[derive(Clone)]
pub struct DbConnection {
    pub connection: DatabaseConnection,
}
  
    // let state = AppState { conn };

impl DbConnection {
    pub async fn new() -> DbConnection {
        env::set_var("RUST_LOG", "debug");
        // tracing_subscriber::fmt::init();
        dotenvy::dotenv().ok();
    
        let home_dir = match tauri::api::path::home_dir() {
            Some(val) => val,
            None => panic!("Could not get home directory"),
        };
        // let data_dir = home_dir.join(".church-slide/data");
        // if let Err(_) = fs::metadata(&data_dir) {
        //     fs::create_dir_all(&data_dir).expect("Could not create data directory");
        // }1.8.0
        // let db_url = "sqlite://".to_string() + data_dir.to_str().unwrap() + "/db.sqlite?mode=rwc";
        // let db_url = "sqlite://C://Users//DINA//.church-slide//data//db.sqlite";
        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
        let connection = sea_orm::Database::connect(db_url)
            .await
            .expect("Database connection failed");
        Migrator::up(&connection, None).await.unwrap();
        DbConnection { connection }
    }

    pub fn get_connection(&self) -> &DatabaseConnection {
        &self.connection
    }
/*
    pub async fn create_indexes(&self) {
        let builder = self.connection.get_database_backend();
        let track_title_idx = sea_query::Index::create()
            .table(track_entity::Entity)
            .name("track_title_index")
            .col(track_entity::Column::Title)
            .to_owned();
        let sql = builder.build(&track_title_idx);
        match self.connection.execute(sql).await {
            Ok(_) => {}
            Err(_) => {
                println!("track_title_index already exists, skipping");
            }
        }

        let album_title_idx = sea_query::Index::create()
            .table(album_entity::Entity)
            .name("album_title_index")
            .col(album_entity::Column::Title)
            .to_owned();
        let sql = builder.build(&album_title_idx);
        match self.connection.execute(sql).await {
            Ok(_) => {}
            Err(_) => {
                println!("album_title_index already exists, skipping");
            }
        }

        let artist_name_idx = sea_query::Index::create()
            .table(artist_entity::Entity)
            .name("artist_name_index")
            .col(artist_entity::Column::Name)
            .to_owned();
        let sql = builder.build(&artist_name_idx);
        match self.connection.execute(sql).await {
            Ok(_) => {}
            Err(_) => {
                println!("artist_name_index already exists, skipping");
            }
        }
    }

 */
    }
