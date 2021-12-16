const row = document.querySelector('#superHeros')
const url = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=6b94df807f819872efd682649d2a2c92&hash=4517c426baa0e1fd11e5dd3d0c1cde0f'

fetch(url)
  .then(response => response.json())
  .then(data => {
    let superHero = ''
    data.data.results.forEach(element => {
      superHero += `<div class="col">
            <div class="card shadow-sm">
              <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="" width="100%" height="225">

              <div class="card-body">
                <h3><strong>${element.name}</strong></h3>
                <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">${element.modified}</small>
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#superHeroModal" onclick="showSuperHero(${element.id});">Ver más</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    })
    row.innerHTML = superHero
  })

function showSuperHero(id) {
  const bodyModal = document.querySelector('#superHeroBodyModal')
  const superHeroModalLabel = document.getElementById('superHeroModalLabel')
  bodyModal.innerHTML = ''
  const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=6b94df807f819872efd682649d2a2c92&hash=4517c426baa0e1fd11e5dd3d0c1cde0f`
  fetch(url)
    .then(response => response.json())
    .then(hero => {
      const { name, description, modified, thumbnail, comics, series, stories } = hero.data.results[0]
      const { path: urlTumbnail, extension } = thumbnail

      let liComics = '', liSeries = '', liStories = ''
      comics.items.forEach(comic => { liComics += `<li>${comic.name}</li>` })
      series.items.forEach(serie => { liSeries += `<li>${serie.name}</li>` })
      stories.items.forEach(storie => { liStories += `<li>${storie.name}</li>` })
      superHeroModalLabel.textContent = `Información sobre ${name}`

      let superHero = `<img src="${urlTumbnail}.${extension}" width="200" class="img-fluid rounded mx-auto d-block" alt="${name}">
      <div>
        <table class="table table-borderless table-hover">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="20%"><strong>Nombre:</strong></td>
              <td>${name}</td>
            </tr>
            <tr>
              <td><strong>Descripción:</strong></td>
              <td>${description === '' ? 'Sin descripción' : description}</td>
            </tr>
            <tr>
              <td><strong>Modificación:</strong></td>
              <td>${modified}</td>
            </tr>
            <tr>
              <td><strong>Comics:</strong></td>
              <td>
              <ul>
                ${liComics}
              </ul>
              </td>
            </tr>
            <tr>
              <td><strong>Series:</strong> </td>
              <td>
                <ul>
                  ${liSeries}
                </ul>
              </td>
            </tr>
            <tr>
              <td><strong>Historietas:</strong></td>
              <td>
                <ul>
                  ${liStories}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`
      bodyModal.innerHTML = superHero
    })
}

