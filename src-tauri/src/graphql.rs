use async_graphql::{Context, EmptyMutation, Object, Schema, EmptySubscription,SimpleObject, Subscription};
use async_graphql_tide::graphql;
use tide::Server;

#[derive(SimpleObject)]
struct Book {
    id: i32,
    title: String,
    author: String,
}

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn books(&self) -> Vec<Book> {
        vec![
            Book {
                id: 1,
                title: "1984".to_string(),
                author: "George Orwell".to_string(),
            },
            Book {
                id: 2,
                title: "Brave New World".to_string(),
                author: "Aldous Huxley".to_string(),
            },
        ]
    }
}

pub async fn create_graphql_server() -> tide::Result<()> {
    let schema = Schema::build(QueryRoot, EmptyMutation,EmptySubscription)
        .finish();

    let mut app = Server::new();
    app.at("/graphql").post(async_graphql_tide::graphql(schema));
    println!("GraphQL server running on http://localhost:8080/graphql");
    app.listen("127.0.0.1:8080").await?;
    Ok(())
}
