// Bắt sự kiện enter bằng jQuery 

$('#inp-word').keypress(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    let inpWord = document.getElementById("inp-word").value;
      fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          result.innerHTML = `
            <div class="word">
              <h3>${inpWord}</h3>
              <button onclick="playSound()">
                <i class="fas fa-volume-up"></i>
              </button>
            </div>
            <div class="details">
              <p>${data[0].meanings[0].partOfSpeech}</p>
              <p>/${data[0].phonetic}/</p>
            </div>
            <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="example">${data[0].meanings[0].definitions[0].example || ""}</p>
          `;
          sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
          result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
  }
});