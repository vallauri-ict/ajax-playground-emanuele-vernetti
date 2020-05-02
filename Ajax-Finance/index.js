$(document).ready(function ()
{
    let _lst=$("#lstCompanies");
    let _lstChart=$("#cmbSelectForChart");
    let _txtSearch=$("#txtSearch");
    let _tableQuotes=$("#tableQuotes");
    let ctx;
    
    $("body").on("keyup","input",function ()
    {
        showHints($(this).val());
    });
    _lst.prop("selectedIndex","0");
    _lst.on("change",function ()
    {
        if($(this).val()!="null")
        {
            getGlobalQuotes($(this).val());
        }
        else
        {
            alert("Selezionare un'azienda");
        }
    });

    _lstChart.on("change", function (data)
    {
        alert(_lstChart.val());
        let datasector=inviaRichiesta("GET","http://localhost:3000/SECTOR");
        datasector.done(function (data)
        {
            if(!ctx)
            {
                ctx=creaGrafico("http://localhost:3000/chart");
            }
            modifica(ctx, data[_lstChart.val()]);
        });
    });

    function inviaRichiesta(method, url, parameters = "",async=true)
    {
        return $.ajax({
            type: method,
            url: url,
            data: parameters,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: "json",
            timeout: 5000,
            async:async
        });
    }

    function modifica(chart, contenuto)
    {
        let dataChart=chart["data"];
        dataChart["labels"]=[];
        let dataset=dataChart["datasets"][0];
        dataset["data"]=[];
        for (let chiave in contenuto)
        {
            dataChart["labels"].push(chiave);
            dataset["data"].push(contenuto[chiave].replace("%", ""));
            dataset["backgroundColor"].push("rgb(255, 0, 0)");
            dataset["borderColor"].push("rgb(255, 0, 0)");
        }
        chart.update();
    }

    function showHints(str)
    {
        if(str.length>=2)
        {
            _tableQuotes.html("");
            let url="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+str+"&apikey=CQB6JNQ90AXL7MEF";
            $.getJSON(url,
                function (data)
                {
                    for(let i=0;i<data["bestMatches"].length;i++)
                    {
                        let symbolSearch = data["bestMatches"][0]["1. symbol"];
                        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbolSearch + "&apikey=CQB6JNQ90AXL7MEF";
                        $.getJSON(url, function (data)
                        {
                            //Caricamento dei dati nella tabella

                            //Codice rimosso a causa del limite delle chiamate imposto da AlphaVantage
                        });
                    }
                }
            );
        }
    }

    function creaGrafico(dataChart)
    {
        let _data = inviaRichiesta("GET", dataChart,{},false);
        _data.done(function (data)
        {
            return data;
        });
        let chart=new Chart($("#myChart"),JSON.parse(_data.responseText));
        return chart;
    }


});

function getGlobalQuotes(symbol) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=CQB6JNQ90AXL7MEF";
    $.getJSON(url,
        function (data) {
            $("#symbol").text(data["Global Quote"]["01. symbol"]);
            let globalQuoteData = data["Global Quote"];
            $("#previousClose").text(globalQuoteData["08. previous close"]);
            $("#open").text(globalQuoteData["02. open"]);
            $("#lastTrade").text(globalQuoteData["05. price"]);
            $("#lastTradeTime").text(globalQuoteData["07. latest trading day"]);
            $("#change").text(globalQuoteData["09. change"]);
            $("#daysLow").text(globalQuoteData["04. low"]);
            $("#daysHigh").text(globalQuoteData["03. high"]);
            $("#volume").text(globalQuoteData["06. volume"]);
        }
    );
}
