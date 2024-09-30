contract;

mod data_structures;
mod errors;
mod interface;
mod events;

use data_structures::{Comment, Post, Profile, State, TokenMetaData};
use errors::{AccessError, InitError, InputError};
use interface::NFT;
use events::{
    AdminEvent,
    ApprovalEvent,
    BurnEvent,
    CommentEvent,
    CreateProfilEvent,
    FollowEvent,
    LikedPostEvent,
    OperatorEvent,
    PostCollectedEvent,
    PostEvent,
    ProfileUpdatEvent,
    SetDefaultProfileByAddress,
    TransferEvent,
    UnfollowEvent,
    UnlikedPostEvent,
};

use std::{
    auth::msg_sender,
    block::height,
    call_frames::contract_id,
    constants::BASE_ASSET_ID,
    context::{
        balance_of,
        msg_amount,
    },
    identity::Identity,
    logging::log,
    token::transfer,
};
// use storage_string::*;
// use string::String;

storage {
    /// Determines if only the contract's `admin` is allowed to call the mint function.
    /// This is only set on the initalization of the contract.
    state: State = State::Uninitialized,
    /// Stores the user that is permitted to mint if `access_control` is set to true.
    /// Will store `None` if this contract does not have `access_control` set.
    /// Only the `admin` is allowed to change the `admin` of the contract.
    admin: Option<Identity> = Option::None,
    /// Stores the user which is approved to transfer a token based on it's unique identifier.
    /// In the case that no user is approved to transfer a token based on the token owner's behalf,
    /// `None` will be stored.
    /// Map(profile_id => approved)
    approved: StorageMap<u64, Identity> = StorageMap {},
    /// Used for O(1) lookup of the number of tokens owned by each user.
    /// This increments or decrements when minting, transfering ownership, and burning tokens.
    /// Map(Identity => balance)
    balances: StorageMap<Identity, u64> = StorageMap {},
    /// The total supply tokens that can ever be minted.
    /// This can only be set on the initalization of the contract.
    max_supply: Option<u64> = Option::None,
    /// Stores the `Profile` for each token based on the token's unique identifier.
    /// Map(profile_id => Profile)
    profile: StorageMap<u64, Profile> = StorageMap {},
    default_profile_by_address: StorageMap<Identity, u64> = StorageMap {},
    /// Maps a tuple of (owner, operator) identities and stores whether the operator is allowed to
    /// transfer ALL tokens on the owner's behalf.
    /// Map((owner, operator) => approved)
    operator_approval: StorageMap<(Identity, Identity), bool> = StorageMap {},
    /// Stores the user which owns a token based on it's unique identifier.
    /// If the token has been burned then `None` will be stored.
    /// Map(profile_id => owner)
    owners: StorageMap<u64, Identity> = StorageMap {},
    /// The total number of tokens that ever have been minted.
    /// This is used to assign token identifiers when minting. This will only be incremented.
    profile_id: u64 = 0,
    /// The number of tokens currently in existence.
    /// This is incremented on mint and decremented on burn. This should not be used to assign
    /// unqiue identifiers due to the decrementation of the value on burning of tokens.
    total_supply: u64 = 0,
    // followers: posts: StorageMap<(u64, u64), Post> = StorageMap {},
    // following: StorageMap<(u64, u64), bool> = StorageMap {},
    post_ids: u64 = 0,
    // posts: StorageMap<(u64, u64), Post> = StorageMap {},
    // handle_exist: StorageMap<StorageString, bool> = StorageMap {},
    handle_exist: StorageMap<str[15], bool> = StorageMap {},
    // first key is profile_id and second key is follower's profile_id
    followers: StorageMap<(u64, u64), bool> = StorageMap {},
    following: StorageMap<(u64, u64), bool> = StorageMap {},
    // user_post_ids: StorageMap<(u64, u64), bool> = StorageMap {},
    // first key is post_id
    posts: StorageMap<u64, Post> = StorageMap {},
    //first key is post_id key and second key is Comment_id for that post
    comments: StorageMap<(u64, u64), Comment> = StorageMap {},
    //first key is post_id key and second key is profile_id
    liked_by: StorageMap<(u64, u64), bool> = StorageMap {},
    //first key is post_id key and second key is profile_id
    collected_by: StorageMap<(u64, u64), bool> = StorageMap {},
}

struct MintEvent {
    owner: Identity,
    token_id: u64,
}

impl NFT for Contract {
    #[storage(read)]
    fn admin() -> Option<Identity> {
        storage.admin.read()
    }

    #[storage(read, write)]
    fn approve(approved: Identity, profile_id: u64) {
        let token_owner = storage.owners.get(profile_id).try_read();
        require(token_owner.is_some(), InputError::TokenDoesNotExist);

        // Ensure that the sender is the owner of the token to be approved
        let sender = msg_sender().unwrap();
        require(token_owner.unwrap() == sender, AccessError::SenderNotOwner);

        // Set and store the `approved` `Identity`
        storage.approved.insert(profile_id, approved);

        log(ApprovalEvent {
            approved: approved,
            owner: sender,
            profile_id: profile_id,
        });
    }

    #[storage(read)]
    fn approved(profile_id: u64) -> Option<Identity> {
        storage.approved.get(profile_id).try_read()
    }

    #[storage(read)]
    fn balance_of(owner: Identity) -> Option<u64> {
        storage.balances.get(owner).try_read()
    }

    #[storage(read, write)]
    fn burn(profile_id: u64) {
        // Ensure this is a valid token
        let token_owner = storage.owners.get(profile_id).try_read();
        require(token_owner.is_some(), InputError::TokenDoesNotExist);

        // Ensure the sender owns the token that is provided
        let sender = msg_sender().unwrap();
        require(token_owner.unwrap() == sender, AccessError::SenderNotOwner);

        storage.owners.remove(profile_id);
        storage.balances.insert(sender, storage.balances.get(sender).read() - 1);
        storage.total_supply.write(storage.total_supply.read() - 1);

        log(BurnEvent {
            owner: sender,
            profile_id,
        });
    }

    #[storage(read, write)]
    fn change_max_supply(max_supply: Option<u64>) {
        require(storage.state.read() == State::Uninitialized, InitError::CannotReinitialize);
        require((msg_sender().unwrap() == storage.admin.read().unwrap()), AccessError::SenderNotAdmin);
        storage.max_supply.write(max_supply);
    }

    #[storage(read, write)]
    fn constructor(admin: Identity, max_supply: u64) {
        // This function can only be called once so if the token supply is already set it has
        // already been called
        require(storage.state.read() == State::Uninitialized, InitError::CannotReinitialize);
        storage.state.write(State::Initialized);
        require(max_supply != 0, InputError::TokenSupplyCannotBeZero);

        storage.admin.write(Option::Some(admin));
        storage.max_supply.write(Option::Some(max_supply));
    }

    #[storage(read)]
    fn is_approved_for_all(operator: Identity, owner: Identity) -> Option<bool> {
        storage.operator_approval.get((owner, operator)).try_read()
    }

    #[storage(read)]
    fn max_supply() -> Option<u64> {
        storage.max_supply.read()
    }

    #[storage(read, write)]
    fn create_profile(to: Identity, token_uri: str[81], handle: str[15]) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        require(!storage.handle_exist.get(handle).try_read().unwrap_or(false), InitError::HandleExists);
        let index = storage.profile_id.read();

        // The current number of tokens minted plus the amount to be minted cannot be
        // greater than the total supply
        require(storage.max_supply.read().is_none() || (index + 1 <= storage.max_supply.read().unwrap()), InputError::NotEnoughTokensToMint);

        // Mint as many tokens as the sender has asked for
        // Create the Profile for this new token
        storage.profile.insert(index, Profile::new(token_uri, handle));
        storage.owners.insert(index, to);
        storage.handle_exist.insert(handle, true);

        storage.default_profile_by_address.insert(to, index);
        storage.balances.insert(to, storage.balances.get(to).try_read().unwrap_or(0) + 1);
        storage.profile_id.write(index + 1);
        storage.total_supply.write(storage.total_supply.read() + 1);

        log(MintEvent {
            owner: to,
            token_id: index,
        });

        log(CreateProfilEvent {
            owner: to,
            profile_id: index,
            token_uri: token_uri,
            handle: handle,
        });
    }

    #[storage(read, write)]
    fn update_profile(profile_picture: str[81]) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();

        let mut profile = storage.profile.get(profile_id).read();
        // profile.bio = Option::Some(bio);
        profile.profile_picture = Option::Some(profile_picture);
        storage.profile.insert(profile_id, profile);

        log(ProfileUpdatEvent {
            profile_id,
            // bio,
            profile_picture,
        });
    }

    #[storage(read, write)]
    fn follow(follow: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();

        require(!storage.following.get((profile_id, follow)).try_read().unwrap_or(false), InputError::AlreadyFollowing);

        // let mut profile = storage.profile.get(profile_id).read().following.insert(follow, true);
        // storage.profile.get(follow).followers.insert(profile_id, true);
        storage.following.insert((profile_id, follow), true);
        storage.followers.insert((follow, profile_id), true);

        log(FollowEvent {
            profile_id,
            follow,
        });
    }

    #[storage(read, write)]
    fn unfollow(follow: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();

        // storage.profile.get(profile_id).read().following.insert(follow, false);
        // storage.profile.get(follow).followers.insert(profile_id, false);
        storage.following.insert((profile_id, follow), false);
        storage.followers.insert((follow, profile_id), false);

        log(UnfollowEvent {
            profile_id,
            follow,
        });
    }

    #[storage(read, write)]
    fn create_post(token_uri: str[81], collect_amount: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        let sender = msg_sender().unwrap();
        let profile_id = storage.default_profile_by_address.get(sender).read();
        let mut post_id = storage.post_ids.read();
        // let mut profile = storage.profile.get(profile_id).read();
        // profile.post_ids.push(post_id);
        // profile.posts.insert(post_id, Post::new(token_uri, height(), collect_amount));
        // post_id.write(post_id);
        storage.posts.insert(post_id, Post::new(token_uri, profile_id, height(), collect_amount));

        log(MintEvent {
            owner: sender,
            token_id: post_id,
        });

        log(PostEvent {
            post_id,
            profile_id,
            token_uri,
            collect_amount,
        });
    }

    #[payable, storage(read, write)]
    fn collect_post(post_id: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        require(storage.posts.get(post_id).try_read().is_some(), InputError::PostDoesNotExist);

        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();
        let mut post_id = storage.post_ids.read();

        let post = storage.posts.get(post_id).try_read();
        require(post.is_some(), AccessError::PostDoesNotExist);
        let post = post.unwrap();
        require(post.collect_amount == msg_amount(), InputError::IncorrectAmountProvided);
        storage.collected_by.insert((post_id, profile_id), true);

        log(PostCollectedEvent {
            profile_id,
            post_id,
            collect_amount: post.collect_amount,
        });
    }

    #[storage(read, write)]
    fn comment_post(post_id: u64, token_uri: str[81]) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        require(storage.posts.get(post_id).try_read().is_some(), InputError::PostDoesNotExist);

        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();
        let post = storage.posts.get(post_id).try_read();
        require(post.is_some(), AccessError::PostDoesNotExist);
        let mut post = post.unwrap();
        storage.comments.insert((post_id, post.comments), Comment::new(token_uri, profile_id, height()));
        post.comments += 1;
        storage.posts.insert(post_id, post);

        log(CommentEvent {
            profile_id,
            post_id,
            comment_id: post.comments - 1,
            token_uri,
        });
    }

    #[storage(read, write)]
    fn like_post(post_id: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        require(storage.posts.get(post_id).try_read().is_some(), InputError::PostDoesNotExist);

        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();
        require(!storage.liked_by.get((post_id, profile_id)).try_read().unwrap_or(false), InputError::PostAlreadyLiked);

        let post = storage.posts.get(post_id).try_read();
        require(post.is_some(), AccessError::PostDoesNotExist);
        let mut post = post.unwrap();
        storage.liked_by.insert((post_id, profile_id), true);
        post.likes += 1;
        storage.posts.insert(post_id, post);

        log(LikedPostEvent {
            profile_id,
            post_id,
        });
    }

    #[storage(read, write)]
    fn unlike_post(post_id: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        require(storage.posts.get(post_id).try_read().is_some(), InputError::PostDoesNotExist);

        let profile_id = storage.default_profile_by_address.get(msg_sender().unwrap()).read();
        require(storage.liked_by.get((post_id, profile_id)).try_read().unwrap_or(false), InputError::PostNotLiked);

        let post = storage.posts.get(post_id).try_read();
        require(post.is_some(), AccessError::PostDoesNotExist);
        let mut post = post.unwrap();
        storage.liked_by.insert((post_id, profile_id), false);
        post.likes -= 1;
        storage.posts.insert(post_id, post);

        log(UnlikedPostEvent {
            profile_id,
            post_id,
        });
    }

    #[storage(read, write)]
    fn set_default_profile_by_address(profile_id: u64) {
        // require(storage.state.read() == State::Initialized, InitError::NotInitialized);
        let token_owner = storage.owners.get(profile_id).try_read();
        require(token_owner.is_some(), InputError::TokenDoesNotExist);
        let sender = msg_sender().unwrap();
        require(token_owner.unwrap() == sender, AccessError::SenderNotOwner);
        storage.default_profile_by_address.insert(sender, profile_id);

        log(SetDefaultProfileByAddress {
            profile_id,
            owner: sender,
        });
    }

    #[storage(read)]
    fn get_default_profile_by_address(address: Identity) -> Option<u64> {
        storage.default_profile_by_address.get(address).try_read()
    }

    #[storage(read)]
    fn profle_data(profile_id: u64) -> Option<Profile> {
        storage.profile.get(profile_id).try_read()
    }

    #[storage(read)]
    fn post_data(post_id: u64) -> Option<Post> {
        storage.posts.get(post_id).try_read()
    }

    #[storage(read)]
    fn get_follow(profile_id: u64, follow: u64) -> Option<bool> {
        storage.following.get((profile_id, follow)).try_read()
    }

    #[storage(read)]
    fn token_metadata(profile_id: u64) -> Option<TokenMetaData> {
        let profile = storage.profile.get(profile_id).read();
        let data = TokenMetaData {
            token_uri: profile.token_uri,
        };
        Option::Some(data)
    }

    #[storage(read)]
    fn owner_of(profile_id: u64) -> Option<Identity> {
        storage.owners.get(profile_id).try_read()
    }

    #[storage(read, write)]
    fn set_admin(admin: Identity) {
        let current_admin = storage.admin.read();
        require(current_admin.is_some() && msg_sender().unwrap() == current_admin.unwrap(), AccessError::SenderCannotSetAccessControl);
        storage.admin.write(Option::Some(admin));

        log(AdminEvent { admin });
    }

    #[storage(write)]
    fn set_approval_for_all(approve: bool, operator: Identity) {
        // Store `approve` with the (sender, operator) tuple
        let sender = msg_sender().unwrap();
        storage.operator_approval.insert((sender, operator), approve);

        log(OperatorEvent {
            approve,
            owner: sender,
            operator,
        });
    }

    #[storage(read)]
    fn total_supply() -> u64 {
        storage.total_supply.read()
    }

    #[storage(read, write)]
    fn transfer(to: Identity, profile_id: u64) {
        // Make sure the `profile_id` maps to an existing token
        let token_owner = storage.owners.get(profile_id).try_read();
        let sender = msg_sender().unwrap();
        require(token_owner.is_some(), InputError::TokenDoesNotExist);
        let from = token_owner.unwrap();

        // Ensure that the sender is either:
        // 1. The owner of the token
        // 2. Approved for transfer of this `profile_id`
        // 3. Has operator approval for the `from` identity and this token belongs to the `from` identity
        let approved = storage.approved.get(profile_id).try_read();
        let operator_approved = storage.operator_approval.get((from, sender)).try_read().unwrap_or(false);
        require(sender == from || (approved.is_some() && sender == approved.unwrap()) || operator_approved, AccessError::SenderNotOwnerOrApproved);

        // Set the new owner of the token and reset the approved Identity
        storage.owners.insert(profile_id, to);
        if approved.is_some() {
            storage.approved.remove(profile_id);
        }

        storage.balances.insert(from, storage.balances.get(from).read() - 1);
        storage.balances.insert(to, storage.balances.get(to).try_read().unwrap_or(0) + 1);

        log(TransferEvent {
            from,
            sender,
            to,
            profile_id,
        });
    }

    fn get_balance() -> u64 {
        balance_of(BASE_ASSET_ID, contract_id())
    }

    #[storage(read)]
    fn withdraw_balance(amount: u64) {
        let current_admin = storage.admin.read();
        require(amount < balance_of(BASE_ASSET_ID, contract_id()), InputError::IncorrectAmountProvided);
        require(current_admin.is_some() && msg_sender().unwrap() == current_admin.unwrap(), AccessError::SenderCannotSetAccessControl);
        transfer(amount, BASE_ASSET_ID, current_admin.unwrap());
    }

    // #[storage(read, write)]
    // fn transfer_from(from: Identity, to: Identity, profile_id: u64) {
    //     // Make sure the `profile_id` maps to an existing token
    //     let token_owner = storage.owners.get(profile_id);
    //     let sender = msg_sender().unwrap();
    //     require(token_owner.is_some(), InputError::TokenDoesNotExist);
    //     let from = token_owner.unwrap();

    //     // Ensure that the sender is either:
    //     // 1. The owner of the token
    //     // 2. Approved for transfer of this `profile_id`
    //     // 3. Has operator approval for the `from` identity and this token belongs to the `from` identity
    //     let approved = storage.approved.get(profile_id).try_read();
    //     let operator_approved = storage.operator_approval.get((from, sender)).unwrap_or(false);
    //     require(sender == from || (approved.is_some() && sender == approved.unwrap()) || operator_approved, AccessError::SenderNotOwnerOrApproved);

    //     // Set the new owner of the token and reset the approved Identity
    //     storage.owners.insert(profile_id, to);
    //     if approved.is_some() {
    //         storage.approved.remove(profile_id);
    //     }

    //     storage.balances.insert(from, storage.balances.get(from).read() - 1);
    //     storage.balances.insert(to, storage.balances.get(to).try_read().unwrap_or(0) + 1);

    //     log(TransferEvent {
    //         from,
    //         sender,
    //         to,
    //         profile_id,
    //     });
    // }
}
