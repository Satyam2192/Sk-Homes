import { signOutUserStart, deleteUserSuccess, deleteUserFailure } from 'your-redux-actions'; // Replace with the correct paths


export const handleSignOut = async (dispatch) => {
    try {
        dispatch(signOutUserStart());
        const res = await fetch(`/api/auth/signout`);
        const data = await res.json();

        if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
        } else {
            dispatch(deleteUserSuccess(data));
        }
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
};

export const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
            dispatch(updateUserFailure(data.message));
            return;
        }

        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
        dispatch(updateUserFailure(error.message));
    }
};

export const handleDeleteUser = async () => {
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
    }
};

export const handleShowListings = async () => {
    try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
            setShowListingsError(true);
            return;
        }

        setUserListings(data);
    } catch (error) {
        setShowListingsError(true);
    }
};

export const handleListingDelete = async (listingId) => {
    try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
            console.log(data.message);
            return;
        }

        setUserListings((prev) =>
            prev.filter((listing) => listing._id !== listingId)
        );
    } catch (error) {
        console.log(error.message);
    }
};
