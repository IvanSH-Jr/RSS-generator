import { setLocale } from 'yup';

setLocale({
  string: {
    url: ({ url }) => ({ url: 'Ссылка должна быть валидным URL', values: { url } }),
  },
});

export default {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    appName: 'RSS агрегатор',
    rssInputPlaceholde: 'Ссылка RSS',
    lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
    example: 'Пример: https://ru.hexlet.io/lessons.rss',
  },
};
