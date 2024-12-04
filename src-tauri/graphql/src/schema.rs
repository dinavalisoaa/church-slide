use std::collections::HashMap;

use anyhow::Error;
use async_graphql::{Enum, MergedObject, MergedSubscription,Schema};

use mixer::QueryRoot;
use mixer::MutationRoot;

pub mod mixer;
pub mod book;

#[derive(MergedObject, Default)]
pub struct Query(
    QueryRoot,
);

#[derive(MergedObject, Default)]
pub struct Mutation(
    MutationRoot
);

#[derive(MergedSubscription, Default)]
pub struct Subscription(
);

pub type SlideSchema = Schema<Query, Mutation, Subscription>;
