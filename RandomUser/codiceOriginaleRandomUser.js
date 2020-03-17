$(function() {
  $("#btnOk").click(function() {
    // alert("ok");
	let param = "results=3&gender=female&nat=US";
    inviaRichiesta(param, aggiornaPagina);
  });
});

function inviaRichiesta(parametri, callBack) {
  $.ajax({
    url: "https://randomuser.me/api", //default: currentPage
    type: "GET",
    data: parametri,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    dataType: "json",
    async: true, // default
    timeout: 5000,
    success: callBack,
    error: function(jqXHR, test_status, str_error) {
      alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
    }
  });
}

function aggiornaPagina(data) {
  console.log(data);
  let person = data.results[0];
  let st = person.name.title + " " + person.name.first + " " + person.name.last;
  // alert(st);
  $("#name").html(st);
  $("img").attr("src", person.picture.large);
}
