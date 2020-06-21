[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# BACKEND

https://github.com/eduardpawlow/PromoAppBack

Бэк часть развернута на heroku.com
Адрес админ панели: https://promoappback.herokuapp.com/admin/ Логин/пароль: root

Для создания промокода нужно сначала добавить магазин. Координаты можно получить здесь: https://snipp.ru/tools/address-coord
Далее создать Promocode Template к данному магазину.

Локальное развертывание:
1) Развернуть Django проект локально. (Развертывание показано для Windows)
2) Клонируем репозиторий.
3) Создаем venv: `python -m venv venv`
4) Активируем его: `venv\Scripts\activate.bat`
5) Устанавливаем зависимости: `pip install -r requirements.txt`
6) Делаем миграции: `python manage.py makemigrations` `python manage.py migrate`
7) \Опционально\ Загружаем шаблонные данные: `python manage.py loaddata fixt.json`
8) Запускаем локальный сервер разработки: `python manage.py runserver localhost:80` По умолчанию используется 8000 порт.
9) С помощью ngrok-подобных решений создаем туннель.
10) Добавляем сформированный url в файл  api/index.js на части фронта в константу hostname

# FRONTEND

Если бек стали использовать с heroku.com, то в api/index.js ничего менять не нужно.

1) Клонируем репозиторий
2) Устнавливаем пакеты `npm i` или `yarn`
3) Запускаем проет: `npm start` или `yarn start` 
3) Используя ngrok-подобное решение создаем туннель.
4) Добавляем полученный url в "URL для разработки" в настройках приложения для мобильной версии

Telegram: [https://t.me/eduardpawlow]

# Create VK Mini App [![npm][npm]][npm-url] [![deps][deps]][deps-url]

## How to install

### Create VK Mini App with gh-pages deploy

`npx @vkontakte/create-vk-mini-app <app-directory-name>`

### Create VK Mini App with Zeit deploy

Firstly, you have to create Zeit account and connect it with your GitHub profile — https://zeit.co/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --zeit`

### Create VK Mini App with Surge deploy

Firstly, you have to create Surge account and Surge-domain — https://surge.sh/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --surge <surge-domain>`

## How to start work with app

Go to created folder and run:
`yarn start` || `npm start` — this will start dev server with hot reload on `localhost:10888`.

`yarn run build` || `npm run build` — this will build production bundle, with tree-shaking, uglify and all this modern fancy stuff

[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app
