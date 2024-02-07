import { setLocale } from 'yup';

setLocale({
  string: {
    url: 'errUrl',
  },
});

export default {
  translation: {
    appName: 'RSS aggregator',
    rssForm: {
      inputPlaceholder: 'RSS link',
      finished: 'RSS successfully uploaded',
      sending: 'The request is being sent',
      sent: 'RSS is loading',
      error: {
        invalid: 'The resource does not contain valid RSS',
        duplicate: 'RSS already exists',
        errUrl: 'The link must be a valid URL',
        'Network Error': 'Network Error',
      },
    },
    lead: 'Start reading RSS today! It\'s easy, it\'s beautiful.',
    example: 'Example: https://ru.hexlet.io/lessons.rss',
    feeds: 'Feeds',
    postList: 'Posts',
    readBtn: 'Show',
  },
};
