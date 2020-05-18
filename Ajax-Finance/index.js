"use strict";

const key = "CQB6JNQ90AXL7MEF";

$(document).ready(function ()
{
    //Puntatori a controlli HTML e variabili globali
    let _btnLogin = $("#btnLogin");
    let _btnLogout = $("#btnLogout");
    let _lst = $("#lstCompanies");
    let _lstChart = $("#cmbSelectForChart");
    let _thead = $("#tablethead");
    let _tbody = $("#tabletbody");
    let _lblDriveFile = $("#lblDriveFile");
    let _driveFile = $("#driveFile");
    let _uploadFile = $("#uploadFile");
    let _divSuccess = $("#divSuccess");
    let _divWarning = $("#divWarning");
    let _divDanger = $("#divDanger");
    let ctx, chart;
    let headvet = ["Symbol", "Open", "High", "Low", "Price", "Volume", "Latest trading day", "Previous close", "Change", "Change percent"];

    //Dati necessari per l'utilizzo di Google Drive
    const clientSecret = keys["web"]["client_secret"];
    let redirectUri = keys["web"]["redirect_uris"][0];
    let scope = "https://www.googleapis.com/auth/drive";
    let clientId = keys["web"]["client_id"];
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    disabilitaControlli();

    //Controllo parametri in Local storage
    if ((code) && (!localStorage.getItem("accessToken")))
    {
        setTokenInLS(clientId, clientSecret, redirectUri, scope, code);
    }
    else if ((code) || (localStorage.getItem("accessToken")))
    {
        _lblDriveFile.html("Choose your file");
        _driveFile.prop("disabled", "");
        _uploadFile.css({
            "visibility": "visible"
        });
        _btnLogin.prop("disabled", "disabled");
        _btnLogin.removeClass("btn-success");

    }
    else
    {
        _lblDriveFile.html("YOU HAVE TO LOG IN FIRST");
        _lblDriveFile.css({
            "color": "rgb(255, 0, 0)"
        });
        _driveFile.prop("disabled", "disabled");
        _uploadFile.css({
            "visibility": "hidden"
        });
        _btnLogin.prop("disabled", "");
        _btnLogin.addClass("btn-success");
        _btnLogout.prop("disabled", "disabled");
        _btnLogout.removeClass("btn-danger");
    }

    /*****************************   INTESTAZIONE TABELLA   *******************************************/
    let _headrow = $("<tr>");
    for (let i = 0; i < 10; i++)
    {
        let _headcell = $("<th>");
        _headcell.html(headvet[i]);
        _headcell.appendTo(_headrow);
    }
    _headrow.appendTo(_thead);

    _lst.prop("selectedIndex", "0");

    /*****************************   COMBOBOX   *******************************************/
    _lst.on("change", function ()
    {
        if ($(this).val() != "null")
        {
            getGlobalQuotes($(this).val());
        }
        else
        {
            alert("Selezionare un'azienda");
        }
    });

    function getGlobalQuotes(symbol)
    {
        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + key;
        let vet = ["01. symbol", "02. open", "03. high", "04. low", "05. price", "06. volume", "07. latest trading day", "08. previous close", "09. change", "10. change percent"];
        $.getJSON(url, function (data)
        {
            let globalQuoteData = data["Global Quote"];
            let _tr = $("<tr>");
            for (let i = 0; i < 10; i++)
            {
                $("<td>").html(globalQuoteData[vet[i]]).appendTo(_tr);
            }
            _tr.appendTo(_tbody);
        });
    }

    /*****************************   TEXTBOX DI RICERCA   *******************************************/
    $("body").on("keyup", "input", function ()
    {
        showHints($(this).val());
    });

    /*****************************   RICERCA INCREMENTALE   *******************************************/
    function showHints(str)
    {
        if (str.length >= 2)
        {
            _tbody.html("");
            let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + str + "&apikey=" + key;
            $.getJSON(url, function (data)
            {
                for (let i = 0; ((i < data["bestMatches"].length) && (i < 3)); i++)
                {
                    let symbolSearch = data["bestMatches"][i]["1. symbol"];
                    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbolSearch + "&apikey=" + key;
                    let r = $.ajax(url);
                    r.done(function (data)
                    {
                        let _tr = $("<tr>");

                        $("<td>").html(data["Global Quote"]["01. symbol"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["02. open"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["03. high"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["04. low"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["05. price"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["06. volume"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["07. lastest trading day"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["08. previous close"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["09. change"]).appendTo(_tr);
                        $("<td>").html(data["Global Quote"]["10. change percent"]).appendTo(_tr);

                        _tr.appendTo(_tbody);
                    })
                    r.fail(function (data)
                    {
                        console.log("nok");
                    })
                }
            });
        }
    }

    /*****************************   GOOGLE DRIVE   *******************************************/
    let path;

    _btnLogin.on("click", function ()
    {
        signIn(clientId, clientSecret, redirectUri, scope, code);
    });

    _btnLogout.on("click", function ()
    {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expires_in");
        setTimeout(function ()
        {

        }, 1500);
        window.location = "index.html";
    });

    //Scegli il file da caricare
    _driveFile.on("change", function ()
    {
        path = $(this).val();
        if (path)
        {
            let filename = path.split("\\").pop();
            $("label[for=driveFile]").text(filename);
        }
    });

    //Carica il file su Drive
    _uploadFile.on("click", function ()
    {
        if (_driveFile.val() != "")
        {
            let file = $("#driveFile")[0].files[0];
            let upload = new Upload(file).doUpload();
            upload.done(function (data)
            {
                _divSuccess.css({
                    "display": "block"
                });
                setTimeout(function ()
                {
                    _divSuccess.fadeOut(2500);
                }, 2000);
                $("label[for=driveFile]").text("Choose your file");
                path = null;
                $("#driveFile").val("");
            });
            upload.fail(function ()
            {
                _divDanger.css({
                    "display": "block"
                });
                setTimeout(function ()
                {
                    _divDanger.fadeOut(3000);
                }, 2000);
            });
        }
        else
        {
            _divWarning.css({
                "display": "block"
            });
            setTimeout(function ()
            {
                _divWarning.fadeOut(2500);
            }, 2000);
        }
    });

    /*****************************   GRAFICO   *******************************************/
    //Richiedi dati
    _lstChart.on("change", function (data)
    {
        let datasector = inviaRichiesta("GET", "http://localhost:3000/SECTOR");
        datasector.done(function (data)
        {
            if (!ctx)
            {
                ctx = creaGrafico("http://localhost:3000/chart");
            }
            modifica(ctx, data[_lstChart.val()]);
        });
    });

    //Scarica l'immagine del grafico
    document.getElementById("download").addEventListener('click', function ()
    {
        let url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        let a = document.getElementById("download");
        a.href = url_base64jp;
    });

    //Crea grafico
    function creaGrafico(dataChart)
    {
        let _data = inviaRichiesta("GET", dataChart, {}, false);
        _data.done(function (data)
        {
            return data;
        });
        chart = new Chart($("#myChart"), JSON.parse(_data.responseText));
        return chart;
    }

    //Inserisci i dati nel grafico
    function modifica(chart, contenuto)
    {
        let dataChart = chart["data"];
        dataChart["labels"] = [];
        let dataset = dataChart["datasets"][0];
        dataset["data"] = [];
        for (let chiave in contenuto)
        {
            dataChart["labels"].push(chiave);
            dataset["data"].push(contenuto[chiave].replace("%", ""));
            dataset["backgroundColor"].push("rgb(255, 0, 0)");
            dataset["borderColor"].push("rgb(255, 0, 0)");
        }
        chart.update();
    }

    /*****************************   FUNZIONI GENERICHE   *******************************************/

    function disabilitaControlli()
    {
        _divSuccess.css({
            "display": "none"
        });
        _divWarning.css({
            "display": "none"
        });
        _divDanger.css({
            "display": "none"
        });
        _btnLogin.prop("disabled", "disabled");
        _btnLogin.removeClass("btn-success");
    }
});
