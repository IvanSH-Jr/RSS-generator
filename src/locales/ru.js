import { setLocale } from 'yup';

setLocale({
  string: {
    url: 'errUrl',
  },
});

export default {
  translation: {
    appName: 'RSS агрегатор',
    rssInputPlaceholde: 'Ссылка RSS',
    lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
    example: 'Пример: https://ru.hexlet.io/lessons.rss',
    errUrl: 'Ссылка должна быть валидным URL',
    rssSucceed: 'RSS успешно загружен',
  },
};
