use std::collections::HashMap;

use anyhow::Error;
use async_graphql::{Enum, MergedObject, MergedSubscription,Schema};
use crate::schemas::author_ql::*;
use crate::schemas::category_ql::*;
use crate::schemas::song_ql::{SongMutation, SongQuery};
use crate::schemas::types_ql::*;
use crate::schemas::verses_ql::{VerseMutation, VerseQuery};
// use schemas::CategoryMutation;

pub mod schemas;
pub mod book;

#[derive(MergedObject, Default)]
pub struct Query(
    CategoryQuery,
    TypesQuery,
    SongQuery,
    VerseQuery,
    AuthorQuery
);

#[derive(MergedObject, Default)]
pub struct Mutation(
    CategoryMutation,
    TypesMutation,
    SongMutation,
    VerseMutation,
    AuthorMutation
);

#[derive(MergedSubscription, Default)]
pub struct Subscription(
);

pub type SlideSchema = Schema<Query, Mutation, Subscription>;
