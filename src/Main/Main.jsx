import { useState, useEffect } from "react";
import './Main.css'

export default function Main() {
  const [films, setFilms] = useState([]);
  const [click, setClick] = useState(false);
  const [value, setValue] = useState("");
  const [list, setList] = useState([])

  function getList(value){
    fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${value}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "f28fa297-354e-421e-80ba-18724e8474f5",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => (console.log(res), res))
        .then((json) => setList(json.films))
        .catch((err) => console.error(err));
  }

  useEffect(() => {
    function getFilms() {
      if (click) {
        setClick(false);
        fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${value}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": "f28fa297-354e-421e-80ba-18724e8474f5",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => (console.log(res), res))
          .then((json) => setFilms(json.films))
          .catch((err) => console.error(err));
      }
    }
    getFilms();
  }, [click]);

  return (
    <div className="main">
      <header>
        <div className="site-title">
          <h1>ПОИСК ФИЛЬМОВ</h1>
        </div>
        <div className="header-input">
          <input
              type="text"
              list="input"
              placeholder="Введите название фильма"
              onChange={(e) => {
                setValue(e.target.value);
                getList(e.target.value)
              }}
          />
          <datalist id="input">
            {list.length != 0?
              list.map((elem, index)=>{
                return (<option key={index}>{elem.nameRu}</option>)
              }): null
            }
          </datalist>
          <button
            onClick={() => {
              setClick(true);
            }}
          >
            <span>ПОИСК</span>
          </button>
        </div>
      </header>
      <div className="conteiner">
        {films.map((film, index) => {
          console.log(film);
          return (
            <div key={index} className='film-card'>
              <div className="film-info">
                <h1>{!film.nameRu? film.nameEn: film.nameRu}</h1>
                <div className="film-img">
                  <img src={film.posterUrl} alt="" />
                </div>
                <div className="film-nums">
                  <p className="film-rate">Рейтинг: {film.rating == 'null'? '0.0': film.rating}</p>
                  <p className="film-length">Время: {film.filmLength}</p>
                  <p className="film-year">Год: {film.year}</p>
                </div>
                <div>
                  <span className="film-description">{!film.description? 'Описания нет': film.description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
