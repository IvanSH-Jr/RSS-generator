// const getNestedVal = (path, state) => path.split('.').reduce((p, c) => p[c], state);

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
      feedback.textContent = i18nInstance.t(`rssForm.${status}`);
      feedback.classList.replace('text-danger', 'loading');
      feedback.classList.replace('text-success', 'loading');
      sendBtn.setAttribute('disabled', '');
      break;
    case 'sent':
      feedback.textContent = i18nInstance.t(`rssForm.${status}`);
      feedback.classList.replace('loading', 'text-danger');
      sendBtn.removeAttribute('disabled');
      break;
    case 'filling':
    case 'finished':
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
  return list;
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

const postsRender = (name, domElements, state) => {
  const { posts } = domElements;
  const listContainer = cardBody(posts, name);
  state.postList.forEach((post) => {
    const { title, link } = post;
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
    a.classList.add('fw-bold');
    a.href = link;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btn.textContent = 'Просмотр';

    li.append(a);
    li.append(btn);
    listContainer.append(li);
  });
};

export default (state, i18nInstance, domElements) => (path, value, prev) => {
  console.log(state);
  switch (path) {
    case 'rssForm.error': errorHandler(state, i18nInstance, domElements);
      break;
    case 'rssForm.status': formStatusHandler(state, i18nInstance, domElements, value);
      break;
    case 'feeds': feedsRender(i18nInstance.t(path), domElements, state);
      break;
    case 'postList': postsRender(i18nInstance.t(path), domElements, state);
      break;
    case 'lastFeedId': console.log(`lastFeedId = ${prev}, currentId = ${value}`);
      break;
    default:
      throw new Error(`Unknown path of app state: '${path}'!`);
  }
};
