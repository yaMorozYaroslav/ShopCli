import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
	if(localStorage.getItem('profile')){
		req.headers.Authorization = `Bearer $[JSON.parse(
		                             localStorage.getItem('profile')).token}`
	}
    return req
})
export const fetchItems =()=> API.get('/items')
export const createItem =(newItem)=> API.item('/items', newItem)
export const editItem =(id, editedItem)=> 
                                     API.patch(`/posts/${id}`, editedItem)
export const deleteItem =(id)=>API.delete(`/items/${id}`)

export const auth =(data)=>API.post('/user/auth', data)
export const register =(data)=>API.post('/user/register', data)