import React, { useState } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from './CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

function Checkout() {
  const match = useRouteMatch()
  const history = useHistory()

  const [sameAsBilling, setSameAsBilling] = useState(false)
  const [fields, setFields] = useState({})

  function handleBillingSubmit(sameAsBilling, fields) {
    setSameAsBilling(sameAsBilling)
    setFields(fields)
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling
            onSubmit={handleBillingSubmit}
            defaultFields={fields}
            defaultSameAsBilling={sameAsBilling}
          />
        </Route>

        {Object.keys(fields).length > 0 && (
          <Route path={`${match.path}/review`}>
            <CheckoutReview sameAsBilling={sameAsBilling} fields={fields} />
          </Route>
        )}

        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout
