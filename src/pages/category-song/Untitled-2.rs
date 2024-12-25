use async_graphql::{Context, Object, Schema, SimpleObject, Subscription, ID};
use async_graphql_tide::graphql;
use futures::{Stream, stream};
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tide::Server;
use async_std::channel::{self, Sender, Receiver};

// Structure de données pour le livre
#[derive(SimpleObject, Clone)]
struct Book {
    id: ID,
    title: String,
    author: String,
}

// Structure pour stocker l'état global
struct AppState {
    books: Vec<Book>,
    book_channel: (Sender<Book>, Receiver<Book>),
}

// Query Root
pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn books(&self, ctx: &Context<'_>) -> Vec<Book> {
        let state = ctx.data::<Arc<Mutex<AppState>>>().unwrap();
        let state = state.lock().unwrap();
        state.books.clone()
    }
}

// Mutation Root
pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn add_book(&self, ctx: &Context<'_>, title: String, author: String) -> Book {
        let state = ctx.data::<Arc<Mutex<AppState>>>().unwrap();
        let mut state = state.lock().unwrap();
        
        let new_book = Book {
            id: ID::from(state.books.len() + 1),
            title,
            author,
        };
        
        // Ajouter le livre à la liste
        state.books.push(new_book.clone());
        
        // Envoyer une notification via le channel
        let _ = state.book_channel.0.send(new_book.clone()).await;
        
        new_book
    }
}

// Subscription Root
pub struct SubscriptionRoot;

#[Subscription]
impl SubscriptionRoot {
    async fn new_books(&self, ctx: &Context<'_>) -> impl Stream<Item = Book> {
        let state = ctx.data::<Arc<Mutex<AppState>>>().unwrap();
        let receiver = state.lock().unwrap().book_channel.1.clone();
        
        stream! {
            loop {
                if let Ok(book) = receiver.recv().await {
                    yield book;
                }
            }
        }
    }
}

pub async fn create_graphql_server() -> tide::Result<()> {
    // Initialiser l'état
    let (sender, receiver) = channel::bounded(100);
    let state = Arc::new(Mutex::new(AppState {
        books: vec![
            Book {
                id: "1".into(),
                title: "1984".to_string(),
                author: "George Orwell".to_string(),
            },
        ],
        book_channel: (sender, receiver),
    }));

    // Créer le schéma
    let schema = Schema::build(QueryRoot, MutationRoot, SubscriptionRoot)
        .data(state)
        .finish();

    let mut app = Server::new();
    app.at("/graphql").post(graphql(schema));
    
    println!("GraphQL server running on http://localhost:8080/graphql");
    app.listen("127.0.0.1:8080").await?;
    Ok(())
}