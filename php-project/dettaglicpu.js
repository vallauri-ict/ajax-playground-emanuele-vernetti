"use strict";

$(document).ready(function ()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    let _txtMarca=$("#txtMarca");
    let _txtModello=$("#txtModello");
    let _txtGenerazione=$("#txtGenerazione");
    let _txtStato=$("#txtStato");
    let _txtLitografia=$("#txtLitografia");
    let _txtNumeroDiCore=$("#txtNCore");
    let _txtNumeroDiThread=$("#txtNThread");
    let _txtFrequenzaBase=$("#txtFreqBase");
    let _txtFrequenzaMassima=$("#txtFreqMax");
    let _txtCache=$("#txtCache");
    let _txtPrezzo=$("#txtPrezzo");
    let _img=$("#immagine");

    let table="cpu";
    let _richiestaDettagli=inviaRichiesta("POST","server/richiestaDettagli.php",{"id":id,"table":table});

    _richiestaDettagli.done(function (data)
    {
       _txtMarca.val(data[0]["Marca"]);
       _txtModello.val(data[0]["Modello"]);
       _txtGenerazione.val(data[0]["Generazione"]);
       _txtStato.val(data[0]["Stato"]);
       _txtLitografia.val(data[0]["Litografia"]);
       _txtNumeroDiCore.val(data[0]["NumCore"]);
       _txtNumeroDiThread.val(data[0]["NumThread"]);
       _txtFrequenzaBase.val(data[0]["FreqBase"]);
       _txtFrequenzaMassima.val(data[0]["FreqTurbo"]);
       _txtCache.val(data[0]["Cache"]);
        _txtPrezzo.val(data[0]["Prezzo"]+" euro");
       _img.prop("src",data[0]["Img"]);
    });
});