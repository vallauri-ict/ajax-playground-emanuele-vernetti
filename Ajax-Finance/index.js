"use strict";

const key="0DZM41DI0VGMH1DO";

$(document).ready(function ()
{
    //Puntatori a controlli HTML e variabili globali
    let _lst=$("#lstCompanies");
    let _lstChart=$("#cmbSelectForChart");
    let _thead=$("#tablethead");
    let _tbody=$("#tabletbody");
    let _lblDriveFile=$("#lblDriveFile");
    let _driveFile=$("#driveFile");
    let ctx,chart;
    let headvet=["Symbol","Open","High","Low","Price","Volume","Latest trading day","Previous close","Change","Change percent"];

    //Dati necessari per l'utilizzo di Google Drive
    const clientSecret = keys["web"]["client_secret"];
    let redirectUri = keys["web"]["redirect_uris"][0];
    let scope = "https://www.googleapis.com/auth/drive";
    let clientId = keys["web"]["client_id"];
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if((code)&&(!localStorage.getItem("accessToken")))
    {
        setTokenInLS(clientId, clientSecret, redirectUri, scope, code);
    }
    else if((code)||(localStorage.getItem("accessToken")))
    {
        _lblDriveFile.html("Choose your file");
        _driveFile.prop("disabled","");
    }
    else
    {
        _lblDriveFile.html("You have to log in first");
        _lblDriveFile.css({
            "color":"rgb(255, 0, 0)"
        });
        _driveFile.prop("disabled","disabled");
    }

    //Intestazione tabella
    let _headrow=$("<tr>");
    for(let i=0;i<10;i++)
    {
        let _headcell=$("<th>");
        _headcell.html(headvet[i]);
        _headcell.appendTo(_headrow);
    }
    _headrow.appendTo(_thead);

    _lst.prop("selectedIndex","0");

    /*****************************   COMBOBOX   *******************************************/
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

    /*****************************   TEXTBOX DI RICERCA   *******************************************/
    $("body").on("keyup","input",function ()
    {
        showHints($(this).val());
    });

    /*****************************   RICERCA INCREMENTALE   *******************************************/
    function showHints(str)
    {
        if(str.length>=2)
        {
            _tbody.html("");
            let url="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+str+"&apikey="+key;
            $.getJSON(url, function (data)
                {
                    for(let i=0;((i<data["bestMatches"].length)&&(i<3));i++)
                    {
                        let symbolSearch = data["bestMatches"][i]["1. symbol"];
                        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbolSearch + "&apikey="+key;
                        let r=$.ajax(url);
                        r.done(function (data)
                        {
                            let _tr=$("<tr>");

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

    /*****************************GOOGLE DRIVE*******************************************/
    let path;

    $("#btnLogin").on("click",function ()
    {
        signIn(clientId, clientSecret, redirectUri, scope, code);
    });

    $("#btnLogout").on("click",function ()
    {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expires_in");
        window.location="index.html";
    });

    //Scegli il file da caricare
    $("#driveFile").on("change",function ()
    {
        path=$(this).val();
        if (path)
        {
            let filename=path.split("\\").pop();
            $("label[for=driveFile]").text(filename);
        }
    });

    //Carica il file su Drive
    $("#uploadFile").on("click",function ()
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

    function getGlobalQuotes(symbol)
    {
        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey="+key;
        let vet=["01. symbol","02. open","03. high","04. low","05. price","06. volume","07. latest trading day","08. previous close","09. change","10. change percent"];
        $.getJSON(url, function (data)
            {
                let globalQuoteData = data["Global Quote"];
                let _tr=$("<tr>");
                for(let i=0;i<10;i++)
                {
                    $("<td>").html(globalQuoteData[vet[i]]).appendTo(_tr);
                }
                _tr.appendTo(_tbody);
            });
    }
});
