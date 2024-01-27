import * as yup from 'yup';
// import onChange from 'on-change';
import view from './view.js';

const yupScheme = yup.object({ url: yup.string().required().url() });

export default () => {
  const state = {
    rssForm: {
      state: null,
      error: null,
    },
    rssUrl: {
      url: null,
      isValid: false,
    },
  };
  const rssForm = document.querySelector('.rss-form');
  const rssInput = rssForm.querySelector('input');
  rssInput.addEventListener('input', (e) => {
    console.log(e.target.value);
  });
  console.log(rssForm);
  console.log(view());
  console.log(state);
  yupScheme.validate({ url: 'https://lorem-rss.hexlet.app/feed' }).then((res) => console.log(res));
};
