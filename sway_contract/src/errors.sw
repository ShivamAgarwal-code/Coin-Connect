library;

pub enum AccessError {
    SenderCannotSetAccessControl: (),
    SenderNotAdmin: (),
    SenderNotOwner: (),
    SenderNotOwnerOrApproved: (),
    PostDoesNotExist: (),
}

pub enum InitError {
    AdminIsNone: (),
    CannotReinitialize: (),
    NotInitialized: (),
    HandleExists: (),
}

pub enum InputError {
    AdminDoesNotExist: (),
    ApprovedDoesNotExist: (),
    NotEnoughTokensToMint: (),
    OwnerDoesNotExist: (),
    TokenDoesNotExist: (),
    TokenSupplyCannotBeZero: (),
    IncorrectAmountProvided: (),
    AlreadyFollowing: (),
    PostAlreadyLiked: (),
    PostNotLiked: (),
    PostDoesNotExist: (),
}
