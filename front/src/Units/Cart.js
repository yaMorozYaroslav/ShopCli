import React from 'react'
import Badge from "@material-ui/core/Badge"
import CartIcon from "@material-ui/icons/ShoppingCart"

import {CartItem} from './CartItem'

import {OpenContext, CartContext, ItemContext} from '../Context/Contexts'

const button = {'fontSize':'20px', 'cursor':'pointer', 'margin':'5px'}

export const Cart =()=> {
	
	const [open, setOpen] = React.useState(false)
	
	const {cartItems, increase, decrease, 
		     removeFromCart, clearCart, setFromLocale} = React.useContext(CartContext)
	const {loading} = React.useContext(ItemContext)
	
	const {mailForm, openMailForm, closeMailForm} = React.useContext(OpenContext)
	
	React.useEffect(()=>{
		const cart = JSON.parse(localStorage.getItem('cart'))
		
		const shouldUpdateStorage = Object.keys(cartItems).length > 0 &&
		                            JSON.stringify(cartItems) !== JSON.stringify(cart)
		if(shouldUpdateStorage){
		  localStorage.setItem('cart', JSON.stringify(cartItems))
		  }
		  
        const shouldUpdateState = cart && loading && 
		                          Object.keys(cart).length > 0 &&
		              JSON.stringify(cartItems) !== JSON.stringify(cart)
		            
		if(shouldUpdateState){
		                 setFromLocale(cart)}
		},[cartItems, loading, setFromLocale])
		console.log(loading)
		
		const onClearCart =()=> {
			clearCart()
			localStorage.removeItem('cart')
			}
			
		const changeBorder =(e)=> {
			e.target.style.border = '2px solid blue'
			setTimeout(() => e.target.style.border = null, 1000)
			}

    return <>{!mailForm && <div style={{'marginTop':'15px','fontSize':'32px'}}>
            <Badge color='secondary'
                   style={{'cursor':'pointer'}}
                   overlap="rectangular"
                   badgeContent={cartItems.length}
                   onClick={() => setOpen(cartItems.length > 0 && !open ? true : false)}>
            Cart<CartIcon style={{ 'height': '40px', 'width': '40px' }}/>
            </Badge>
            
            {open && cartItems.map(item => (<CartItem 
				                                 key={item._id} 
				                                 item={item} 
				                                 removeFromCart={removeFromCart}
				                                 increase={increase}
				                                 decrease={decrease}
				                                 cartItems={cartItems}/>))}
            
			{open && cartItems.length > 0 && (<>
				 <button onMouseOver={changeBorder} style={button} 
				          onClick={!mailForm?openMailForm:closeMailForm}>
				                                     OrderItems</button>
				                                     
			    <button onMouseOver={changeBorder} style={button}
			            onClick={() => setOpen(false)}>
	                                                CloseCart</button>
	            <button onMouseOver={changeBorder} style={button}
	                    onClick={onClearCart}>ClearCart</button>
	            </>)}
	             
          </div>}
        {mailForm && cartItems.map(item => <div style={{'display':'flex'}}>
			<img style={{'width':'60px', 'margin':'5px'}} src={item.photo}/>
			<p style={{'fontSize':'20px'}}>{item.title}*{item.quantity}</p></div>)}</>
	}
