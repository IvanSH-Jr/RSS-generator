const errorHandler = (state, i18nInstance, domElements) => {
  const { feedback, rssInput } = domElements;
  const { error } = state.rssForm;
  if (error) {
    const errorText = i18nInstance.t(`rssForm.error.${error}`);
    feedback.textContent = errorText;
    feedback.classList.replace('text-success', 'text-danger');
    rssInput.classList.add('is-invalid');
  }
};

const formStatusHandler = (state, i18nInstance, domElements, status) => {
  const {
    feedback, rssInput, sendBtn, rssForm,
  } = domElements;
  switch (status) {
    case 'sending':
      sendBtn.setAttribute('disabled', '');
      break;
    case 'finished':
    case 'filling':
      sendBtn.removeAttribute('disabled');
      feedback.textContent = i18nInstance.t('rssForm.finished');
      feedback.classList.replace('text-danger', 'text-success');
      feedback.classList.replace('loading', 'text-success');
      rssInput.classList.remove('is-invalid');
      rssForm.reset();
      rssInput.focus();
      break;
    case 'error':
      feedback.textContent = i18nInstance.t(`rssForm.error.${state.rssForm.error}`);
      feedback.classList.replace('loading', 'text-danger');
      feedback.classList.replace('text-success', 'text-danger');
      break;
    default:
      throw new Error(`Unknown status:${status}`);
  }
};

const modalWindowRender = ({ title, description, link }, domElements) => {
  const {
    modalTitle,
    modalBody,
    modalFullArticle,
  } = domElements;
  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalFullArticle.href = link;
};

const checkedPostsHandler = (checkedPosts, domElements) => {
  checkedPosts.forEach((post) => {
    const postLink = document.querySelector(`[data-id = '${post.id}']`);
    postLink.classList.replace('fw-bold', 'fw-normal');
    postLink.classList.add('link-secondary');
    modalWindowRender(post, domElements);
  });
};

/* eslint no-param-reassign: 0 */
const cardBody = (container, name) => {
  container.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardNameBox = document.createElement('div');
  cardNameBox.classList.add('card-body');
  const cardName = document.createElement('h2');
  cardName.classList.add('card-title', 'h4');
  cardName.textContent = name;
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(cardName);
  container.append(card);
  container.append(list);
  return container;
};
/* eslint no-param-reassign: 1 */
const feedsRender = (name, domElements, state) => {
  const { feeds } = domElements;
  const listContainer = cardBody(feeds, name);
  state.feeds.forEach((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.classList.add('h6', 'm-0');
    const p = document.createElement('p');
    p.textContent = description;
    p.classList.add('m-0', 'small', 'text-black-50');
    li.append(h3);
    li.append(p);
    listContainer.append(li);
  });
};

const postsRender = (name, domElements, state, btnName) => {
  const { posts } = domElements;
  if (!posts.hasChildNodes()) {
    const container = cardBody(posts, name);
    posts.replaceWith(container);
  }
  const listGroup = document.querySelector('.list-group');
  const list = state.postList.map((post) => {
    const { title, link, id } = post;
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );
    const a = document.createElement('a');
    a.textContent = title;
    const isVisited = state.checkedPosts.filter((checkedPost) => id === checkedPost.id);
    const linkClass = isVisited.length ? ['fw-normal', 'link-secondary'] : ['fw-bold'];
    a.href = link;
    a.classList.add(...linkClass);
    a.setAttribute('data-id', id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btn.textContent = btnName;
    btn.setAttribute('data-id', id);
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#modal');
    li.append(a);
    li.append(btn);
    return li;
  });
  listGroup.replaceChildren(...list);
};

export default (state, i18nInstance, domElements) => (path, value) => {
  switch (path) {
    case 'rssForm.error': errorHandler(state, i18nInstance, domElements);
      break;
    case 'rssForm.status': formStatusHandler(state, i18nInstance, domElements, value);
      break;
    case 'feeds': feedsRender(i18nInstance.t(path), domElements, state);
      break;
    case 'postList': postsRender(i18nInstance.t(path), domElements, state, i18nInstance.t('readBtn'));
      break;
    case 'lastFeedId':
    case 'lastPostId':
      break;
    case 'checkedPosts': checkedPostsHandler(value, domElements);
      break;
    default:
      throw new Error(`Unknown path of app state: '${path}'!`);
  }
};
