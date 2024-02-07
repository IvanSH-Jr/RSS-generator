import { setLocale } from 'yup';

setLocale({
  string: {
    url: 'errUrl',
  },
});

export default {
  translation: {
    appName: 'RSS агрегатор',
    rssForm: {
      inputPlaceholder: 'Ссылка RSS',
      finished: 'RSS успешно загружен',
      sending: 'Запрос отправляется',
      sent: 'RSS загружается',
      error: {
        invalid: 'Ресурс не содержит валидный RSS',
        duplicate: 'RSS уже существует',
        errUrl: 'Ссылка должна быть валидным URL',
        'Network Error': 'Ошибка сети',
      },
    },
    lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
    example: 'Пример: https://ru.hexlet.io/lessons.rss',
    feeds: 'Фиды',
    postList: 'Посты',
    readBtn: 'Просмотр',
  },
};
