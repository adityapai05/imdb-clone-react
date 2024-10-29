import { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Home from "./components/Home";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let addToList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let removeFromList = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });

    setWatchList(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
    console.log(filteredWatchlist);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AppContext.Provider
        value={{ watchlist, addToList, removeFromList, setWatchList }}
      >
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route index element={<Home loading={loading} setLoading={setLoading}/>}/>
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movie/:id" element={<Movie/>} />
            <Route path="/movies/:type" element={<Movies loading={loading} setLoading={setLoading}/>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
