import React , {useEffect,useState} from "react";
import Card from "./Card";
import {Grid} from '@material-ui/core'
import {getNews} from '../../api/index'

function HomePage (props) {

    const {render} = props
    const [articles,setArticles] = useState([]);
    const [amountOfItems,setAmountOfItems] = useState(6)

   useEffect(() => {

       const response =  getNews();
       response.then(data => {setArticles(data.data.articles);
    console.log(data.data.articles)}
       )
   })
 
    const status = () =>{
        if(!props.loginStatus){
            return <p>Status: Uitgelogd</p>
        }    
           return  <p>Hallo {render()}</p>
    }
if(articles){
return (
    <div className="home">
        <Grid container spacing={4}>
          {articles.slice(0, amountOfItems).map((a,i) => 
             <Grid key={i} item xs={4}>
             <Card title={a.title}
             content={a.content}
             url={a.utl}
             image={a.urlToImage}
             date={a.publishedAt}
             description={a.description}
             />
             </Grid>
            )}
      
        </Grid>
    </div>
)}else{
    return(
        <div>Loading news..</div>
    )
}
}

export default HomePage;