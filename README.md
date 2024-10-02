# Search_movie v2
Одностраничное реакт-приложение на тематику кинематографии.
___
[Проект](https://citizenofgreatsiberia.github.io/sm2/) на gh-pages 
___
## Текущий функционал приложения:
* Просмотр списка фильмов по предложенным категориям (фильмы / сериалы)
* Поиск фильмов с учетом фильтров по жанрам
* Добавление фильмов в коллекцию (удаление из коллекции)
* Просмотр информации об отдельном фильме (наименование, постер, рейтинг, описание, дата выхода, интересные факты и ошибки в фильме)
* Просмотр списка похожих фильмов
* Просмотр фильмов без перехода на сторонние стриминговые платформы
* Чтение рецензий зрителей
* Просмотр информации о режиссере, актерах фильма
* Поиск фильмов по ключевым словам
* Поддержака устройств с разными разрешениями экранов
* Поддержка темной и светлой темы оформления
* Ускорен отклик пользовательского интерфейса и существенно снижено количество запросов на сервер по сравнению с предыдущей [версией приложения](https://github.com/citizenofgreatsiberia/search-movie) за счет мемоизации вычислений и кэширования данных, полученных от сервера
*  UI стал минималистичнее и "легче"
___
## При разработке были использованы:
* [React](https://react.dev/)
* [react-router-dom](https://reactrouter.com/en/main)
* [Redux Toolkit, RTK Query](https://redux-toolkit.js.org/)
* [Kinopoisk API Unofficial](https://kinopoiskapiunofficial.tech/)
* [Swiper](https://swiperjs.com/)
* [Vite](https://vitejs.dev/)
* [SASS](https://sass-scss.ru/)

## Обзор ключевых файлов и директорий:

1. **Конфигурационные файлы:**
* `.eslintrc.cjs`: настройки ESLint.
   - `.gitignore`: список игнорируемых файлов для Git.
   - `package.json` и `package-lock.json`: зависимости проекта и скрипты.
   - `vite.config.js`: конфигурация для Vite.

2. **Главные файлы приложения:**
   - `src/App.jsx`: основной компонент приложения.
   - `src/main.jsx`: точка входа приложения.
   - `index.html`: HTML-шаблон для приложения.

3. **Компоненты и стили:**
   - В директории `src/assets/components` находятся различные компоненты, такие как `BackToTop`, `Categories`, `FilmCard`, `SearchForm` и т.д., каждый из которых имеет свой SCSS модуль для стилей.
   - Также имеются компоненты для работы с API, темы и прочие утилиты.

4. **Redux store:**
   - используется Redux Toolkit для управления состоянием.
   - Файлы `categorySlice.js`, `selectedFilmsSlice.js`, `themeSlice.js`, и `store.js`.

6. **Сервисы API:**
   - `kinoboxAPI.js` и `kinopoiskAPI.js` содержат логику для работы с внешними API.

### Обзор ключевых файлов проекта:

1. **App.jsx:**
   - Основной компонент приложения, который содержит глобальные элементы: заголовок, прогресс-бар и кнопку возврата наверх.
   - Использование `useSelector` для управления темой приложения через Redux.
   - При изменении темы (`theme`), компонент обновляет класс корневого элемента (`document.documentElement`), что позволяет управлять стилями в зависимости от выбранной темы.

2. **main.jsx:**
   - Этот файл настраивает приложение, используя библиотеку `react-router-dom` для маршрутизации с помощью `createHashRouter`.
   - Приложение оборачивается в провайдер Redux `Provider`, чтобы обеспечить доступ к глобальному состоянию через `store`.
   - Инициализируется поддержка быстрого клика с помощью `react-fastclick` для улучшения взаимодействия на мобильных устройствах.

3. **store.js:**
   - Настроен глобальный Redux Store с использованием Redux Toolkit.
   - Помимо стандартных редьюсеров для управления темой, категориями и выбранными фильмами, также интегрированы middleware для работы с двумя внешними API: `kinoboxApi` и `kinopoiskApi`.
   - Реализованы кастомные middleware для сохранения темы и выбранных фильмов в LocalStorage, что добавляет пользовательский опыт, позволяя сохранять данные между сессиями.
