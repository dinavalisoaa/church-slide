use std::collections::HashMap;

use anyhow::Error;
use async_graphql::{Enum, MergedObject, MergedSubscription,Schema};

use crate::schemas::category_ql::*;
// use schemas::CategoryMutation;

pub mod schemas;
pub mod book;

#[derive(MergedObject, Default)]
pub struct Query(
    CategoryQuery,
);

#[derive(MergedObject, Default)]
pub struct Mutation(
    CategoryMutation
);

#[derive(MergedSubscription, Default)]
pub struct Subscription(
);

pub type SlideSchema = Schema<Query, Mutation, Subscription>;
