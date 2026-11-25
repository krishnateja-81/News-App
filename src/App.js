import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url =
      "https://en.wikipedia.org/w/api.php?action=parse" +
      "&page=Portal:Current_events&prop=text&format=json&origin=*";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to fetch news");
        return response.json();
      })
      .then((data) => {
        const doc = new DOMParser().parseFromString(
          data.parse.text["*"],
          "text/html"
        );

        const articles = Array.from(
          doc.querySelectorAll(".current-events-content li")
        )
          .filter((item) => !item.querySelector("ul"))
          .map((item) => ({
            title: item.textContent.trim(),
            url:
              item.querySelector("a.external")?.href ||
              "https://en.wikipedia.org/wiki/Portal:Current_events",
          }))
          .filter((item) => item.title);

        setNews(articles);
      })
      .catch(() => setError("Unable to load news. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a href="/news/" className="h2">News App</a>
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search news"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </nav>

      <div className="container mt-4">
        {loading && <p>Loading news...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && filteredNews.length === 0 && (
          <p>No news found.</p>
        )}

        <div className="row">
          {filteredNews.map((article, index) => (
            <div className="col-md-4 p-2" key={index}>
              <div className="card p-3 h-100">
                <p>{article.title}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-4 mb-4">
          Content adapted from{" "}
          <a href="https://en.wikipedia.org/wiki/Portal:Current_events">
            Wikipedia Current Events
          </a>{" "}
          and its contributors, licensed under{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">
            CC BY-SA 4.0
          </a>.
        </footer>
      </div>
    </div>
  );
}

export default App;
