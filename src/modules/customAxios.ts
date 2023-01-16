import axios, {AxiosInstance} from 'axios'

console.log('localStorage.getItem(\'token\')', localStorage.getItem('token'))
export const customAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Authorization": localStorage.getItem('token')
    }
})