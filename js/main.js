// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={APIkey}

const form = document.querySelector('.top-banner form'),
      input = document.querySelector('.top-banner input'),
      msg = document.querySelector('.top-banner .msg'),
      list = document.querySelector('.ajax-section .cities');

const apiKey = 'e1f7d88c2aaf836677ef89091aeade4a';

form.addEventListener('submit', event => {
  event.preventDefault();
  const listItems = list.querySelectorAll('.ajax-section .city');
  const inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      const li = document.createElement('li');
      li.classList.add('city');
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => msg.textContent = "Pleas search a valid city 😩");

    msg.textContent = '';
    form.reset();
    input.focus();
});