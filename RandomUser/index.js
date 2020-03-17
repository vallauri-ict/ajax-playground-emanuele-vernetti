let n,gender,nationalities;
let currentPos;
let json;
let _indietro,_avanti,_ulInfo,_titolo,_valore,_immagine,_pResults,_resultsNumber,_currentProfile;
let str="";
let first=0;
$(function()
{
    //#region ACCESSO AI CONTROLLI HTML CON I PUNTATORI
    _indietro=$("#indietro");
    _avanti=$("#avanti");
    _ulInfo=$("#valuesList");
    _titolo=$("#titolo");
    _valore=$("#valore");
    _immagine=$("#immagine");
    _pResults=$("#pResults");
    _resultsNumber=$("#resultsNumber");
    _currentProfile=$("#currentProfile");
    //#endregion
    _resultsNumber.on("input",function ()
    {
       _pResults.text(_resultsNumber.val());
    });
    _indietro.prop("disabled","true");
    _avanti.prop("disabled","true");
    firstGen();
    $("#btnOk").click(function()
    {
        buttonClick();
    });

    function firstGen()
    {
        str="";
        resetButtons();
        resetInfo();
        let param;
        n=1;
        gender=""
        nationalities="";
        if(str=="")
        {
            str="Tutte le nazionalità disponibili";
        }
        if(gender=="")
        {
            gender="Entrambi i generi";
        }
        param="results="+n;
        inviaRichiesta(param, aggiornaPagina);
        _indietro.on("click",indietro).prop("disabled","true");
        _avanti.on("click",avanti);
        if(n==1)
        {
            _avanti.prop("disabled","disabled");
        }
        else
        {
            _avanti.removeProp("disabled");
            _avanti.css({
                "background-image":"url(frecciaAvanti.jpg)"
            });
        }
        for(let i=1;i<=6;i++)
        {
            _ulInfo.children("li").eq(i-1).on("mouseover",function ()
            {
                visualizza(i);
            })
        }
        currentPos=0;
        _ulInfo.children("li").eq(0).css({
            "background-position-y":"-95px"
        });
    }

    function buttonClick()
    {
        str="";
        resetButtons();
        resetInfo();
        let param;
        n=parseInt(_resultsNumber.val());
        gender=$("#divRadio input:checked").val();
        nationalities=$("input[type=checkbox]:checked");
        for(let i=0;i<nationalities.length;i++)
        {
            str+=$(nationalities[i]).val()+",";
        }
        str=str.substring(0,str.length-1);
        console.log(str);
        if(str=="")
        {
            str="Tutte le nazionalità disponibili";
        }
        if(gender=="")
        {
            gender="Entrambi i generi";
        }
        param="results="+n+"&gender="+gender+"&nat="+str;
        inviaRichiesta(param, aggiornaPagina);
        _indietro.on("click",indietro).prop("disabled","true");
        _avanti.on("click",avanti);
        if(n==1)
        {
            _avanti.prop("disabled","disabled");
        }
        else
        {
            _avanti.removeProp("disabled");
            _avanti.css({
                "background-image":"url(frecciaAvanti.jpg)"
            });
        }
        for(let i=1;i<=6;i++)
        {
            _ulInfo.children("li").eq(i-1).on("mouseover",function ()
            {
                visualizza(i);
            })
        }
        currentPos=0;
        _ulInfo.children("li").eq(0).css({
            "background-position-y":"-95px"
        });
    }
});

function inviaRichiesta(parametri, callBack)
{
    if(first==1)
    {
        alert(
            "Risultati richiesti: "+n+"\n"+
            "Genere: "+gender+"\n"+
            "Nazionalità: "+str
        );
        first=1;
    }

    if(gender=="Entrambi i generi")
    {
        gender="";
        parametri="results="+n;
    }
    else
    {
        parametri="results="+n+"&gender="+gender;
    }

    if(str=="Tutte le nazionalità disponibili")
    {
        str="";
        parametri="results="+n+"&gender="+gender;
    }
    else
    {
        parametri+="&nat="+str;
    }
    // console.log(parametri);
    $.ajax({
        "url": "https://randomuser.me/api", //default: currentPage
        "type": "GET",
        "data": parametri,
        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
        "dataType": "json",
        "async": true, // default
        "timeout": 5000,
        "success": callBack,
        "error": function(jqXHR)
        {
            alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
        }
    });
}

function aggiornaPagina(data)
{
    json=data;
    console.log(json);
    let person = data.results[0];
    let st = person.name.title + " " + person.name.first + " " + person.name.last;
    _titolo.html("Hi, my name is");
    _valore.html(st);
    _immagine.attr("src", person.picture.large);
    _currentProfile.text("Profilo 1 di "+n);
}

function indietro()
{
    currentPos--;
    _avanti.removeProp("disabled");
    _avanti.css({
        "background-image":"url(frecciaAvanti.jpg)"
    });
    if(currentPos==0)
    {
        _indietro.prop("disabled","disabled");
        _indietro.css({
            "background-image":"url(frecciaIndietroGrigia.jpg)"
        });
    }
    newUser();
    resetInfo();
    imposta(1);
    _currentProfile.text("Profilo "+(currentPos+1)+" di "+n);
}

function newUser()
{
    _valore.html(json["results"][currentPos]["name"]["title"]+" "+json["results"][currentPos]["name"]["first"]+" "+json["results"][currentPos]["name"]["last"]);
    _titolo.html("Hi, my name is");
    _immagine.attr("src", json["results"][currentPos]["picture"]["large"]);
}

function avanti()
{
    currentPos++;
    _indietro.removeProp("disabled");
    _indietro.css({
        "background-image":"url(frecciaIndietro.jpg)"
    });
    if(currentPos==(n-1))
    {
        _avanti.prop("disabled","disabled");
        _avanti.css({
            "background-image":"url(frecciaAvantiGrigia.jpg)"
        });
    }
    newUser();
    resetInfo();
    imposta(1);
    _currentProfile.text("Profilo "+(currentPos+1)+" di "+n);
}

function visualizza(n)
{
    resetInfo();
    switch (n)
    {
        case 1:
        {
            //nome e cognome
            _valore.html(json["results"][currentPos]["name"]["title"]+" "+json["results"][currentPos]["name"]["first"]+" "+json["results"][currentPos]["name"]["last"]);
            _titolo.html("Hi, my name is");
            imposta(n);
            break;
        }
        case 2:
        {
            //mail
            _valore.html(json["results"][currentPos]["email"]);
            _titolo.html("My email address is");
            imposta(n);
            break;

        }
        case 3:
        {
            //compleanno
            let s=json["results"][currentPos]["dob"]["date"].substr(0,10);
            let giorno,mese,anno;
            giorno=s.substring(8,10);
            mese=s.substring(5,7);
            anno=s.substring(0,4);
            _valore.html(giorno+"/"+mese+"/"+anno);
            _titolo.html("My birthday is");
            imposta(n);
            break;

        }
        case 4:
        {
            //indirizzo
            _valore.html(json["results"][currentPos]["location"]["postcode"]+" "+json["results"][currentPos]["location"]["city"]+" "+json["results"][currentPos]["location"]["state"]);
            _titolo.html("My address is");
            imposta(n);
            break;
        }
        case 5:
        {
            //numero di telefono
            _valore.html(json["results"][currentPos]["phone"]);
            _titolo.html("My phone number is");
            imposta(n);
            break;
        }
        case 6:
        {
            //password
            _valore.html(json["results"][currentPos]["login"]["password"]);
            _titolo.html("My password is");
            imposta(n);
            break;
        }
    }
}

function resetInfo()
{
    _ulInfo.children("li").css({
        "background-position-y":"-48px"
    });
}

function resetButtons()
{
    _indietro.off();
    _avanti.off();
    _indietro.css({
        "background-image":"url(frecciaIndietroGrigia.jpg)"
    });
    _avanti.css({
        "background-image":"url(frecciaAvantiGrigia.jpg)"
    });
}

function imposta(n)
{
    _ulInfo.children("li").eq(n-1).css({
        "cursor":"pointer",
        "background-position-y":"-96px"
    });
}