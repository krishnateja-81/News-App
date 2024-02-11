import { useEffect } from "react";
import "./App.css";
import Article from "./components/article";
import { useState } from "react";

function App() {
  let [news, setNews] = useState([]);
  let [query, setQuery] = useState("india");
  // let [name,setName] = useState();
  // let arr = [
  //   {'name':'kc', "age":"20"},
  //   // {'name':'charan', "age":"16"},
  //   // {'name':'harshith', "age":"10"},
  //   // {'name':'kt', "age":"19"},
  //   // {"name":"seed", "age":23}
  // ]
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${query}&apikey=05e3bc3c864c499f986f3228aa2abb2c`
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
        console.log(data.articles);
      });
  }, [query]);

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a href="/" className="h2">News App</a>
        <form className="d-flex ms-auto">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            
            onChange={(event)=>{
              setQuery(event.target.value)
            }}
          />
          {/* <button className="btn btn-outline-success" type="submit">
            Search
          </button> */}
        </form>
      </div>
    </nav>

    
    <div className="container">
      <div className="row">
        {news.map((obj, index) => (
          <div className="col-md-4 p-2" key={index}>
            <Article article={obj} />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;
