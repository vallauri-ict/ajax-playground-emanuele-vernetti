"use strict";

$(document).ready(function ()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    let _txtMarca=$("#txtMarca");
    let _txtModello=$("#txtModello");
    let _txtCapacita=$("#txtCapacita");
    let _txtTipo=$("#txtTipo");
    let _txtVelocita=$("#txtVelocita");
    let _txtPrezzo=$("#txtPrezzo");
    let _img=$("#immagine");

    let table="ram";
    let _richiestaDettagli=inviaRichiesta("POST","server/richiestaDettagli.php",{"id":id,"table":table});

    _richiestaDettagli.done(function (data)
    {
       _txtMarca.val(data[0]["Marca"]);
       _txtModello.val(data[0]["Modello"]);
       _txtCapacita.val(data[0]["Capacita"]);
       _txtTipo.val(data[0]["Tipo di RAM"]);
       _txtVelocita.val(data[0]["Velocita"]);
        _txtPrezzo.val(data[0]["Prezzo"]+" euro");
       _img.prop("src",data[0]["Img"]);
    });
});