import React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import PrimaryHeader from './PrimaryHeader'
import PrimaryFooter from 'YesterTech/PrimaryFooter'
import 'YesterTech/PrimaryLayout.scss'

// Route Targets
import Home from 'YesterTech/Home'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import ProductsLayout from 'YesterTech/ProductsLayout'
import ProductSubNav from 'YesterTech/ProductSubNav'
import Checkout from 'YesterTech/Checkout'
import Account from 'YesterTech/Account'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import { useAuthState } from 'YesterTech/AuthState'

import api from 'YesterTech/api'

function PrimaryLayout() {
  const history = useHistory()
  const { cart } = useShoppingCart()
  const { authenticated, dispatch, login } = useAuthState()

  useEffect(() => {
    api.auth.getAuthenticatedUser().then((user) => {
      login(user)
    })
  }, [login])

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <main className="primary-content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/signup" exact>
              <SignupForm
                onSignup={(user) => {
                  dispatch({ type: 'LOGIN', user })
                  history.push('/')
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={(user) => {
                  dispatch({ type: 'LOGIN', user })
                  history.push('/')
                }}
              />
            </Route>
            <Route path="/products">
              <ProductsLayout />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout />
              </Route>
            )}
            {authenticated && (
              <Route path="/account">
                <Account />
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
