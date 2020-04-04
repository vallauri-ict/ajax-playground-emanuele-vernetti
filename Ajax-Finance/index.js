$(document).ready(function ()
{
    let _lst=$("#lstCompanies");
    let _txtSearch=$("#txtSearch");
    let _tableQuotes=$("#tableQuotes");
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

    function showHints(str)
    {
        if(str.length>=2)
        {
            let n=window.document.getElementById("tableQuotes").rows.length;
            for(let i=1;i<=n-1;i++)
            {
                window.document.getElementById("tableQuotes").deleteRow(1);
            }
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
                        });
                    }
                }
            );
        }
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