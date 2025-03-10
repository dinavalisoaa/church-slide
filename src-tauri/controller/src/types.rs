#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use entity::post;
use service::{
    sea_orm::{Database, DatabaseConnection},
    TypesService 
};
use serde::{Deserialize, Serialize};

use ::entity::{types, types::Entity as Types};

pub struct TypesController;
use tauri::command;

#[tauri::command]
pub async fn save_types(state: tauri::State<'_, AppState>, form: types::Model) -> Result<FlashData, ()> {
    let _ = &state.conn;
    TypesService::save(&state.conn, form)
        .await
        .expect("could not insert post");

    let data = FlashData {
        kind: "success".to_owned(),
        message: "Post succcessfully added".to_owned(),
    };

    Ok(data)
}


#[derive(Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct FlashData {
    kind: String,
    message: String,
}

#[derive(Deserialize)]
pub struct Params {
    page: Option<u64>,
    posts_per_page: Option<u64>,
}