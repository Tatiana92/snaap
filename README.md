## Softgrad.Starter ##

**Шаблон проекта для быстрого старта.**

## Плагины ##

### Основные: ###
1. `gulp-uglify` - Для сжатия JS кода.
1. `gulp-sass` - Для компиляции SASS кода.
1. `gulp-sourcemaps` - Для генерации CSS и JS sourscemaps, которые помогают при отладке кода.
1. `gulp-rigger` - Позволяет импортировать один файл в другой.
1. `gulp-minify-css` - Для сжатия CSS кода.
1. `gulp-imagemin` - Для сжатия картинок.
1. `imagemin-pngquant` - Дополнения к предыдущему плагину, для работы с PNG.
1. `browser-sync` - С помощью этого плагина мы можем легко развернуть локальный dev сервер с блэкджеком и livereload, а так же с его помощью мы сможем сделать тунель на наш localhost, что бы легко демонстрировать верстку заказчику.
1. [`gulp-postcss`](https://github.com/postcss/postcss) - Постпроцессор для CSS.
1. [`autoprefixer`](https://github.com/postcss/autoprefixer) - Автоматически добавляет вендорные префиксы к CSS свойствам.
1. [`postcss-sprites`](https://github.com/2createStudio/postcss-sprites) - Генерирует спрайты из стилей.
1. [`postcss-assets`](https://github.com/borodean/postcss-assets) - Встраивает файлы в код и получает их размеры.

### Служебные: ###
1. `gulp-if` - Условия для запуска тасков.
1. `yargs` - Разбирает аргументы в командной строке.
1. `path` - Этот модуль содержит утилиты для обработки и преобразования пути к файлу.
1. `gulp-watch` - Для автоматической пересборки файлов сразу после их сохранения.
1. `rimraf` - rm -rf для ноды

## Старт проекта ##

* Склонируй репозиторий и перейди в папку проекта.

* Установи Gulp глобально:
```
npm install -g gulp
```

* Установи зависимости:
```
npm install
```

* Запусти Gulp:
```
gulp
```

* Открой в браузере [`http://localhost:9000/`](http://localhost:9000/).

## Команды ##

* Собирает проект в папку `build`, не включая локальный сервер:
```
gulp build
```

* Собирает проект для продакшена, минифиуируя js и css. В таске отключены запуск локального сервера и создание sourscemaps:
```
gulp --production
```

* Удаление папки `build`:
```
gulp clean
```

## Импорт файлов ##

Плагин gulp-rigger позволяет импортировать один файл в другой простой конструкцией
```
//= templates/footer.html
```
и эта строка при компиляции будет заменена на содержимое файла `footer.html`, который находится в дирректории `templates`.

## Спрайты ##

Для создания простого спрайта из изображений нужно использовать миксин
```
+s(name)
```
Следующий миксин для спрайта под ретину. Для него необходимо использовать 2 изображения: простое и в 2 раза больше. Например: `sp.png` и `sp@2x.png`.
```
+sr(name)
```

Изображения, которые собираются в спрайт, должны быть в формате `.png` и находится в дирректории `media/img/sprites/`.

## Инлайн картинок или SVG ##

Плагин postcss-assets позволяет инлайнить изображения прямо в код:
```
background: inline('sp.png')
```
Так же позволяет подставить размеры картинки:
```
width: width('sp.png')
```
```
height: height('sp.png')
```
```
background-size: size('sp.png')
```
Изображения, которые инлайнятся, должны находится в дирректории `media/img/`.

