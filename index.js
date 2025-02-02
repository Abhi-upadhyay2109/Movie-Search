const showMovies = async () => {
  try {
    let query = document.querySelector("#searchBox").value.trim();

    if (!query) {
      alert("Please enter a movie name!");
      return;
    }

    let url = `https://www.omdbapi.com/?apikey=bf6bb10b&s=${query}`;

    let response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    if (data.Response === "False") {
      showData([]);
    } else {
      showData(data.Search);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error.message);
  }
};

const showData = (data) => {
  let container = document.querySelector("#container");
  container.innerHTML = "";

  if (data.length === 0) {
    let h1 = document.createElement("h1");
    h1.innerText = "No movies found!";
    container.append(h1);
    return;
  }

  data.forEach((el) => {
    let div = document.createElement("div");

    let poster = document.createElement("img");
    poster.src = el.Poster !== "N/A" ? el.Poster : "no-image.png"; 

    let title = document.createElement("h3");
    title.innerText = el.Title;

    let year = document.createElement("p");
    year.innerText = `Year: ${el.Year}`;

    let imdbID = document.createElement("p");
    imdbID.innerText = `IMDB ID: ${el.imdbID}`;

    div.append(poster, title, year, imdbID);
    container.append(div);
  });
};