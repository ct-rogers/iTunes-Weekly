let playerBox = document.getElementById("player")
let searchBox = document.getElementById("searchBox")
let searchResults = document.getElementById("searchResults")
let searchTerm = ""
let list = document.getElementById("list")
let musicPlayer = document.getElementById("audioPlayer")

let searchBar = document.getElementById("searchBar")
let button = document.getElementById("button")

button.addEventListener("click", function() {
  searchTerm = searchBar.value.split(" ").join("+")
  list.innerHTML = ""

  let URL = `https://itunes.apple.com/search?term=${searchTerm}&limit=15`

  const promise = fetch(URL).then(response => response.json()).then(data => {
    data.results.forEach(song => {
      let songInfo = document.createElement("li")

      let img = document.createElement("img")
      img.src = song.artworkUrl100
      songInfo.appendChild(img)

      let songTitle = document.createElement("p")
      songTitle.textContent = song.trackName
      songInfo.appendChild(songTitle)

      let artist = document.createElement("p")
      artist.textContent = song.artistName
      songInfo.appendChild(artist)

      let audio = document.createElement("a")
      audio.href = song.previewUrl
      audio.textContent = song.previewUrl

      list.appendChild(songInfo)

      // Get the element, add a click listener...
      songInfo.addEventListener("click", function playMusic(e) {
        musicPlayer.setAttribute("src", song.previewUrl)
        // e.target is the clicked element!
        // If it was a list item
        if (e.target && e.target.nodeName == "Li") {
          // List item found!  Output the ID!
          console.log("List item", e.target.id.replace("post-", ""), " was clicked!")
        }
      })

      searchBar.value = ""
    })
  })
})
