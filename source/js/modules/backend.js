import {URL} from './constants';

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.status))
  }
}

const json = (response) => {
  return response.json()
}

const getUsersData = (onLoad, onPostsLoad, onCommentsLoad, onError) => {
  fetch(URL.users)
  .then(status)
  .then(json)
  .then((users) => {
    fetch(URL.posts)
    .then(status)
    .then(json)
    .then((posts) => {
      fetch(URL.comments)
      .then(status)
      .then(json)
      .then((comments) => {
        onLoad(users);
        onPostsLoad(posts);
        onCommentsLoad(comments);
      }).catch((error) => {
        alert('Post\'s comments loading failed. ' + error);
        onError();
      });
    }).catch((error) => {
      alert('Users\'s posts loading failed. ' + error);
      onError();
    });
  }).catch((error) => {
    alert('Users loading failed. ' + error);
    onError();
  });
}

const getComments = (id, onSuccess, onError) => {
  fetch(URL.comments)
  .then(status)
  .then(json)
  .then((data) => {
    onSuccess(data, id);
  }).catch((error) => {
    alert('Comments loading failed. ' + error);
    onError();
  });
}

export {getUsersData, getComments};
