window.onload = function() {
    jsonSearch();
    renderDiagrams();
    renderHistograms();
}

function renderDiagrams() {
    var usual = 5;
    var recommended = 11;
    add_chart(usual, recommended, "day");
    add_chart(usual, recommended, "week");
    add_chart(usual, recommended, "month");
}

function add_chart(usual, recommended, canvasTagsId) {
    var drawingCanvas = document.getElementById(canvasTagsId);
    if (drawingCanvas && drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');
        // рисуем окружность
        context.fillStyle = "#1a2a34";
        context.strokeStyle = "#ddd";
        context.beginPath();
        context.arc(50, 50, 50, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        // рисуем сектор окружности usual%
        context.fillStyle = "#fff";
        context.beginPath();
        context.moveTo(50, 50);
        var start = Math.PI;
        var afterStart = start + (Math.PI / 180) * usual * 360 / 100;
        context.arc(50, 50, 50, start, afterStart, false);
        context.closePath();
        context.fill();

        // рисуем сектор окружности recommended%
        context.fillStyle = "#00aeef";
        context.beginPath();
        context.moveTo(50, 50);
        start = afterStart;
        afterStart = start + (Math.PI / 180) * recommended * 360 / 100;
        context.arc(50, 50, 50, start, afterStart, false);
        context.closePath();
        context.fill();

        // закрашиваем внутреннюю окружность меньшего радиуса
        context.fillStyle = "#203541";
        context.beginPath();
        context.arc(50, 50, 33, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        // пишем текст
        context.fillStyle = "#fff";
        context.font = "12pt Myriad Pro";
        context.textAlign = "center";
        context.textBaseline = 'middle';
        context.fillText("ЗА", 50, 40);
        var text;
        switch (canvasTagsId){
            case "day":
                text = "ДЕНЬ";
                break;
            case "week":
                text = "НЕДЕЛЮ";
                break;
            case "month":
                text = "МЕСЯЦ";
                break;
        }
        context.fillText(text, 50, 60);

    }
}

function renderHistograms(){
    var usual = 11;
    var recommended = 15;
    var date = "10 апр";
    createHistogramElem(usual+35, recommended+45,date, "day"+ 1);
    createHistogramElem(usual+35, recommended+83,date, "day"+ 2);
    createHistogramElem(usual+134, recommended+23,date, "day"+ 3);
    createHistogramElem(usual+54, recommended+111,date, "day"+ 4);
    createHistogramElem(usual+35, recommended+83,date, "day"+ 5);
    createHistogramElem(usual+54, recommended+73,date, "day"+ 6);
    createHistogramElem(usual+31, recommended+33,date, "day"+ 7);
    createHistogramElem(usual+68, recommended+54,date, "day"+ 8, true);
    createHistogramElem(usual+33, recommended,date, "day"+ 9);
    createHistogramElem(usual+73, recommended+54,date, "day"+ 10);
    createHistogramElem(usual+83, recommended,date, "day"+ 11);
    createHistogramElem(usual+111, recommended+134,date, "day"+ 12);
    createHistogramElem(usual+23, recommended+35,date, "day"+ 13);
    createHistogramElem(usual+83, recommended+54,date, "day"+ 14);
}

function createHistogramElem(usual,recommended,date, day, selected){
    var histogramsBottom = document.getElementById("histograms-bottom");

    // Основной блок элемента
    var div = document.createElement("div");
    div.classList.add("histogramElem-box");
    if (selected){div.classList.add("histogramElem-box-selected");}


    // Вывод элемента гистограммы
    var innerDivTop = document.createElement("div");
    innerDivTop.classList.add("histogramElem-box-top");
    innerDivTop.innerHTML = "<canvas id='"+day+"' height='190px' width = '30px'></canvas>";

    div.appendChild(innerDivTop);
    // Вывод даты:
    var innerDivBottom = document.createElement("div");
    innerDivBottom.classList.add("histogramElem-box-bottom");
    innerDivBottom.innerHTML = date;
    div.appendChild(innerDivBottom);
    histogramsBottom.appendChild(div);

    // Рисуем в созданном канвасе
    var innerCanvas = document.getElementById(day);
    if (innerCanvas.getContext) {
        var context = innerCanvas.getContext('2d');

        context.fillStyle = "#fff";
        context.fillRect(9, usual,5, 190);

        context.fillStyle = "#00aeef";
        context.fillRect(17, recommended,5, 190);
    }
}

function jsonSearch(){
    $.getJSON('./data.json', function(data) {console.log(data)});

}