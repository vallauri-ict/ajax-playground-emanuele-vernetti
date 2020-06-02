"use strict";

$(document).ready(function ()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    let _txtMarca=$("#txtMarca");
    let _txtModello=$("#txtModello");
    let _txtCapacita=$("#txtCapacità");
    let _txtConnettore=$("#txtConnettore");
    let _txtVelLetturaSequenziale=$("#txtVelocitàLetturaSequenziale");
    let _txtVelScritturaSequenziale=$("#txtVelocitàScritturaSequenziale");
    let _txtPrezzo=$("#txtPrezzo");
    let _img=$("#immagine");

    let table="ssd";
    let _richiestaDettagli=inviaRichiesta("POST","server/richiestaDettagli.php",{"id":id,"table":table});

    _richiestaDettagli.done(function (data)
    {
        console.log(data[0]["Capacita"]);
       _txtMarca.val(data[0]["Marca"]);
       _txtModello.val(data[0]["Modello"]);
       _txtCapacita.val(data[0]["Capacita"]);
       _txtConnettore.val(data[0]["Connettore"]);
       _txtVelLetturaSequenziale.val(data[0]["Velocita lettura sequenziale"]);
       _txtVelScritturaSequenziale.val(data[0]["Velocita scrittura sequenziale"]);
        _txtPrezzo.val(data[0]["Prezzo"]+" euro");
       _img.prop("src",data[0]["Img"]);
    });
});