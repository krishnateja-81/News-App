import React from "react";


export default function Article(props) {
  return (
    <div className="card p-3">
      {props.article.urlToImage ? (
        <img src={props.article.urlToImage} alt="news" />
      ) : (
        <img src="https://st2.depositphotos.com/2586633/46477/v/450/depositphotos_464771766-stock-illustration-no-photo-or-blank-image.jpg" alt="news" />
      )}
      <h2>{props.article.title}</h2>
      <p>{props.article.content.substring(0, 100).concat("...")} <a href={props.article.url} target="_blank">Read more</a></p>
    </div>
  );
}


