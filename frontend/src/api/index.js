import axios from "axios";
import { getJwt } from "../features/JwtHelper";
import {pubKey} from './apikeys'

// const url = 'https://cloud.iexapis.com/beta/ref-data/symbols?token='


// export const fetchTickers = async () => {
//     try {
//       const data = await axios.get(`${url}${pubKey}`);
//        console.log('TICKER', data);
//       return data;
//     } catch (error) {
//       return error;
//     }
//   };


//   export const fetchTickerData = async (ticker, range) => {

//         const url2 = `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${range}?token={privat key}`
//     try {
//       const tickerdetails = await axios.get(`${url2}`);
//        console.log('DATAHISTORICAL', tickerdetails);
//       return tickerdetails;
//     } catch (error) {
//       return error;
//     }
//   };

//   export const fetchTickerIntraDay = async (ticker) => {

//     const url2 = `https://sandbox.iexapis.com/stable/stock/${ticker}/intraday-prices?token={private key}`
//     try {
//       const tickerintraday = await axios.get(`${url2}`);
//        console.log('DATAINTRADAY', tickerintraday);
//       return tickerintraday;
//     } catch (error) {
//       return error;
//     }
//   };

export const fetchTickerData = async (ticker) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${pubKey}`;


  try {
    const data = await axios.get(url);

    return data;
  } catch (error) {
    console.log("ERROR loading data", error);
    return error;
  }
};

// export const fetchPositionByPortfolioId = async (id) => {

//   const token = getJwt();
//   const url = `http://localhost:8080/api/position/byportfolio/${id}`
//   const bearer = 'Bearer ' + token;

//   try {
//     const positions = await axios.get(url,{
//       headers:{
//       "Authorization" : bearer
//     }});

//     console.log("positions ",positions.data);
//     return positions
//   } catch (error)
//   {
//     console.log("error occured " ,error)
//    return error;
//   }
// }

export const fetchPortfoliosByUser = async () => {
  const token = getJwt();
  const url = `http://localhost:8080/api/portfolio/byuser`;
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

export const getAllPortfolios = async () => {
  const url = `http://localhost:8080/api/portfolio/`;
  try {
    const portfolios = await axios.get(url);

    return portfolios;
  } catch (error) {
    return error;
  }
};

export const fetchUserDetails = async () => {
  const url = `http://localhost:8080/api/userdetails`;
  const token = "Bearer " + getJwt();


  if(token.length < 12) {return "Not logged in"}
  const config = {
    headers: { Authorization: token },
  };

  
    const userdetails = await axios.get(url, config);

    return userdetails;
 
};

export const Login = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };

  const url = `http://localhost:8080/api/authenticate`;


  return await axios.post(url, data)
    
  }

export const CheckLoginStatus = async() => {
  const token = "Bearer " + getJwt();
  const config = {
    headers: { Authorization: token },
  };
  const url = `http://localhost:8080/api/user`;

 
  return await axios.get(url, config)
}
  
export const Signup = async (user) => {
  console.log("signup form data ", user);

  const url = `http://localhost:8080/api/register`;

  try {
    const response = await axios.post(url, user);

    return response;
  } catch (error) {
    console.log("error occured ", error);
    //   return error;
  }
};

export const postNewPosition = async (data) => {
  const token = "Bearer " + getJwt();

  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const url = `http://localhost:8080/api/newposition`;

  try {
    const response = await axios.post(url, data, config);

    return response;
  } catch (error) {
    console.log("error occured ", error);
    //   return error;
  }
};

export const deletePosition = async (id) => {
  const token = "Bearer " + getJwt();

  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const url = `http://localhost:8080/api/deleteposition/${id}`;

  try {
    const response = await axios.delete(url, config);

    return response;
  } catch (error) {
    console.log("error occured ", error);
    //   return error;
  }
}
