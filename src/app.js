import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';

import view from './view.js';
import resources from './locales/index.js';
import rssParser from './rssParser.js';

const allOrigin = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
const uidGenerator = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export default () => {
  const defaultLanguage = 'ru';

  const instanceState = {
    appLng: defaultLanguage,
    loadingProcess: 'init',
    rssForm: {
      error: null,
    },
    feeds: [],
    lastFeedId: 0,
    postList: [],
    lastPostId: 0,
    checkedPosts: [],
  };

  const domElements = {
    appName: document.querySelector('.app-name'),
    lead: document.querySelector('.lead'),
    rssForm: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
    rssInput: document.querySelector('#url-input'),
    rssInputPlaceholder: document.querySelector('[for="url-input"]'),
    sendBtn: document.querySelector('.btn-lg'),
    example: document.querySelector('.example'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    modal: document.querySelector('.modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFullArticle: document.querySelector('.full-article'),
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })
    .then(() => {
      const state = onChange(instanceState, view(instanceState, i18nInstance, domElements));

      const urlValidator = (feeds) => {
        yup.setLocale({
          string: {
            url: 'errUrl',
          },
        });
        const arrayOfUrls = feeds.map(({ url }) => url);
        return yup.object().shape({ url: yup.string().url().notOneOf(arrayOfUrls, 'duplicate') });
      };

      const readBtnHandler = (btn) => {
        const postId = btn.currentTarget.dataset.id;
        const postById = state.postList.filter(({ id }) => id === postId);
        state.checkedPosts.push(...postById);
      };

      const rssRequests = (currentState, newUrl) => {
        // https://habr.com/ru/rss/articles/?fl=ru
        const isNew = currentState.feeds.every(({ url }) => url !== newUrl);
        const newRequest = isNew ? [axios.get(allOrigin(newUrl))] : [];
        const oldRequests = currentState.feeds.map(({ url }) => {
          const allOriginUrl = allOrigin(url);
          const request = axios.get(allOriginUrl);
          return request;
        });
        return [...oldRequests, ...newRequest];
      };

      const downloadContent = (url) => {
        const requests = state.feeds.length ? rssRequests(state, url) : [axios.get(allOrigin(url))];
        const downLoad = Promise.all([...requests]);
        return downLoad
          .then((rssData) => {
            const content = rssData.reduce((acc, rss) => {
              const parsedRss = rssParser(rss.data.contents);
              return [...acc, parsedRss];
            }, []);
            return content;
          })
          .then((contents) => {
            contents.forEach(({ feed, posts }) => {
              const { title, description } = feed;
              const hasFeed = state.feeds.filter((feedItem) => feedItem.title === title);
              if (hasFeed.length === 0) {
                state.feeds.push({
                  id: uidGenerator(), title, description, url,
                });
              }
              if (state.postList.length) {
                const newPost = posts
                  .filter((post) => state.postList.every((item) => item.title !== post.title));
                newPost.forEach((post) => {
                  /* eslint no-param-reassign: 0 */
                  post.id = uidGenerator();
                  /* eslint no-param-reassign: 1 */
                });
                state.postList.unshift(...newPost);
                // state.loadingProcess = 'success';
                return;
              }
              posts.forEach((post) => {
                /* eslint no-param-reassign: 0 */
                post.id = uidGenerator();
                /* eslint no-param-reassign: 1 */
              });
              state.postList.push(...posts);
              state.loadingProcess = 'success';
            });
            domElements.readBtn = document.querySelectorAll('.btn-sm');
            domElements.readBtn.forEach((readBtn) => {
              readBtn.addEventListener('click', readBtnHandler);
            });
          })
          .catch(() => {
            state.loadingProcess = 'failed';
          })
          .finally(() => setTimeout(downloadContent, 5000, url));
      };

      domElements.rssForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = domElements.rssForm.elements.url.value.trim();
        const urlShape = urlValidator(state.feeds);
        urlShape.validate({ url })
          .then(() => {
            state.loadingProcess = 'loading'; // блок кнопки
            return downloadContent(url);
          })
          .then(() => {
            state.rssForm.error = null;
            state.loadingProcess = 'init';
          })
          .catch((err) => {
            state.rssForm.error = err.message;
          });
      });
    });
};
