import axios from 'axios'
import { OMNIINFER_KEY } from '@env'

const omniiferApi = axios.create({
  baseURL: 'https://omniinfer.p.rapidapi.com/v2',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': OMNIINFER_KEY,
    'X-RapidAPI-Host': 'omniinfer.p.rapidapi.com'
  }
})

export default omniiferApi