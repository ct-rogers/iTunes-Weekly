let playerBox = document.getElementById('player')
let searchBox = document.getElementById('searchBox')
let searchResults = document.getElementById('searchResults')
let searchTerm = ''
let list = document.getElementById('list')
let musicPlayer = document.getElementById('audioPlayer')

let searchBar = document.getElementById('searchBar')
let button = document.getElementById('button')

button.addEventListener('click', function() {
  searchTerm = searchBar.value.split(' ').join('+')
  list.innerHTML = ''

  let URL = `https://itunes.apple.com/search?term=${searchTerm}&limit=15`

  const promise = fetch(URL).then(response => response.json()).then(data => {
    data.results.forEach(song => {
      let songInfo = document.createElement('li')

      let img = document.createElement('img')
      img.src = song.artworkUrl100
      songInfo.appendChild(img)

      songInfo.addEventListener('click', function playMusic() {
        musicPlayer.setAttribute('src', song.previewUrl)
      })

      let songTitle = document.createElement('p')
      songTitle.textContent = song.trackName
      songInfo.appendChild(songTitle)

      let artist = document.createElement('p')
      artist.textContent = song.artistName
      songInfo.appendChild(artist)

      let audio = document.createElement('a')
      audio.href = song.previewUrl
      audio.textContent = song.previewUrl

      list.appendChild(songInfo)

      searchBar.value = ''
    })
  })
})
