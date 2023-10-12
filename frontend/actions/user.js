import fetch from "isomorphic-fetch";
import { API } from "../config";

export const initateCheckout = (userId, token) => {
  const data = {
    userId,
  };
  return fetch(`${API}/user/initate-checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getRequests = (userId, token) => {
  const data = {
    userId,
  };
  return fetch(`${API}/user/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUserStatusAndCheckInFavourites = (
  signedInUser,
  visitedUser,
  token
) => {
  const data = {
    signedInUser,
    visitedUser,
  };
  return fetch(`${API}/user/check-user-status-and-in-favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readMyNotifications = (notificationId, token) => {
  const data = {
    notificationId,
  };
  return fetch(`${API}/user/read-notification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMyNotifications = (userId, token) => {
  const data = {
    userId,
  };
  return fetch(`${API}/user/my-notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchUser = (searchQuery, token) => {
  const data = {
    query: searchQuery,
  };
  return fetch(`${API}/users/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const fetchFavourites = (userId, token) => {
  const data = {
    userId,
  };
  return fetch(`${API}/user/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const setUserRoomStatus = (
  roomId,
  status,
  username,
  receiver,
  rejectionReason
) => {
  const data = {
    roomId,
    status,
    username,
    receiver,
    rejectionReason,
  };
  return fetch(`${API}/set-user-room-status`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const fetchRequest = (requestId, token) => {
  const data = {
    requestId,
  };
  return fetch(`${API}/get-request`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkInFavourites = (sender, userToCheck, token) => {
  const data = {
    sender,
    userToCheck,
  };
  return fetch(`${API}/user/in-favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const acceptRequest = (requestId, token) => {
  const data = {
    requestId,
  };
  return fetch(`${API}/user/accept-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const makeRequestFailed = (requestId, token) => {
  const data = {
    requestId,
  };
  return fetch(`${API}/user/failed-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsersNeedContact = () => {
  return fetch(`${API}/users/need-contact`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const rejectRequest = (requestId, token) => {
  const data = {
    requestId,
  };
  return fetch(`${API}/user/reject-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const sendNotification = (senderUsername, message, link, token) => {
  const data = {
    senderUsername,
    message,
    link,
  };
  return fetch(`${API}/user/reject-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const sendAcceptanceRequest = (sender, reciever, token) => {
  const data = {
    sender,
    reciever,
  };
  return fetch(`${API}/user/acceptance-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addToFavourite = (sender, userToAdd, token) => {
  const data = {
    sender,
    userToAdd,
  };
  return fetch(`${API}/user/add-favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeFromFavourite = (sender, userToRemove, token) => {
  const data = {
    sender,
    userToRemove,
  };
  return fetch(`${API}/user/remove-favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStatistics = () => {
  return fetch(`${API}/users-statistics`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getUsers = (
  pageNumber,
  pageSize,
  gender,
  status,
  country,
  nationality,
  state,
  face,
  age
) => {
  const data = {
    pageSize,
    pageNumber,
    gender,
    status,
    country,
    nationality,
    state,
    face,
    age,
  };
  return fetch(`${API}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getQuestions = () => {
  return fetch(`${API}/user-questions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deactivateAccount = (username, token) => {
  return fetch(`${API}/deactivate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const blockUser = (username, token) => {
  return fetch(`${API}/users/block-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const activateAccount = (username, token) => {
  return fetch(`${API}/activate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const confirmUser = (username, token) => {
  return fetch(`${API}/confirm`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const rejectUser = (username, token) => {
  return fetch(`${API}/reject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMenThatNeedConfirmations = (token) => {
  return fetch(`${API}/users/men-need-confirmation`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getWomenThatNeedConfirmations = (token) => {
  return fetch(`${API}/users/women-need-confirmation`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsersReports = (token) => {
  return fetch(`${API}/users/reports`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const userPublicProfile = (username) => {
  return fetch(`${API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProfile = (token) => {
  return fetch(`${API}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (token, user) => {
  return fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => {
      // handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const adminUpdatePhone = (token, userId, newPhone) => {
  return fetch(`${API}/users/admin-update-phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, newPhone }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const adminUpdateIdNumber = (token, userId, newIdNumber) => {
  return fetch(`${API}/users/admin-update-idnumber`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, newIdNumber }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
