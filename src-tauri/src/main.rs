#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use ::entity::{types, types::Entity as Types};
use ::entity::{category, category::Entity as Category};
use entity::post;
use migration::sea_orm::EntityTrait;
use migration::{Migrator, MigratorTrait};
use serde::{Deserialize, Serialize};
use sea_orm::{Database, DatabaseConnection};
use std::env;
use std::fs;

#[tokio::main]
async fn main() {
    tauri::async_runtime::spawn(async {
        graphql::create_graphql_server().await.unwrap();
    });

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}