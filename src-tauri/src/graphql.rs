use async_graphql::{Context, EmptyMutation, Object,MergedObject,MergedSubscription, Schema, EmptySubscription,SimpleObject, Subscription};
// use async_graphql::{Object, MergedObject, MergedSubscription, Schema, SimpleObject};
use async_graphql_tide::graphql;
use tide::Server;
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
    app.at("/graphql").post(graphql(schema));
    println!("GraphQL server running on http://localhost:8080/graphql");
    app.listen("127.0.0.1:8080").await?;
    Ok(())
}
