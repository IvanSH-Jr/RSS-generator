// const getNestedVal = (path, state) => path.split('.').reduce((p, c) => p[c], state);

const errorHandler = (i18nInstance, domElements, errValue) => {
  const {
    // appName,
    // lead,
    // rssForm,
    feedback,
    rssInput,
    // rssInputPlaceholder,
    // sendBtn,
    // example,
  } = domElements;
  const errorText = i18nInstance.t(errValue);
  feedback.textContent = errorText;
  rssInput.classList.add('is-invalid');
};

const formStatusHandler = (i18nInstance, domElements, value) => {
  console.log(i18nInstance);
  console.log(domElements);
  console.log(value);
};

export default (state, i18nInstance, domElements) => (path, value) => {
  console.log(state);
  switch (path) {
    case 'rssForm.error': errorHandler(i18nInstance, domElements, value);
      break;
    case 'rssForm.status': formStatusHandler(i18nInstance, domElements, value);
      break;
    default:
      throw new Error(`Unknown path of app state: '${path}'!`);
  }
};
