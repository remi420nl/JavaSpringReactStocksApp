import axios from "axios";
import { getJwt, getUserId } from "../features/JwtHelper";
import { pubKey, newsKey, iexKey} from "./apikeys";

//Main api call page, base url for Spring is being set in index.js

//Getting data from free API, using the public key and the choosen ticker (stock symbol)
export const fetchTickerData = async (ticker) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=gregergre`;

  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};



export const fetchAllTickers = async () => {
  const url = `https://cloud.iexapis.com/beta/ref-data/symbols?token=pk_48d2125cb14a4056b3368b8190d75028`;
 
    try {
      const data = await axios.get(`${url}`);
       console.log('TICKER', data);
      return data;
    } catch (error) {
      return error;
    }
  };


  export const sendStockToBackend = async (stocks) => {
    
    const url = `/api/stock/`;
    console.log(stocks)
    let data = {
      dtos: stocks
    }
  
    try {
      const stock = await axios.post(url, data);
      console.log("stock send to backend")
      return stock;
    } catch (error) {
      return error;
    }
  };

  export const getAllStocks = async (type) => {
  
    const url = `/api/stock/${type}`;

  
    try {
      const stocks = await axios.get(url);
      return stocks;
    } catch (error) {
      return error;
    }
  };
  
  



export const fetchTickerDatasUS = async (ticker) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=&interval=5min&outputsize=compact&apikey=llslsls`;

  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};



//fetching portfolio from Spring API, with the current token added to the request
export const fetchPortfoliosByUser = async () => {
  const token = getJwt();
  const url = `/api/portfolio/byuser`;
  const bearer = "Bearer " + token;

  try {
    const portfolio = await axios.get(url, {
      headers: {
        Authorization: bearer,
      },
    });
    return portfolio;
  } catch (error) {
    return error;
  }
};

//getting all portfolios for the statistics page, public accessible
export const getAllPortfolios = async () => {
  const url = `/api/portfolio/`;
  
   return  axios.get(url);

};

//fetching user details
export const fetchUserDetails = async () => {
  const url = `/api/userdetails`;
  const token = "Bearer " + getJwt();

  if (token.length < 12) {
    return "Not logged in";
  }
  const config = {
    headers: { Authorization: token },
  };
  const userdetails = await axios.get(url, config);
  return userdetails;
};

//Login user
export const Login = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  const url = `/api/authenticate`;

  return await axios.post(url, data);
};

//Checking if token is not expired
export const CheckLoginStatus = async () => {
  const token = "Bearer " + getJwt();
  const config = {
    headers: { Authorization: token },
  };
  const url = `/api/user`;

  return await axios.get(url, config);
};

//register a new user
export const Signup = async (user) => {
  const url = `/api/register`;

  return await axios.post(url, user);
};

//posting a newly created position or add to an existing
export const postNewPosition = async (data) => {
  const token = "Bearer " + getJwt();

  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const url = `/api/position`;
  try {
    const response = await axios.post(url, data, config);

    return response;
  } catch (error) {
    console.log("error occured ", error);
  }
};

//Deleting (selling) position
export const deletePosition = async (id) => {
  const token = "Bearer " + getJwt();

  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };
  const url = `/api/position/${id}`;

  try {
    const response = await axios.delete(url, config);

    return response;
  } catch (error) {
    console.log("error occured ", error);
  }
};

//Update the stock price and date, based on data from the AlphaVantage API
export const updateStockPrice = async (id, newprice, date) => {
  const url = `/api/stock/${id}`;

  const data = {
    latestPrice: newprice,
    lastUpdate: date,
  };
  try {
    const response = await axios.post(url, data);

    return response;
  } catch (error) {
    console.log("error occured while updating stock ", error);
  }
};

//Get user entity
export const getUser = async () => {
  const token = "Bearer " + getJwt();
  const userId = getUserId();
  console.log(userId)
  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const url = `/api/user/${userId}`;

  try {
    const response = await axios.get(url, config);
  
    return response;
  } catch (error) {
    console.log("error occured ", error);
  }
};

//Update user entity
export const updateUser = async (data) => {
  const token = "Bearer " + getJwt();
  const userId = getUserId();

  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const url = `/api/user/${userId}`;

  try {
    const response = await axios.post(url, data, config);

    return response;
  } catch (error) {
    console.log("error occured ", error);
  }
};

//Sets boolean if portfolio if portfolio id is active in competition
export const setCompetitionValue = async (id,value) => {
  const token = "Bearer " + getJwt();
  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };
  const url = `/api/portfolio/${id}/${value}`;

  try {
    const response = await axios.get(url,config);
    return response;
  } catch (e) {
    console.log("error occured ", e.response.data.message);
  }
};

//Get free dutch business news
export const getNews = async () => {
  const url = `http://newsapi.org/v2/top-headlines?country=nl&category=business&apiKey=${newsKey}`;

  return await axios.get(url).then((response) => {
    return response.data.articles;
  });
};
