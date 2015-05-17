Цель
Построить приложение на модульной архитектуре. В качестве базиса выступает умение создавать простые многоконтроллерные приложения на angular. Для данного функционала, возможно, архитектура будет слишком сложна и неадекватна, но целью задачи является «создание архитектуры», а не «адекватность архитектуры».
Юзер стори
Все юзер стори полностью повторяют стори из задачи первого уровня.
Основные тезисы архитектуры
API и хранилище http запросов оформить в стороннем сервисе;
API-сервис может брать данные из локальной переменной, localstorage или внешнего API-сервера в интернете;
Хранение данных полученных через API-сервисы обеспечить не в контроллере;
Хранилище не должно знать «как взять данные» и «где они хранятся». Оно просто должно вызывать метод и откуда-то брать эти данные;
Кэширование данных и бизнес-логику хранить отдельно от хранилища (о которм речь шла выше) и API-сервиса. Оно должно быть внешним настолько, чтобы можно было его выключить или заменить на любую другую и при этом не пришлось переписывать хранилище и API-сервис;
Взаимодействие кнопок с данными описать в контроллере;
Весь код проекта должен быть выполнен по стайл-гайду.
