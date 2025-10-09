
    // Sample Movies Data
    const movies = [
  {id:1, title:"Cosmic Odyssey", year:2024, genre:"Sci-Fi", duration:"2h 45m", rating:8.4, img:"assets/image1.png"},
      {id:2, title:"Shadow Detective", year:2023, genre:"Action", duration:"1h 53m", rating:7.9, img:"assets/image2.png"},
      {id:3, title:"Love in Paris", year:2023, genre:"Romance", duration:"2h 10m", rating:7.2, img:"assets/image3.png"},
      {id:4, title:"The Last Laugh", year:2022, genre:"Comedy", duration:"1h 45m", rating:7.6, img:"assets/image4.png"},
      {id:5, title:"Tears of Tomorrow", year:2024, genre:"Drama", duration:"2h 5m", rating:8.1, img:"assets/image5.png"},
      {id:6, title:"Love in Paris", year:2023, genre:"Romance", duration:"2h 10m", rating:7.2, img:"assets/image3.png"},
      {id:7, title:"The Last Laugh", year:2022, genre:"Comedy", duration:"1h 45m", rating:7.6, img:"assets/image4.png"},
      {id:8, title:"Tears of Tomorrow", year:2024, genre:"Drama", duration:"2h 5m", rating:8.1, img:"assets/image5.png"}
      ,
      {id:9, title:"Love in Paris", year:2023, genre:"Romance", duration:"2h 10m", rating:7.2, img:"assets/image3.png"},
      {id:10, title:"The Last Laugh", year:2022, genre:"Comedy", duration:"1h 45m", rating:7.6, img:"assets/image4.png"},
      {id:11, title:"Tears of Tomorrow", year:2024, genre:"Drama", duration:"2h 5m", rating:8.1, img:"assets/image5.png"}
    ];

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const movieListEl = document.getElementById("movie-list");
    const searchEl = document.getElementById("search");
    const watchlistCountEl = document.getElementById("watchlist-count");
    const watchlistContainer = document.getElementById("watchlist-container");

    function renderMovies(filter="All", search="") {
      movieListEl.innerHTML = "";
      let filtered = movies.filter(m => 
        (filter==="All" || m.genre===filter) &&
        m.title.toLowerCase().includes(search.toLowerCase())
      );
      filtered.forEach(m => {
        const inWatchlist = watchlist.includes(m.id);
        movieListEl.innerHTML += `
          <div class="col-md-3 mb-4">
            <div class="card movie-card">
              <img src="${m.img}" class="card-img-top movie-img">
              <div class="card-body">
                <h5 class="card-title">${m.title}</h5>
                <p class="card-text"><small>${m.genre} • ${m.year} • ${m.duration}</small></p>
                <span class="badge bg-white text-dark">⭐ ${m.rating}</span>
                <button class="btn btn-sm rounded-pill watch-later  ${inWatchlist ? 'btn-success' : 'btn-outline-light'} mt-2" onclick="toggleWatchlist(${m.id})">
                  ${inWatchlist ? '✓ Added' : '+ Watch Later'}
                </button>
              </div>
            </div>
          </div>`;
      });
    }

    function toggleWatchlist(id) {
      if (watchlist.includes(id)) {
        watchlist = watchlist.filter(m => m !== id);
      } else {
        watchlist.push(id);
      }
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      updateWatchlistCount();
      renderMovies(currentFilter, searchEl.value);
      renderWatchlist();
    }

    function renderWatchlist() {
      watchlistContainer.innerHTML = "";
      const saved = movies.filter(m => watchlist.includes(m.id));
      if (saved.length === 0) {
        watchlistContainer.innerHTML = "<p class='text-center text-muted'>No movies in your watchlist yet.</p>";
      }
      saved.forEach(m => {
        watchlistContainer.innerHTML += `
          <div class="col-md-4 mb-3">
            <div class="card movie-card">
              <img src="${m.img}" class="card-img-top movie-img">
              <div class="card-body">
                <h5 class="card-title">${m.title}</h5>
                <p class="card-text"><small>${m.genre} • ${m.year} • ${m.duration}</small></p>
                <span class="badge bg-warning text-dark">⭐ ${m.rating}</span>
                <button class="btn btn-sm btn-danger mt-2" onclick="toggleWatchlist(${m.id})">Remove</button>
              </div>
            </div>
          </div>`;
      });
    }

    function updateWatchlistCount() {
      watchlistCountEl.textContent = watchlist.length;
    }

    // Filters
    let currentFilter = "All";
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        renderMovies(currentFilter, searchEl.value);
      });
    });

    // Search
    searchEl.addEventListener("input", e => {
      renderMovies(currentFilter, e.target.value);
    });

    // Init
    updateWatchlistCount();
    renderMovies();
    renderWatchlist();
  