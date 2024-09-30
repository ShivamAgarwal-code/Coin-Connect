library;

use std::storage::storage_vec::StorageVec;
// use storage_string::*;
// use string::String;

pub struct TokenMetaData {
    // This is left as an example. Support for dynamic length string is needed here
    token_uri: str[81],
    // name: str[10],
    // symbol: str[5],
}

// pub struct Profile {
//     // This is left as an example. Support for dynamic length string is needed here
//     token_uri: str[81],
//     // user_name: str[10],
//     // token_uri: StorageString,
//     handle: StorageString,
//     // post_ids: [u64; 10],
//     // bio: Option<str[100]>,
//     bio: Option<StorageString>,
//     profile_picture: Option<str[81]>,
//     // followers: StorageMap<u64, bool>,
//     // following: StorageMap<u64, bool>,
//     // post_ids: StorageVec<u64>,
//     // posts: StorageMap<u64, Post>,
// }

pub struct Profile {
    // This is left as an example. Support for dynamic length string is needed here
    token_uri: str[81],
    // user_name: str[10],
    // token_uri: StorageString,
    handle: str[15],
    // post_ids: [u64; 10],
    // bio: Option<str[100]>,
    // bio: Option<StorageString>,
    profile_picture: Option<str[81]>,
    // followers: StorageMap<u64, bool>,
    // following: StorageMap<u64, bool>,
    // post_ids: StorageVec<u64>,
    // posts: StorageMap<u64, Post>,
}

impl Profile {
    pub fn new(token_uri: str[81], handle: str[15]) -> Self {
        Profile {
            token_uri,
            handle,
            // bio: Option::None, 
            profile_picture: Option::None,
            // followers: StorageMap {},
            // following: StorageMap {},
            // post_ids: StorageVec {},
            // posts: StorageMap {},
        }
    }
}

pub struct Post {
    // This is left as an example. Support for dynamic length string is needed here
    token_uri: str[81],
    profile_id: u64,
    timestamp: u64,
    collect_amount: u64,
    likes: u64,
    swayed: u64,
    comments: u64,
    // liked_by: StorageMap<u64, bool>,
    // comments_by: StorageMap<u64, Comment>,
    // collected_by: StorageMap<u64, bool>,
    // swayed_by: StorageMap<u64, bool>,
}

impl Post {
    pub fn new(
        token_uri: str[81],
        profile_id: u64,
        timestamp: u64,
        collect_amount: u64,
    ) -> Self {
        Post {
            token_uri,
            profile_id,
            timestamp,
            collect_amount,
            likes: 0,
            swayed: 0,
            comments: 0,
            // liked_by: StorageMap {},
            // comments_by: StorageMap {},s
            // collected_by: StorageMap {},
            // swayed_by: StorageMap {},
        }
    }
}

// Define the comment struct
pub struct Comment {
    token_uri: str[81],
    profile_id: u64,
    timestamp: u64,
}

impl Comment {
    pub fn new(token_uri: str[81], profile_id: u64, timestamp: u64) -> Self {
        Comment {
            token_uri,
            profile_id,
            timestamp,
        }
    }
}

pub enum State {
    Initialized: (),
    Uninitialized: (),
}

impl core::ops::Eq for State {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (State::Initialized, State::Initialized) => true,
            (State::Uninitialized, State::Uninitialized) => true,
            _ => false,
        }
    }
}
