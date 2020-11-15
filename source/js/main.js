import {getUsersData, getComments} from "./modules/backend";
import cellLoader from "./modules/cellLoader";

const usersData = [];

const onUsersLoad = (data) => {
  data.forEach((item) => {
    let user = {};
    user.id = item.id;
    user.name = item.name;
    usersData.push(user);
  })
}

const onPostsLoad = (data) => {
  data.forEach((item) => {
    let user = usersData.find((it) => it.id == item.userId);
    if (!user.posts) {
      user.posts = [];
    }
    const post = {};
    post.id = item.id;
    post.title = item.title;
    user.posts.push(post);
  })
}

const onCommentsLoad = (data) => {
  data.forEach((item) => {
    usersData.forEach((userData, idx) => {
      let post = userData.posts.find((it) => it.id == item.postId)

      if(!post) {
        return
      }

      if (!post.comments) {
        post.comments = 0;
      }
      post.comments++;
    })
  })

  renderData();
  removeLoader();
  addEventListeners();
}

const onUsersLoadFail = () => {
  removeLoader();
}

const onCurrentCommentsLoad = (cell) => {
  return (data, id) => {
    let comments = 0;
    data.forEach((item) => {
      if (item.postId === id) {
        comments++;
      }
    })

    cell.textContent = comments;
  }
}

const onCurrentCommentsLoadFail = (cell) => {
  return () => {
    cellLoader.remove(cell);
  }

}

const addEventListeners = () => {
  const rows = document.querySelectorAll('table tr[data-id]');

  rows.forEach((row) => {
    row.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const id = +target.getAttribute('data-id');
      const cell = target.querySelectorAll('td')[2];
      cellLoader.add(cell);
      getComments(id, onCurrentCommentsLoad(cell), onCurrentCommentsLoadFail(cell));
    })
  })
}

const renderData = () => {
  const fragment = document.createDocumentFragment();
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  const thName = document.createElement('th');
  thName.textContent = 'User';
  const thPost = document.createElement('th');
  thPost.textContent = 'Post title';
  const thComments = document.createElement('th');
  thComments.textContent = 'Comments';
  tr.appendChild(thName);
  tr.appendChild(thPost);
  tr.appendChild(thComments);
  tbody.appendChild(tr);

  usersData.forEach((data) => {
    data.posts.forEach((post) => {

      const tr = document.createElement('tr');
      tr.setAttribute('data-id', post.id);
      const tdName = document.createElement('td');
      tdName.textContent = data.name;
      const tdPost = document.createElement('td');
      tdPost.textContent = post.title;
      const tdComments = document.createElement('td');
      tdComments.textContent = post.comments;
      tdComments.style.position = 'relative';
      tr.appendChild(tdName);
      tr.appendChild(tdPost);
      tr.appendChild(tdComments);
      fragment.appendChild(tr);
    })
  })

  tbody.appendChild(fragment);
  table.appendChild(tbody);
  document.querySelector('body').appendChild(table);
}

const removeLoader = () => {
  document.getElementById('loader').classList.add('hidden');
}

getUsersData(onUsersLoad, onPostsLoad, onCommentsLoad, onUsersLoadFail);
