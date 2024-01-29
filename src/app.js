import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import view from './view.js';
import ru from './locales/ru.js';
// import en from './locales/en.js';

const yupScheme = yup.object().shape({ url: yup.string().url() });

export default () => {
  const defaultLanguage = 'ru';

  const instanceState = {
    appLng: defaultLanguage,
    rssForm: {
      status: 'filling',
      error: null,
    },
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
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources: {
      ru,
    },
  })
    .then(() => {
      const state = onChange(instanceState, view(instanceState, i18nInstance, domElements));

      domElements.rssForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = domElements.rssForm.elements.url.value;
        yupScheme.validate({ url })
          .then(() => {
            console.log('to view.js');
            state.rssForm.status = 'sending';
          })
          .catch((err) => {
            state.rssForm.error = 400; // 400 Bad Request RFC 7231

            console.log(err.errors);
          });
      });
    });
};
