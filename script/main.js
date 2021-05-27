let img1 = ['url(https://raw.githubusercontent.com/ArtiomB5/5MemoryGameBeginnersJSProject/main/img/bg.png) repeat', 'url(https://raw.githubusercontent.com/ArtiomB5/5MemoryGameBeginnersJSProject/main/img/icons.jpg) -25px -20px no-repeat', '650px auto'];
let img2 = ['url(https://raw.githubusercontent.com/ArtiomB5/5MemoryGameBeginnersJSProject/main/img/bg.png) repeat', 'url(https://raw.githubusercontent.com/ArtiomB5/5MemoryGameBeginnersJSProject/main/img/icons.jpg) -255px -20px no-repeat', '650px auto'];
let img3 = ['url(https://raw.githubusercontent.com/ArtiomB5/5MemoryGameBeginnersJSProject/main/img/bg.png) repeat', 'url(https://raw.githubusercontent.com/ArtiomB5/5MemoryGameBeginnersJSProject/main/img/icons.jpg) -25px -265px no-repeat', '650px auto'];
//параметры изображений

let scoreCounter = 0;
//cчетчик совпадений
let failedAttemptsCounter = 0;
//счетчик неудачных попыток

let cell1 = document.getElementById('c1');
let cell2 = document.getElementById('c2');
let cell3 = document.getElementById('c3');
let cell4 = document.getElementById('c4');
let cell5 = document.getElementById('c5');
let cell6 = document.getElementById('c6');
//обращение к ячейкам

let styleCells = [cell1, cell2, cell3, cell4, cell5, cell6];
//массив ячеек

var cell_imgDictionary = new Map();
//словарь ID-параметры фона

//генератор случайных чисел от 0 до 5
function randomNumber(MAX) {
    let randomIndex = Math.floor(Math.random() * MAX);
    return randomIndex;
}

//заполнение полей парами картинок в случайном порядке
function randomImgsForCells() {
    let imgs = [img1, img2, img3, img1, img2, img3];
    //массив фонов

    //цикл перебирающий массив ячеек
    for (let index = 0; index < styleCells.length; index++) {

        let element = styleCells[index];
        //получение одной ячейки из массива ячеек

        let randomImgIndex = randomNumber(imgs.length - 1);
        //генерация случайного индекса для получения случайного фона из массива

        cell_imgDictionary.set('c' + (index + 1), imgs[randomImgIndex]);
        //заполнения словаря ID - "фон"

        element.style.background = imgs[randomImgIndex][0];
        element.style.backgroundSize = imgs[randomImgIndex][2];
        //установка фонового изображения и размера фонового изображения для ячейки

        imgs.splice(randomImgIndex, 1);
        //удаление "использованного фона" из массива
    }
}

window.onload = function () {
    randomImgsForCells()
};
//запуск функции заполняющей поля игры

let clicks = [];
//массив для хранения данных кажатых ячеек

//обработка нажатий ячеек
cell1.addEventListener('click', function () {
    textFunc(cell1)
});
cell2.addEventListener('click', function () {
    textFunc(cell2)
});
cell3.addEventListener('click', function () {
    textFunc(cell3)
});
cell4.addEventListener('click', function () {
    textFunc(cell4)
});
cell5.addEventListener('click', function () {
    textFunc(cell5)
});
cell6.addEventListener('click', function () {
    textFunc(cell6)
});

//функция заполняющая массив clicks данными нажатых ячеек и вызов функции для обработки массива clicks
function textFunc(param) {
    let clickStyleData = param.style.background;
    let clickId = param.id;
    let click = [clickStyleData, clickId];
    clicks.push(click);
    clicksCompare(clicks);
}

//функция обработки нажатий по ячейкам
function clicksCompare(paramArray) {

    //обработка нажатия по одной ячейке
    if (paramArray.length === 1) {
        if (document.getElementById(paramArray[0][1]).style.background != '') {
            document.getElementById(paramArray[0][1]).style.background = newBg(paramArray[0][1])[1];
            document.getElementById(paramArray[0][1]).style.backgroundSize = newBg(paramArray[0][1])[2];
            //отображение первой нажатой ячейки
        }
    };

    //обработка случая, когда последовательно нажали 2 ячейки
    if (paramArray.length === 2) {

        //обработка последоватлеьного нажатия на две разные ячейки, содержимое которых
        if ((document.getElementById(paramArray[0][1]).style.background != '' && document.getElementById(paramArray[1][1]).style.background != '') && (paramArray[0][1] != paramArray[1][1])) {
            document.getElementById(paramArray[1][1]).style.background = newBg(paramArray[1][1])[1];
            document.getElementById(paramArray[1][1]).style.backgroundSize = newBg(paramArray[1][1])[2];
            //отображение второй нажатой ячейки

            //сравнение содержимого 2х нажатых ячеек
            function clicksMatch() {
                if (document.getElementById(paramArray[0][1]).style.background === document.getElementById(paramArray[1][1]).style.background) {
                    alert('Match!');
                    document.getElementById(paramArray[0][1]).style.background = ''
                    document.getElementById(paramArray[1][1]).style.background = '';
                    clicks = [];
                    scoreCounter++;
                    document.getElementById('score').innerHTML = "Score: " + scoreCounter;
                } else {
                    //обработка случая, ессли "содержимое" ячеек не совпадает
                    alert('No match!');
                    document.getElementById(paramArray[0][1]).style.background = newBg(paramArray[0][1])[0];
                    document.getElementById(paramArray[1][1]).style.background = newBg(paramArray[1][1])[0];
                    clicks = [];
                    failedAttemptsCounter++;
                    document.getElementById('failedAttempts').innerHTML = "Failed Attempts: " + failedAttemptsCounter;
                }
            }

            //установка задержки, перед вызовом функции обрабатывающейсодержимого 2х ячеек
            setTimeout(clicksMatch, 500);
        }

        //обработка двойного нажатия на одну ячейку
        if ((document.getElementById(paramArray[0][1]).style.background != '' && document.getElementById(paramArray[1][1]).style.background != '') && (paramArray[0][1] === paramArray[1][1])) {
            document.getElementById(paramArray[0][1]).style.background = newBg(paramArray[0][1])[0];
            document.getElementById(paramArray[1][1]).style.background = newBg(paramArray[1][1])[0];
            clicks = [];
        }
        clicks = [];
    };
}

//функция посика стиля фона по ID
function newBg(param) {
    return cell_imgDictionary.get(param);
}
