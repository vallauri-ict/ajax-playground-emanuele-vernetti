"use strict";

$(document).ready(function ()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    let _txtMarca=$("#txtMarca");
    let _txtModello=$("#txtModello");
    let _txtMarcaCPUSupportate=$("#txtMarcaCPUSupportate");
    let _txtSocket=$("#txtSocket");
    let _txtTipoRAMSupportata=$("#txtTipoRAMSupportata");
    let _txtNSlotRAM=$("#txtNSlotRAM");
    let _txtMaxRAM=$("#txtMaxRAM");
    let _txtVelocitaMaxRAM=$("#txtVelocitaMaxRAM");
    let _txtForma=$("#txtForma");
    let _txtNumUSB=$("#txtNumUSB");
    let _txtNumPCIe=$("#txtNumPCIe");
    let _txtNumM2=$("#txtNumM2");
    let _txtNumVGA=$("#txtNumVGA");
    let _txtNumDVI=$("#txtNumDVI");
    let _txtNumHDMI=$("#txtNumHDMI");
    let _txtNumDP=$("#txtNumDP");
    let _txtPrezzo=$("#txtPrezzo");
    let _img=$("#immagine");

    let table="schedemadri";
    let _richiestaDettagli=inviaRichiesta("POST","server/richiestaDettagli.php",{"id":id,"table":table});

    _richiestaDettagli.done(function (data)
    {
        _txtMarca.val(data[0]["Marca"]);
        _txtModello.val(data[0]["Modello"]);
        _txtMarcaCPUSupportate.val(data[0]["Marca processori supportati"]);
        _txtSocket.val(data[0]["Socket"]);
        _txtTipoRAMSupportata.val(data[0]["Tipo di memoria supportata"]);
        _txtNSlotRAM.val(data[0]["Numero di slot di memoria"]);
        _txtMaxRAM.val(data[0]["Quantita massima di memoria supportata"]);
        _txtVelocitaMaxRAM.val(data[0]["Velocita massima di memoria supportata"])
        _txtForma.val(data[0]["Forma"]);
        _txtNumUSB.val(data[0]["Numero di connettori USB"]);
        _txtNumPCIe.val(data[0]["Numero di connettori PCIe"]);
        _txtNumM2.val(data[0]["Numero di slot M2"]);
        _txtNumVGA.val(data[0]["Numero di porte VGA"]);
        _txtNumDVI.val(data[0]["Numero di porte DVI"]);
        _txtNumHDMI.val(data[0]["Numero di porte HDMI"]);
        _txtNumDP.val(data[0]["Numero di porte DP"]);
        _txtPrezzo.val(data[0]["Prezzo"]+" euro");
       _img.prop("src",data[0]["Img"]);
    });
});