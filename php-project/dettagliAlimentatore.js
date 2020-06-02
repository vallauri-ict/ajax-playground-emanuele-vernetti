"use strict";

$(document).ready(function ()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    let _txtMarca=$("#txtMarca");
    let _txtModello=$("#txtModello");
    let _txtTensione=$("#txtTensione");
    let _txtFrequenza=$("#txtFrequenza");
    let _txtCorrente=$("#txtCorrente");
    let _txtPotenza=$("#txtPotenza");
    let _txtPrezzo=$("#txtPrezzo");
    let _img=$("#immagine");

    let table="alimentatori";
    let _richiestaDettagli=inviaRichiesta("POST","server/richiestaDettagli.php",{"id":id,"table":table});

    _richiestaDettagli.done(function (data)
    {
       _txtMarca.val(data[0]["Marca"]);
       _txtModello.val(data[0]["Modello"]);
       _txtTensione.val(data[0]["Tensione di ingresso"]);
       _txtFrequenza.val(data[0]["Frequenza di ingresso"]);
       _txtCorrente.val(data[0]["Corrente di ingresso"]);
       _txtPotenza.val(data[0]["Potenza"]);
        _txtPrezzo.val(data[0]["Prezzo"]+" euro");
       _img.prop("src",data[0]["Img"]);
    });
});