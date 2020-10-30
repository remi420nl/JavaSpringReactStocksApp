import React , {useEffect,useState} from "react";
import Card from "./Card";
import {Grid} from '@material-ui/core'
import {getNews} from '../../api/index'

function HomePage (props) {

    const {render} = props
    const [articles,setArticles] = useState([]);
    const [modified,setModified] = useState([])
    const [amountOfItems,setAmountOfItems] = useState(6)


useEffect(() => {

    getNews().then(response =>  {
        setArticles(response)
      })
      
},[])

   useEffect(() => {
  modifyData()

    },[articles.length > 0])
   

 

const modifyData = () => {
//removing news items without an image and description an removing the website name from the title string after the - dash
let data = Array.isArray(articles) && articles.filter(a => a.description !== null && a.image !== null)
.map(a => ({...a, title : a.title.substring(0, a.title.lastIndexOf("-"))}))
setArticles(data)
}




//filter all witouth pic

//


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
             <Grid key={i} item xs={12} sm={6} md={4}>
             <Card title={a.title}
             content={a.content}
             url={a.url}
             image={a.urlToImage}
             date={a.publishedAt}
             description={a.description}
             author={a.author}
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