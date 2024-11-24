// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use ::entity::{types, types::Entity as Types};
use entity::post;
use migration::sea_orm::EntityTrait;
use migration::{Migrator, MigratorTrait};
use serde::{Deserialize, Serialize};
use service::sea_orm::{Database, DatabaseConnection};
use service::TypesService;
use std::env;
use std::fs;
#[tokio::main]
async fn main() {
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
    // let db_url = "sqlite://db.sqlite";
    let conn = Database::connect(db_url)
        .await
        .expect("Database connection failed");
    Migrator::up(&conn, None).await.unwrap();

    // let posts = QueryCore::find_all(&conn)
    //     .await
    //     .expect("Cannot find posts in page");
    // println!("{}<<<<<<<",posts[0].text)
    // let form=post::Model {
    //     id: 1,
    //     title: "New Title A".to_owned(),
    //     text: "New Text A".to_owned(),
    // };

    // MutationCore::create_post(&conn, form)
    //     .await
    //     .expect("could not insert post");

    let state = AppState { conn };

    tauri::Builder::default()
        // .filter_level(log::LevelFilter::Info)
        // .filter_module("sqlx:query",log::LevelFilter::Off)
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            save_types,
            retrieve_types,
            retrieve_type_by_id 
            ])

        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn save_types(
    state: tauri::State<'_, AppState>,
    form: types::Model,
) -> Result<FlashData, ()> {
    let _ = &state.conn;
    TypesService::save(&state.conn, form)
        .await
        .expect("could not insert save");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "Save succcessfully added".to_owned(),
    };
    Ok(data)
}

#[tauri::command]
async fn retrieve_types(
    state: tauri::State<'_, AppState>,
) -> Result<Vec<types::Model>, ()> {
    let _ = &state.conn;
    let data=TypesService::find_all(&state.conn)
        .await
        .expect("could not insert save");
 
    Ok(data)
}


#[tauri::command]
async fn retrieve_type_by_id(
    state: tauri::State<'_, AppState>,
    id:i32
)-> Result<Option<types::Model>, ()>{
    let _ = &state.conn;
    let data = TypesService::find_by_id(&state.conn,id)
        .await
        .expect("could not insert save");
        Ok(data)
}


/*
#[tauri::command]
async fn create_post(state: tauri::State<'_, AppState>, form: post::Model) -> Result<FlashData, ()> {
    let _ = &state.conn;

    MutationCore::create_post(&state.conn, form)
        .await
        .expect("could not insert post");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "Post succcessfully added".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn update_post(
    state: tauri::State<'_, AppState>,
    id: i32,
    form: post::Model,
) -> Result<FlashData, ()> {

    MutationCore::update_post_by_id(&state.conn, id, form)
        .await
        .expect("could not edit post");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "Post succcessfully updated".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn delete_post(
    state: tauri::State<'_, AppState>,
    id: i32,
) -> Result<FlashData, ()> {
    MutationCore::delete_post(&state.conn, id)
        .await
        .expect("could not delete post");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "Post succcessfully deleted".to_owned(),
    };

    Ok(data)
}

#[tauri::command]
async fn list_posts(
    state: tauri::State<'_, AppState>,
    params: Params,
) -> Result<Vec<post::Model>, ()> {
    let page = params.page.unwrap_or(1);
    let posts_per_page = params.posts_per_page.unwrap_or(5);

    let (posts, num_pages) = QueryCore::find_posts_in_page(&state.conn, page, posts_per_page)
        .await
        .expect("Cannot find posts in page");

    println!("num_pages: {}", num_pages);

    Ok(posts)
}


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
     */

#[derive(Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct FlashData {
    kind: String,
    message: String,
}

#[derive(Deserialize)]
struct Params {
    page: Option<u64>,
    posts_per_page: Option<u64>,
}
