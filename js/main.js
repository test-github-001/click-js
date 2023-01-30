'use strict';

// НАСТРОЙКИ ИГРЫ
const GAME_NAME = 'КлИкЕр!'; /* название игры */
const GAME_TIME = 30;  /* время игры (в секундах) */
const TARGET_BLOCK_SIDE = 120; /* стороны блока (в пикселях) */
const TARGET_AWAIT_START_TIME = 2; /* начальная скорость изменения положения блока (в секундах) */
const TARGET_AWAIT_RANGE = 1.1; /* коэффициент уменьшения времени для смены положения при поподании */

/* начисление очков за поподание */
const START_SCORES = 100;
const SCORES_RANGE = 1.2;
let scoresSize;

// очки и рекорд при старте игры
let bestResult = 0;
let scores = 0;

/////////////////////////////////////

// ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ СТРАНИЦЫ

// блок для клика
const divTarget = document.getElementById('click-target');
divTarget.onclick = getTargetClick;

// блок, указывающий число полученных очков, при клике по цели
const divGetScores = document.getElementById('get-scores');
const divGetScoresSpan = divGetScores.querySelector('span');

// верхняя понель с информацией о текущей игре (очки, таймер, рекорд)
const divGameInfo = document.getElementById('game-info');
const infoScoresSpan = document.getElementById('info-scores').querySelector('span');
const infoTimerSpan = document.getElementById('info-timer').querySelector('span');
const infoBestResultSpan = document.getElementById('info-best-result').querySelector('span');

// блок с описанием игры, при клике - запускает игру
const divStartMenu = document.getElementById('start-menu');
divStartMenu.onclick = startGame;
const titleStartMenuSpan = divStartMenu.querySelector('h1').querySelector('span');
const descriptionStartMenuSpan = divStartMenu.querySelector('p').querySelector('span');
const bestScoreStartMenuSpan = divStartMenu.querySelector('h2').querySelector('span');

// обновление информации в блоке с описанием игры при загрузке страницы
titleStartMenuSpan.innerHTML = GAME_NAME;
descriptionStartMenuSpan.innerHTML = GAME_TIME;
bestScoreStartMenuSpan.innerHTML = bestResult;

// обновление информации в верхней игровой понели при загрузке страницы
infoScoresSpan.innerHTML = scores;
infoTimerSpan.innerHTML = GAME_TIME;
infoBestResultSpan.innerHTML = bestResult;

// определение размеров игровой области экрана
const sidePaddings = 20; /* отступ от края окна и игровой информации (в пикселях) */
const gameInfoHeight =  Math.ceil( divGameInfo.clientHeight ) + sidePaddings * 2;
const gameWidth = innerWidth - sidePaddings * 2;
const gameHeight = innerHeight - gameInfoHeight  - sidePaddings;

// определяем и задаем размеры блоку для кликов
let targetSide;
if ( gameHeight < gameWidth ) {
    targetSide = ( TARGET_BLOCK_SIDE < gameHeight ) ? TARGET_BLOCK_SIDE : gameHeight;
} else {
    targetSide = ( TARGET_BLOCK_SIDE < gameWidth ) ? TARGET_BLOCK_SIDE : gameWidth;
}
divTarget.style.width = targetSide + 'px';
divTarget.style.height = targetSide + 'px';

// определение максимального числа блоков для кликов по ширине и высоте игровой облости
const targetSidesInWidth = Math.floor( gameWidth / targetSide );
const targetSidesInHeight = Math.floor( gameHeight / targetSide );

// считаем отступы сверху и слева, что бы игровая область была в центре окна
const gameOffsetX = Math.floor( ( innerWidth - targetSidesInWidth * targetSide ) / 2 );
const gameOffsetY = Math.floor( ( gameHeight - targetSidesInHeight * targetSide ) / 2 ) + gameInfoHeight;

// переменные таймеров и интервалов
let gameTime, timeoutTime, gameInterval;

// ФУНКЦИИ

// получение случайной X и Y координаты
const getRandomPointX = () => gameOffsetX + Math.floor( Math.random() * targetSidesInWidth ) * targetSide;
const getRandomPointY = () => gameOffsetY + Math.floor( Math.random() * targetSidesInHeight ) * targetSide;

// старт игры
function startGame() {
    /* ВАШ КОД */
    /* скрыть стартовое игровое меню <div id="start-menu"> и изменить свойство display на inline-block для <div id="get-scores"> */
    divStartMenu.style.display = 'none';
    divGetScores.style.display = 'inline-block';
    /* ------- */

    scores = 0;
    scoresSize = START_SCORES;
    infoScoresSpan.innerHTML = scores;
    gameTime = GAME_TIME;
    infoTimerSpan.innerHTML = gameTime;
    timeoutTime = TARGET_AWAIT_START_TIME * 1000;

    /* ВАШ КОД */
    /* задать свойство display block для <div id="click-target">; свойствам left и top задать случайные X и Y координаты */
    divTarget.style.display = 'block';
    divTarget.style.left = getRandomPointX() + 'px';
    divTarget.style.top = getRandomPointY() + 'px';
    /* ------- */

    setTimeout( gameClock, 1000 );
    updateTimeout( timeoutTime );
}

// обновление интервала
function updateTimeout( timeOut ) {
    /* ВАШ КОД */
    /* сбросте интервал gameInterval */
    clearInterval( gameInterval );
    /* ------- */

    gameInterval = setInterval( () => {
        /* ВАШ КОД */
        /* задать свойство display block для <div id="click-target">; свойствам left и top задать случайные X и Y координаты */
        divTarget.style.left = getRandomPointX() + 'px';
        divTarget.style.top = getRandomPointY() + 'px';
        /* ------- */
    }, timeOut );
}

// клик по целе
function getTargetClick() {
    /* ВАШ КОД */
    /* задать свойство display block для <div id="click-target">; свойствам left и top задать случайные X и Y координаты */
    divTarget.style.left = getRandomPointX() + 'px';
    divTarget.style.top = getRandomPointY() + 'px';
    /* ------- */

    timeoutTime = timeoutTime / TARGET_AWAIT_RANGE;
    updateTimeout( timeoutTime );

    scores += scoresSize;
    infoScoresSpan.innerHTML = scores;

    divGetScoresSpan.innerHTML = scoresSize;
    divGetScores.classList.remove('show');
    setTimeout( () => divGetScores.classList.add('show'), 0 );
    scoresSize = Math.round( scoresSize * SCORES_RANGE );
}

// обновление игрового таймера
function gameClock() {
    gameTime--;

    /* ВАШ КОД */
    /* обновите данные в игровом таймере <div id="info-timer"> */
    infoTimerSpan.innerHTML = gameTime;
    /* ------- */

    if (gameTime > 0) setTimeout( gameClock, 1000 );
    else gameEnd();
}

// завершение игры
function gameEnd() {
    /* ВАШ КОД */
    /* сбросте интервал gameInterval */
    clearInterval( gameInterval );
    /* ------- */

    /* ВАШ КОД */
    /* задать свойство display none для <div id="click-target"> */
    divTarget.style.display = 'none';
    /* ------- */

    if (scores > bestResult) bestResult = scores;

    /* ВАШ КОД */
    /* обновите данные об игре в тегах <div id="info-timer">, <div id="info-best-result">,
    а также в тексте рекорда стартового игрового меню <div id="start-menu"><h2>РЕКОРД: <span></span></h2></div>*/
    infoTimerSpan.innerHTML = gameTime;
    infoBestResultSpan.innerHTML = bestResult;
    bestScoreStartMenuSpan.innerHTML = bestResult;
    /* ------- */

    setTimeout( () => {
        /* ВАШ КОД */
        /* для блока <div id="get-scores"> удалить класс show и скрыть блок;
        показать стартовое игровое меню <div id="start-menu"> (display block) */
        divGetScores.classList.remove('show');
        divGetScores.style.display = 'none';
        divStartMenu.style.display = 'block';
        /* ------- */
    }, 1500 );
}