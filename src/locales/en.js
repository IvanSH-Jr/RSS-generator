import { setLocale } from 'yup';

setLocale({
  string: {
    url: 'errUrl',
  },
});

export default {
  translation: {
    appName: 'RSS aggregator',
    rssInputPlaceholde: 'RSS link',
    lead: 'Start reading RSS today! It\'s easy, it\'s beautiful.',
    example: 'Example: https://ru.hexlet.io/lessons.rss',
    errUrl: 'The link must be a valid URL',

  },
};
