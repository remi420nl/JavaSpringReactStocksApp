import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Grid } from "@material-ui/core";
import { getNews } from "../../api/index";
import Button from "@material-ui/core/Button";

function HomePage(props) {
  const [articles, setArticles] = useState([]);
  const [to, setTo] = useState(6);
  const [from, setFrom] = useState(0);
  const [newsCount, setNewsCount] = useState();

  //On inition load it only fetches the news
  useEffect(() => {
    getNews().then((response) => {
      setArticles(response);
    });
  }, []);

  //when the articles from the first useEffect have been loaded this one gets triggered to alter the data
  useEffect(() => {
    modifyData();
  }, [articles.length > 0]);

  const modifyData = () => {
    //removing news items without an image and description an removing the website name from the title string after the - dash
    let data =
      Array.isArray(articles) &&
      articles
        .filter((a) => a.description !== null && a.image !== null)
        .map((a) => ({
          ...a,
          title: a.title.substring(0, a.title.lastIndexOf("-")),
        }));
    setArticles(data);
    setNewsCount(data.length);
  };

  if (articles) {
    return (
      <div className="home">
        <Grid container spacing={4}>
          {articles.slice(from, to).map((a, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Card
                title={a.title}
                content={a.content}
                url={a.url}
                image={a.urlToImage}
                date={a.publishedAt}
                description={a.description}
                author={a.author}
              />
            </Grid>
          ))}
        </Grid>
        <div className="buttons">
          {from > 1 ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setFrom(from - 6), setTo(to - 6);
              }}
            >
              Vorige
            </Button>
          ) : (
            <></>
          )}
          {to <= newsCount ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setFrom(from + 6), setTo(to + 6);
              }}
            >
              Volgende
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading news..</div>;
  }
}

export default HomePage;
