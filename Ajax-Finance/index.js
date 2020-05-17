$(document).ready(function ()
{
    let _lst=$("#lstCompanies");
    let _lstChart=$("#cmbSelectForChart");
    let _txtSearch=$("#txtSearch");
    let _tableQuotes=$("#tableQuotes");
    let ctx;
    let chart;

    //Dati necessari per l'utilizzo di Google Drive
    const clientSecret = keys["web"]["client_secret"];
    let redirectUri = keys["web"]["redirect_uris"][0];
    let scope = "https://www.googleapis.com/auth/drive";
    let clientId = keys["web"]["client_id"];
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if(localStorage.getItem("flag")!=null)
    {
        setTokenInLS(clientId, clientSecret, redirectUri, scope, code);
    }

    $("body").on("keyup","input",function ()
    {
        showHints($(this).val());
    });

    _lst.prop("selectedIndex","0");

    /*****************************VISUALIZZAZIONE DATI AZIENDA SELEZIONATA*******************************************/
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

    /*****************************RICERCA INCREMENTALE*******************************************/
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

    /*****************************GOOGLE DRIVE*******************************************/
    let path;

    //Choose file to upload
    $("#driveFile").on("change",function ()
    {
        path=$(this).val();
        if (path)
        {
            let filename=path.split("\\").pop();
            $("label[for=driveFile]").text(filename);
        }
    });

    //Upload file
    $("#uploadFile").on("click",function ()
    {
        if(localStorage.getItem("accessToken")==null)
        {
            signIn(clientId, clientSecret, redirectUri, scope, code);
        }
        else
        {
            if($("#driveFile").val()!="")
            {
                let file = $("#driveFile")[0].files[0];
                let upload = new Upload(file).doUpload();
                upload.done(function (data)
                {
                    alert("Caricamento su Google Drive effettuato correttamente");
                    $("label[for=driveFile]").text("Choose your file");
                    path=null;
                    $("#driveFile").val("");
                });
                upload.fail(function ()
                {
                    alert("Errore nel caricamento");
                });
            }
            else
            {
                alert("You've to select a file first");
            }

        }
    });

    /*****************************GRAFICO*******************************************/
    //Require data
    _lstChart.on("change", function (data)
    {
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

    //Download Chart Image
    document.getElementById("download").addEventListener('click', function()
    {
        let url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        let a =  document.getElementById("download");
        a.href = url_base64jp;
    });

    //Create chart
    function creaGrafico(dataChart)
    {
        let _data = inviaRichiesta("GET", dataChart,{},false);
        _data.done(function (data)
        {
            return data;
        });
        chart=new Chart($("#myChart"),JSON.parse(_data.responseText));
        return chart;
    }

    //Put data in chart
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
});


    function getGlobalQuotes(symbol)
    {
        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=CQB6JNQ90AXL7MEF";
        $.getJSON(url,
            function (data) {
                $("#symbol").text(data["Global Quote"]["01. symbol"]);
                let globalQuoteData = data["Global Quote"];
                $("#open").text(globalQuoteData["02. open"]);
                $("#high").text(globalQuoteData["03. high"]);
                $("#low").text(globalQuoteData["04. low"]);
                $("#price").text(globalQuoteData["05. price"]);
                $("#volume").text(globalQuoteData["06. volume"]);
                $("#latestTradingDay").text(globalQuoteData["07. latest trading day"]);
                $("#previousClose").text(globalQuoteData["08. previous close"]);
                $("#change").text(globalQuoteData["09. change"]);
                $("#changePercent").text(globalQuoteData["10. change percent"]);
            }
        );
    }
