"use strict";

$(document).ready(function ()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    let _txtMarca=$("#txtMarca");
    let _txtModello=$("#txtModello");
    let _txtMemoriaGrafica=$("#txtMemoriaGrafica");
    let _txtTipoMemoriaGrafica=$("#txtTipoMemoriaGrafica");
    let _txtAmpiezzaDati=$("#txtAmpiezzaDati");
    let _txtVersioneDirectX=$("#txtVersioneDirectX");
    let _txtRisoluzioneMassima=$("#txtRisoluzioneMassima");
    let _txtTipoInterfaccia=$("#txtTipoInterfaccia");
    let _txtNumeroVentole=$("#txtNVentole");
    let _txtPrezzo=$("#txtPrezzo");
    let _img=$("#immagine");

    let table="gpu";
    let _richiestaDettagli=inviaRichiesta("POST","server/richiestaDettagli.php",{"id":id,"table":table});

    _richiestaDettagli.done(function (data)
    {
       _txtMarca.val(data[0]["Marca"]);
       _txtModello.val(data[0]["Modello"]);
       _txtMemoriaGrafica.val(data[0]["Memoria grafica"]);
       _txtTipoMemoriaGrafica.val(data[0]["Tipo memoria grafica"]);
       _txtAmpiezzaDati.val(data[0]["Ampiezza dati"]);
       _txtVersioneDirectX.val(data[0]["Versione DirectX"]);
       _txtRisoluzioneMassima.val(data[0]["Risoluzione massima"]);
       _txtTipoInterfaccia.val(data[0]["Tipo interfaccia"]);
       _txtNumeroVentole.val(data[0]["Numero di ventole"]);
        _txtPrezzo.val(data[0]["Prezzo"]+" euro");
       _img.prop("src",data[0]["Img"]);
    });
});