import axios from 'axios';

export const EuroDollar = () => axios.get('https://api.exchangeratesapi.io/latest').then(({data}) =>{
    return data.rates.USD
})

export const DollarEuro = () =>  axios.get('https://api.exchangeratesapi.io/latest').then(({data}) =>{
    return (1/data.rates.USD)
})
