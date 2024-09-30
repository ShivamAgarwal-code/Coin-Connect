library;

// use storage_string::*;

pub struct AdminEvent {
    /// The user which is now the admin of this contract.
    /// If there is no longer an admin then the `Option` will be `None`.
    admin: Identity,
}

pub struct ApprovalEvent {
    /// The user that has gotten approval to transfer the specified token.
    /// If an approval was revoked, the `Option` will be `None`.
    approved: Identity,
    /// The user that has given or revoked approval to transfer his/her tokens.
    owner: Identity,
    /// The unique identifier of the token which the approved may transfer.
    profile_id: u64,
}

pub struct BurnEvent {
    /// The user that has burned their token.
    owner: Identity,
    /// The unique identifier of the token which has been burned.
    profile_id: u64,
}

// pub struct CreateProfilEvent {
//     owner: Identity,
//     profile_id: u64,
//     token_uri: str[81],
//     handle: StorageString
// }

pub struct CreateProfilEvent {
    owner: Identity,
    profile_id: u64,
    token_uri: str[81],
    handle: str[15],
}

pub struct FollowEvent {
    profile_id: u64,
    follow: u64,
}

pub struct UnfollowEvent {
    profile_id: u64,
    follow: u64,
}

pub struct MintEvent {
    /// The owner of the newly minted tokens.
    owner: Identity,
    /// The starting range of token ids that have been minted in this transaction.
    profile_id_start: u64,
    /// The total number of tokens minted in this transaction.
    total_tokens: u64,
}

pub struct ProfileUpdatEvent {
    profile_id: u64,
    // bio: StorageString,
    profile_picture: str[81],
}

pub struct OperatorEvent {
    /// Determines whether approval to transfer all of the owner's tokens has been given or revoked.
    approve: bool,
    /// The user which may or may not transfer all tokens on the owner's behalf.
    operator: Identity,
    /// The user which has given or revoked approval to the operator to transfer all of their
    /// tokens on their behalf.
    owner: Identity,
}

pub struct TransferEvent {
    /// The user which previously owned the token that has been transfered.
    from: Identity,
    // The user that made the transfer. This can be the owner, the approved user, or the operator.
    sender: Identity,
    /// The user which now owns the token that has been transfered.
    to: Identity,
    /// The unique identifier of the token which has transfered ownership.
    profile_id: u64,
}

pub struct PostEvent {
    post_id: u64,
    profile_id: u64,
    token_uri: str[81],
    collect_amount: u64,
}

pub struct CommentEvent {
    profile_id: u64,
    post_id: u64,
    comment_id: u64,
    token_uri: str[81],
}

pub struct LikedPostEvent {
    profile_id: u64,
    post_id: u64,
}

pub struct UnlikedPostEvent {
    profile_id: u64,
    post_id: u64,
}

pub struct PostCollectedEvent {
    profile_id: u64,
    post_id: u64,
    collect_amount: u64,
}

pub struct SetDefaultProfileByAddress {
    profile_id: u64,
    owner: Identity,
}
