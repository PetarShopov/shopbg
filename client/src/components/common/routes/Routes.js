import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import AddProduct from '../../products/AddProduct'
import Home from '../../home/Home'
import ProductDetails from '../../products/ProductDetails'

const Routes = () => (
    <Switch>
        <Route path='/' exact component={Home} /> 
        <Route path='/users/register' component={RegisterPage} />
        <Route path='/users/login' component={LoginPage} />
        <PrivateRoute path='/users/logout' component={LogoutPage} />
        <PrivateRoute path='/products/add' component={AddProduct} />
        <PrivateRoute path='/products/:id' component={ProductDetails} />
    </Switch>
)

export default Routes
