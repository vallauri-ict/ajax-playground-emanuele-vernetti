"use strict";
//Emanuele Vernetti
//Progetto PHP

$(document).ready(function ()
{
	//#region Puntatori a controlli HTML e variabili globali
	let _cmbComponenti = $("#cmbComponenti");
	let vet = ["CPU", "Dissipatori", "Schede madri", "GPU", "RAM", "Alimentatori", "SSD"];

	let _key=$("#key");
	let _login=$("#login");
	let _spanLogin=$("#spanLogin");
	let _btnLogin=$("#btnLogin");
	let _txtUsernameLogin = $("#txtUsernameLogin");
	let _txtPasswordLogin = $("#txtPasswordLogin");
	let _alertLoginSuccessful=$("#alertLoginSuccessful");
	let _alertPasswordErrata=$("#alertPasswordErrata");

	let _registration=$("#registration");
	let _spanRegistrazione=$("#spanRegistrazione");
	let _btnRegistrati=$("#btnRegistrati");
	let _txtNomeRegistrazione=$("#txtNomeR");
	let _txtCognomeRegistrazione=$("#txtCognomeR");
	let _txtMailRegistrazione=$("#txtMailR");
	let _txtTelefonoRegistrazione=$("#txtTelefonoR");
	let _txtUsernameRegistrazione=$("#txtUsernameR");
	let _txtPasswordRegistrazione=$("#txtPasswordR");
	let _alertRegistrationOK=$("#alertRegistrationSuccessful");
	let _alertRegistrationNOK=$("#alertRegistrationDanger");

	let _spanPassword=$("#spanPassword");
	let _btnCambiaPassword=$("#btnCambiaPassword");
	let _alertChangePasswordOK=$("#alertChangePasswordOK");
	let _alertChangePasswordNOK=$("#alertChangePasswordNOK");
	let _txtOldPassword=$("#txtOldPassword");
	let _txtNewPassword=$("#txtNewPassword");

	let _logout =$("#logout");

	let _risultati=$("#divRisultati");
	let carrello=[];
	let _cartElements=$("#cartElements");
	let _lblPrezzoTotale=$("#lblPrezzoTotale");
	let _btnCercaPrezzo=$("#btnCercaPrezzo");
	let _btnSvuotaCarrello=$("#btnSvuotaCarrello");
	let _btnOrdine=$("#btnOrdine");

	let min,max;
	let usernameLogged, logged;

	//#endregion

	//#region Comandi eseguiti all'avvio
	vet.sort();
	for (let i = 0; i < vet.length; i++)
	{
		let _option = $("<option>");
		_option.html(vet[i]).appendTo(_cmbComponenti);
	}
	_cmbComponenti.prop("selectedIndex",-1);
	_btnCercaPrezzo.prop("disabled","disabled");

	let _verificaLogin=inviaRichiesta("POST","server/verificaLogin.php");
	_verificaLogin.done(function (data)
	{
		_registration.css({"display":"none"});
		_logout.css({"display":"inline-block"});
		_key.css({"display":"inline-block"});
		_login.css({"display":"none"});
		_btnOrdine.addClass("btn-dark");
		_btnOrdine.removeClass("btn-danger");
		_btnOrdine.html("Effettua ordine");
		if(carrello.length==0)
		{
			_btnOrdine.prop("disabled","disabled");
		}
		else
		{
			_btnOrdine.removeProp("disabled");
		}
		logged=true;
		usernameLogged=data[0]["Username"];
	});
	_verificaLogin.fail(function (jqXHR, text_status, string_error)
	{
		_logout.css({"display":"none"});
		_login.css({"display":"inline-block"});
		_key.css({"display":"none"});
		_registration.css({"display":"inline-block"});
		_btnOrdine.addClass("btn-danger");
		_btnOrdine.removeClass("btn-dark");
		_btnOrdine.html("Login necessario");
		_btnOrdine.prop("disabled","disabled");
		_btnOrdine.prop("disabled","disabled");
		logged=false;
	});

	$("#slider-range").slider(
		{
			range: true,
			min: 0,
			max: 2000,
			values: [100, 250],
			slide: function (event, ui)
			{
				$("#amount").val("\u20AC" + ui.values[0] + " - \u20AC" + ui.values[1]);
				min=parseInt(ui.values[0]);
				max=parseInt(ui.values[1]);
			}
		});
	//#endregion

	//region Registrazione
	_registration.on("click",function ()
	{
		_txtNomeRegistrazione.removeClass("is-invalid");
		_txtNomeRegistrazione.prev().removeClass("icona-rossa");
		_txtCognomeRegistrazione.removeClass("is-invalid");
		_txtCognomeRegistrazione.prev().removeClass("icona-rossa");
		_txtMailRegistrazione.removeClass("is-invalid");
		_txtMailRegistrazione.prev().removeClass("icona-rossa");
		_txtTelefonoRegistrazione.removeClass("is-invalid");
		_txtTelefonoRegistrazione.prev().removeClass("icona-rossa");
		_txtUsernameRegistrazione.removeClass("is-invalid");
		_txtUsernameRegistrazione.prev().removeClass("icona-rossa");
		_txtPasswordRegistrazione.removeClass("is-invalid");
		_txtPasswordRegistrazione.prev().removeClass("icona-rossa");
		_txtNomeRegistrazione.val("");
		_txtCognomeRegistrazione.val("");
		_txtMailRegistrazione.val("");
		_txtTelefonoRegistrazione.val("");
		_txtUsernameRegistrazione.val("");
		_txtPasswordRegistrazione.val("");
		_alertRegistrationOK.css({
			"display":"none"
		});
		_alertRegistrationNOK.css({
			"display":"none"
		});
		_spanRegistrazione.css({
			"display":"none"
		});

	});

	_btnRegistrati.off();
	_btnRegistrati.on("click", function ()
	{
		if ((_txtNomeRegistrazione.val() != "")&&(_txtCognomeRegistrazione.val() != "")&&(_txtMailRegistrazione.val() != "")&&(_txtTelefonoRegistrazione.val() != "")&&(_txtUsernameRegistrazione.val() != "") && (_txtPasswordRegistrazione.val() != ""))
		{
			_spanRegistrazione.css({
				"display":"inline-block"
			});
			let nome=_txtNomeRegistrazione.val().toString();
			let cognome=_txtCognomeRegistrazione.val().toString();
			let mail=_txtMailRegistrazione.val().toString();
			let telefono=_txtTelefonoRegistrazione.val().toString();
			let user = _txtUsernameRegistrazione.val().toString();
			let pass=CryptoJS.MD5(_txtPasswordRegistrazione.val()).toString();
			let _richiestaRegistrazione = inviaRichiesta("POST", "server/registrazione.php", {
				"nome":nome,
				"cognome":cognome,
				"mail":mail,
				"telefono":telefono,
				"username": user,
				"password": pass
			});
			_richiestaRegistrazione.done(function (data)
			{
				_spanRegistrazione.css({
					"display":"none"
				});
				_alertRegistrationOK.css({
					"display":"block"
				});
				setTimeout(function ()
				{
					$("#btnChiudiFormRegistrazione").click();
				},2500);
			});
			_richiestaRegistrazione.fail(function (jqXHR, text_status, string_error)
			{
				_alertRegistrationNOK.css({
					"display":"block"
				});
				_txtUsernameRegistrazione.addClass("is-invalid");
				_txtUsernameRegistrazione.prev().addClass("icona-rossa");
			});
		}
		else
		{
			if(_txtNomeRegistrazione.val()=="")
			{
				_txtNomeRegistrazione.addClass("is-invalid");
				_txtNomeRegistrazione.prev().addClass("icona-rossa");
			}
			if(_txtCognomeRegistrazione.val()=="")
			{
				_txtCognomeRegistrazione.addClass("is-invalid");
				_txtCognomeRegistrazione.prev().addClass("icona-rossa");
			}
			if(_txtMailRegistrazione.val()=="")
			{
				_txtMailRegistrazione.addClass("is-invalid");
				_txtMailRegistrazione.prev().addClass("icona-rossa");
			}
			if(_txtTelefonoRegistrazione.val()=="")
			{
				_txtTelefonoRegistrazione.addClass("is-invalid");
				_txtTelefonoRegistrazione.prev().addClass("icona-rossa");
			}
			if(_txtUsernameRegistrazione.val()=="")
			{
				_txtUsernameRegistrazione.addClass("is-invalid");
				_txtUsernameRegistrazione.prev().addClass("icona-rossa");
			}
			if(_txtPasswordRegistrazione.val()=="")
			{
				_txtPasswordRegistrazione.addClass("is-invalid");
				_txtPasswordRegistrazione.prev().addClass("icona-rossa");
			}
		}
	});
	//#endregion

	//#region Log in
	_login.off();
	_login.on("click",function ()
	{
		_txtUsernameLogin.removeClass("is-invalid");
		_txtUsernameLogin.prev().removeClass("icona-rossa");
		_txtPasswordLogin.removeClass("is-invalid");
		_txtPasswordLogin.prev().removeClass("icona-rossa");
		_txtUsernameLogin.val("");
		_txtPasswordLogin.val("");
		_alertLoginSuccessful.css({
			"display":"none"
		});
		_alertPasswordErrata.css({
			"display":"none"
		});
		_spanLogin.css({
			"display":"none"
		});
	})

	_btnLogin.off();
	_btnLogin.on("click",function ()
	{
		if((_txtUsernameLogin.val()!="")&&(_txtPasswordLogin.val()!=""))
		{
			_txtUsernameLogin.removeClass("is-invalid");
			_txtUsernameLogin.prev().removeClass("icona-rossa");
			_txtPasswordLogin.removeClass("is-invalid");
			_txtPasswordLogin.prev().removeClass("icona-rossa");
			_spanLogin.css({
				"display":"inline-block"
			});
			_alertLoginSuccessful.css({
				"display":"none"
			});
			_alertPasswordErrata.css({
				"display":"none"
			});
			let user=_txtUsernameLogin.val().toString();
			let pass=_txtPasswordLogin.val().toString();
			let _richiestaLogin = inviaRichiesta("POST", "server/login.php", {"username": user, "password": pass});
			_richiestaLogin.done(function (data)
			{
				_spanLogin.css({
					"display":"none"
				});
				_alertLoginSuccessful.css({
					"display":"block"
				});
				setTimeout(function ()
				{
					$("#btnChiudiForm").click();
				},2500);
				_login.css({
					"display":"none"
				});
				_logout.css({
					"display":"inline-block"
				});
				_registration.css({"display":"none"});
				_key.css({"display":"inline-block"});
				_btnOrdine.addClass("btn-dark");
				_btnOrdine.removeClass("btn-danger");
				_btnOrdine.html("Effettua ordine");
				if(carrello.length==0)
				{
					_btnOrdine.prop("disabled","disabled");
				}
				else
				{
					_btnOrdine.removeProp("disabled");
				}
				logged=true;
				usernameLogged=data[0]["Username"];
			});
			_richiestaLogin.fail(function (jqXHR, text_status, string_error)
			{
				_txtUsernameLogin.addClass("is-invalid");
				_txtPasswordLogin.addClass("is-invalid");
				_txtUsernameLogin.prev().addClass("icona-rossa");
				_txtPasswordLogin.prev().addClass("icona-rossa");
				_spanLogin.css({
					"display":"none"
				});
				_alertLoginSuccessful.css({
					"display":"none"
				});
				_alertPasswordErrata.css({
					"display":"block"
				});
				_key.css({"display":"none"});
				_btnOrdine.addClass("btn-danger");
				_btnOrdine.removeClass("btn-dark");
				_btnOrdine.html("Login necessario");
				_btnOrdine.prop("disabled","disabled");
				logged=false;
			});
		}
		else
		{
			_txtUsernameLogin.addClass("is-invalid");
			_txtUsernameLogin.prev().addClass("icona-rossa");
			_txtPasswordLogin.addClass("is-invalid");
			_txtPasswordLogin.prev().addClass("icona-rossa");
		}
	});
	//#endregion

	//#region Cambio Password
	_key.off();
	_key.on("click",function ()
	{
		_txtOldPassword.val("");
		_txtNewPassword.val("");
		_txtOldPassword.removeClass("is-invalid");
		_txtOldPassword.prev().removeClass("icona-rossa");
		_txtNewPassword.removeClass("is-invalid");
		_txtNewPassword.prev().removeClass("icona-rossa");
		_alertChangePasswordOK.css({
			"display":"none"
		});
		_alertChangePasswordNOK.css({
			"display":"none"
		});
	});

	_btnCambiaPassword.off();
	_btnCambiaPassword.on("click",function ()
	{
		if((_txtOldPassword.val()!="") && (_txtNewPassword.val()!=""))
		{
			_spanPassword.css({
				"display":"inline-block"
			});
			_txtOldPassword.removeClass("is-invalid");
			_txtOldPassword.prev().removeClass("icona-rossa");
			_alertChangePasswordOK.css({
				"display":"none"
			});
			_alertChangePasswordNOK.css({
				"display":"none"
			});
			let oldPw=CryptoJS.MD5(_txtOldPassword.val()).toString();
			let newPw=CryptoJS.MD5(_txtNewPassword.val()).toString();
			let _richiestaCambioPassword=inviaRichiesta("POST","server/cambiaPassword.php",{"username":usernameLogged,"oldPw":oldPw,"newPw":newPw});

			_richiestaCambioPassword.done(function (data)
			{
				_spanPassword.css({
					"display":"none"
				});
				_alertChangePasswordOK.css({
					"display":"block"
				});
				setTimeout(function ()
				{
					$("#btnChiudiFormPassword").click();
				},2500);
			});
			_richiestaCambioPassword.fail(function (jqXHR, text_status, string_error)
			{
				_txtOldPassword.addClass("is-invalid");
				_txtOldPassword.prev().addClass("icona-rossa");
				_spanPassword.css({
					"display":"none"
				});
				_alertChangePasswordNOK.css({
					"display":"block"
				});
			})
		}
		else
		{
			if(_txtOldPassword.val()=="")
			{
				_txtOldPassword.addClass("is-invalid");
				_txtOldPassword.prev().addClass("icona-rossa");
			}
			if(_txtNewPassword.val()=="")
			{
				_txtNewPassword.addClass("is-invalid");
				_txtNewPassword.prev().addClass("icona-rossa");
			}
		}
	});
	//#endregion

	//#region Log out
	_logout.off();
	_logout.on("click",function ()
	{
		let _richiestaLogout=inviaRichiesta("POST","server/logout.php");
		_richiestaLogout.done(function (data)
		{
			alert("Disconnessione eseguita");
			_login.css({
				"display":"inline-block"
			});
			_logout.css({
				"display":"none"
			});
			_key.css({"display":"none"});
			_registration.css({"display":"inline-block"});
			_btnOrdine.addClass("btn-danger");
			_btnOrdine.removeClass("btn-dark");
			_btnOrdine.html("Login necessario");
			_btnOrdine.prop("disabled","disabled");
			logged=false;
			usernameLogged="";
		});
	});
	//#endregion

	//#region Combobox componenti
	_cmbComponenti.off();
	_cmbComponenti.on("change",function ()
	{
		_btnCercaPrezzo.removeProp("disabled");
		let tipo=$(this).val().toLowerCase();
		if(tipo=="schede madri")
		{
			tipo="schedemadri";
		}
		let _richiestaComponenti = inviaRichiesta("POST", "server/richiestaRisultati.php", {"type":tipo});
		_richiestaComponenti.done(function (data)
		{
			visualizzaRisultati(tipo, data);
		});
	});
	//#endregion

	//#region Slider per il prezzo
	_btnCercaPrezzo.off();
	_btnCercaPrezzo.on("click",function ()
	{
		let tipo=_cmbComponenti.val().toLowerCase();
		if(tipo=="schede madri")
		{
			tipo="schedemadri";
		}
		let _richiestaComponentiPrezzo = inviaRichiesta("POST", "server/richiestaRisultatiPrezzo.php", {"type":tipo,"min":min,"max":max});
		_richiestaComponentiPrezzo.done(function (data)
		{
			console.log(data);
			visualizzaRisultati(tipo,data);
		});
	});
	//#endregion

	//#region Pulsante per svuotare il carrello
	_btnSvuotaCarrello.off();
	_btnSvuotaCarrello.on("click",function ()
	{
		svuotaCarrello();
	});
	//#endregion

	//#region Pulsante per effettuare l'ordine
	_btnOrdine.on("click",function ()
	{
		effettuaOrdine();
	});
	//#endregion

	//#region Pulsante per la visualizzazione del carrello
	$("#menu-toggle").on("click",function ()
	{
		caricaCarrello();
	});
	//#endregion

	//#region Funzione che svuota il carrello
	function svuotaCarrello()
	{
		carrello.splice(0);
		caricaCarrello();
		_lblPrezzoTotale.html("Prezzo totale: 0 \u20AC");
	}
	//#endregion

	//#region Funzione che effettua l'ordine
	function effettuaOrdine()
	{
		for(let i=0;i<carrello.length;i++)
		{
			let item=carrello[i];
			let tipo=item["Type"];
			let _aggiornaGiacenza=inviaRichiesta("POST","server/aggiornaGiacenza.php",{"type":tipo,"modello":item["Product"],"amount":item["Amount"]});
			_aggiornaGiacenza.done(function (data)
			{
				svuotaCarrello();
				_btnOrdine.removeClass("btn-dark");
				_btnOrdine.addClass("btn-success");
				_btnOrdine.html("OK");
				setTimeout(function ()
				{
					_btnOrdine.removeClass("btn-success");
					_btnOrdine.addClass("btn-dark");
					_btnOrdine.html("Effettua ordine");
				},2000);
			});
		}
	}
	//#endregion

	//#region Funzione che visualizza i risultati ottenuti dalle query sulle tabelle relative ai vari componenti
	function visualizzaRisultati(tipo, data)
	{
		_risultati.html("");
		for(let i=0;i<data.length;i++)
		{
			let _div=$("<div class='col-sm-2'>");
			let _img=$("<img>");
			_img.prop("src",data[i]["Img"]);
			_img.appendTo(_div);
			_div.appendTo(_risultati);
			let _btnDettagli=$("<button type=\"button\" class=\"btn btn-dark btn-block\"></button>");
			let product=data[i]["Modello"];
			let prezzo=data[i]["Prezzo"];
			_btnDettagli.html(product);
			_btnDettagli.prop("id",data[i]["Id"]);
			_btnDettagli.off();
			_btnDettagli.on("click",function ()
			{
				let id=_btnDettagli.prop("id");
				window.open("dettagli"+tipo+".html?id="+id,"_blank");
			});
			if(data[i]["Giacenza"]!=0)
			{
				let _btnCarrello=$("<button type=\"button\" class=\"btn btn-dark btn-block\">Aggiungi al carrello</button>");
				_btnCarrello.attr("product", product);
				_btnDettagli.appendTo(_div);
				_btnCarrello.appendTo(_div);
				_btnCarrello.off();
				_btnCarrello.on("click",function ()
				{
					let controllaElemento=cercaElemento(product);
					if(controllaElemento==false)
					{
						let obj={
							"Type":tipo,
							"Product":product,
							"Prezzo":prezzo,
							"Amount":1};
						carrello.push(obj);
					}
					_btnCarrello.html("Aggiunto!");
					_btnCarrello.removeClass("btn-dark");
					_btnCarrello.addClass("btn-success");
					_btnCarrello.prop("disabled","disabled");
					setTimeout(function ()
					{
						_btnCarrello.html("Aggiungi al carrello");
						_btnCarrello.addClass("btn-dark");
						_btnCarrello.removeClass("btn-success");
						_btnCarrello.removeProp("disabled");
					},2000);
					caricaCarrello();
				});
			}
			else
			{
				let _btnCarrello=$("<button type=\"button\" class=\"btn btn-danger btn-block\">Prodotto esaurito</button>");
				_btnCarrello.attr("product", product);
				_btnDettagli.appendTo(_div);
				_btnCarrello.appendTo(_div);
				_btnCarrello.prop("disabled","disabled");
			}

		}
	}
	//#endregion

	//#region Funzione che carica gli elementi nel carrello
	function caricaCarrello()
	{
		_cartElements.html("");
		let tot=0;
		_lblPrezzoTotale.html("Prezzo totale: 0 \u20AC");
		if(carrello.length==0)
		{
			_btnSvuotaCarrello.prop("disabled","disabled");
			_btnOrdine.prop("disabled","disabled");
		}
		else if(logged)
		{
			_btnSvuotaCarrello.removeProp("disabled");
			_btnOrdine.removeProp("disabled");
		}
		else
		{
			_btnSvuotaCarrello.removeProp("disabled");
		}
		for(let i=0;i<carrello.length;i++)
		{
			let item=carrello[i];
			tot+=(parseInt(item["Prezzo"])*item["Amount"]);
			let _mainDiv=$("<div>");
			_mainDiv.addClass("row");
			_mainDiv.css({
				"margin-bottom":"5px"
			});
			let _elementDiv=$("<div>");
			_elementDiv.css({
				"padding-top":"5px",
				"vertical-align":"middle",
				"margin":"0 auto"
			});
			_elementDiv.addClass("col-sm-8");
			_elementDiv.html(item["Product"]);
			let _amountDiv=$("<div>");
			_amountDiv.addClass("col-sm-2");
			let _input=$("<input type='number'>");
			_input.css({
				"width":"45px"
			});
			_input.prop("pos",i);
			_input.off();
			_input.on("change",function ()
			{
				cambiaQuantita(this, i);
			})
			_input.val(item["Amount"]);
			_input.appendTo(_amountDiv);
			//_amountDiv.html(item["Amount"]);
			let _btnDiv=$("<div>");
			_btnDiv.addClass("col-sm-2");
			let button= $("<button>");
			button.addClass("btn btn-danger");
			button.prop("id",i);
			button.html("X");
			button.off();
			button.on("click",function ()
			{
				eliminaElemento(i);
			})
			button.appendTo(_btnDiv);
			_elementDiv.appendTo(_mainDiv);
			_amountDiv.appendTo(_mainDiv);
			_btnDiv.appendTo(_mainDiv);
			_mainDiv.appendTo(_cartElements);
			_lblPrezzoTotale.html("");
			_lblPrezzoTotale.html("Prezzo totale: "+tot+" \u20AC");
		}
	}
	//#endregion

	//#region Funzione che cambia la quantità degli articoli nel carrello
	function cambiaQuantita(sender, pos)
	{
		carrello[pos]["Amount"]=parseInt($(sender).val());
		caricaCarrello();
	}
	//#endregion

	//#region Funzione che verifica se un elemento è già presente nel carrello
	function cercaElemento(product)
	{
		let modified=false;
		for(let i=0;i<carrello.length;i++)
		{
			let item=carrello[i];
			if(item["Product"]==product)
			{
				modified=true;
				item["Amount"]++;
			}
		}
		return modified;
	}
	//#endregion

	//#region Funzione che elimina un elemento dal carrello
	function eliminaElemento(pos)
	{
		carrello.splice(pos,1);
		caricaCarrello();
	}
	//#endregion
});