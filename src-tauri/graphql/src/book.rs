use async_graphql::SimpleObject;

#[derive(SimpleObject)]
pub struct Book {
  pub  id: i32,
  pub title: String,
  pub author: String,
}