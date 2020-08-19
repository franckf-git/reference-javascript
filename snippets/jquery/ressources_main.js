$(() => {
  //
  $("#buttonget").click(async () => await $.get("https://randomuser.me/api/?results=8").done((users) => {
    users.results.forEach(user => {
      let carduser = `
      <div class="card" style="width:300px">
      <img class="card-img-top" src="${user.picture.large}" alt="Card image">
      <div class="card-body">
      <h4 class="card-title">${user.name.first} ${user.name.last}</h4>
      <p class="card-text">${user.email}</p>
      <a href="#" class="btn btn-primary">See Profile</a>
      </div>
      </div>
      <br><br>`
      $("#cardsusers").append(carduser)
    })
  }))
  $("#buttonhide").click(() => $("#cardsusers").slideToggle())
  //
  $("#datepicker").datepicker($.datepicker.regional["fr"])
  $("#buttonsavedate").click(() => {
    $("#dateretour").append(`${$("#datepicker").val()}`)
    $("#savedateok").toast("show")
  })
  //
  $("#buttonsaveform").click(() => {
    let alertpostjphtxt = `
  <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
  <div class="toast show" data-delay="2000" style="position: absolute; top: 0; right: 0;" >
    <div class="toast-body bg-success text-white">
      <i class="far fa-save"></i> <strong>Votre requete est postée <a id="retourid"></a>.</strong>
      <button type="button" class="ml-2 mb-1 close text-white" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</div>
`
    $.post("https://jsonplaceholder.typicode.com/posts", {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val(),
      userId: $("#userinput").val()
    }).done((results) => {
      $("#alertpostjph").append(alertpostjphtxt)
      $("#retourid").append(results.id)
    })
  })
})