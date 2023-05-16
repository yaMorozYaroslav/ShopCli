import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {removeItem} from '../Redux/itemsSlice'
import {addToCart} from '../Redux/cartSlice'

export const ItemExcerpt = ({item, setCurrentId, openItemForm, userData}) => {
	
	//if(userData)console.log(userData.result, userData.result)
    const dispatch = useDispatch()
   const profile = JSON.parse(localStorage.getItem('profile'))
    const handEdit =(e)=> {
		e.preventDefault()
		openItemForm()
		setCurrentId(item._id)
		}
   const randomColor = Math.floor(Math.random()*16777215).toString(16)
   
   
   const newItem = {_id: item._id, title: item.title}

	return (
	<article style={{'background':`#${randomColor}`}}>
	  <h3>{item.title}</h3>
	  <p>{item.photo}</p>
	  <p>{item.category}</p>
	  <p>{item.description}</p>
	  <p>{item.price}</p>
	  {(userData.result && 
	   (userData.result._id === item.creator||userData.result.role === 'admin')) && 
	   (<>
	  <button onClick={() => dispatch(removeItem(item._id))}>Remove</button>
	  <button onClick={handEdit}>Edit</button>
	    </>)}
	   <button onClick={() => dispatch(addToCart(newItem))}>Buy</button>
	</article>
	  )
	}
