use async_graphql::{Context, EmptyMutation, Object,MergedObject,MergedSubscription, Schema, EmptySubscription,SimpleObject, Subscription};
// use async_graphql::{Object, MergedObject, MergedSubscription, Schema, SimpleObject};
use async_graphql_tide::graphql;
use tide::Server;
use tide::security::{CorsMiddleware, Origin};
use ::slide_graphql::SlideSchema;
use ::slide_graphql::{
        Mutation, Query, Subscription
};
use repository::DbConnection;

pub async fn create_graphql_server() -> tide::Result<()> {

    let db = DbConnection::new().await;
    let schema = SlideSchema::build(
        Query::default(),
        Mutation::default(),
        Subscription::default(),
    ).data(db)
    .finish();

    let mut app = Server::new();
    // app.at("/graphql").post(graphql(schema));
    // println!("GraphQL server running on http://localhost:8080/graphql");
    // app.listen("127.0.0.1:8080").await?;
    // Ok(())
    let cors = CorsMiddleware::new()
    .allow_methods("GET, POST, OPTIONS".parse::<tide::http::headers::HeaderValue>().unwrap())
    .allow_origin(Origin::from("*")) // Autoriser toutes les origines (ou spécifiez "http://localhost:5173")
    .allow_headers("*".parse::<tide::http::headers::HeaderValue>().unwrap());

app.with(cors); // Ajoute le middleware à l'application

app.at("/graphql").post(graphql(schema));
println!("GraphQL server running on http://localhost:8080/graphql");
app.listen("127.0.0.1:8080").await?;
Ok(())
}
