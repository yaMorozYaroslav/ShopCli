import React from 'react'

import {Collapse, Button, Navbar, NavbarBrand, Nav, NavItem, Container} from 'reactstrap'
import decode from 'jwt-decode'
import {useDispatch, connect} from 'react-redux'
import Auth from './Auth'

export const AppBar =(props)=> {
	const [user, setUser] = React.useState(
		        JSON.parse(localStorage.getItem('profile')))
	            const dispatch = useDispatch()
	            const logout =()=>{
	            	dispatch({type: 'LOGOUT'})
	            	setUser(null)
	            }
	        React.useEffect((user, logout)=>{
	        	const token = user?.token
	        	if(token){
	        		const decodedToken = decode(token)
	        		if(decodedToken.exp * 1000 < new Date().getTime())
	        	    logout()
	        	}
	        	setUser(JSON.parse(localStorage.getItem('profile')))
	        },[props.isAuth])
	        //console.log(props.isAuth)
	return(<>
		    <Navbar color="white" dark-expand="sm" className="mb-3">
		     <Container>
		      <NavbarBrand href="/">List of Goods</NavbarBrand>
		      <p>Nice to meet you, {user?user.result.name:null}. ^^</p>
              <Auth />
              <Button onClick={logout}>Logout</Button>
		      </Container>
		     </Navbar>
		  </>)
}
const mapState =state=>{
	return{
		isAuth: state.auth.authData
	}
}
export default connect(mapState, null)(AppBar)