import React, { useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Columns, Column } from 'react-flex-columns'

import Heading from 'YesterTech/Heading'
import {
  Pagination,
  PaginationRange,
} from 'YesterTech/Pagination'
import NoResults from 'YesterTech/NoResults'
import api from 'YesterTech/api'
import usePromise from 'YesterTech/usePromise'
import BrowseProductItem from 'YesterTech/BrowseProductItem'

function BrowseProducts({ backgroundColor }) {
  const urlQuery = useLocation().search
  const search = useMemo(
    () => queryString.parse(urlQuery),
    [urlQuery]
  )
  const page = parseInt(search.page, 10) || 1

  // Get Products (Paginated) and Total
  const getProducts = useCallback(
    () => api.products.getProducts(search, page),
    [search, page]
  )
  const [response, loading] = usePromise(getProducts)
  const products = response?.products
  const totalResults = response?.totalResults

  function useCallback(fn, deps) {
    return useMemo(() => fn, deps)
  }

  // 1. Very expensive calculation
  // 2. OR you don't want to break memo of a child component
  // let style = useMemo(() => {
  //   return {
  //     backgroundColor: backgroundColor || 'red',
  //   }
  // }, [backgroundColor])

  // let onChange = useCallback(() => {
  //   onChangeThing()
  // }, [])

  return (
    <div className="browse-products spacing">
      <Columns split middle>
        <Column className="spacing">
          <Heading size={1}>Products</Heading>
        </Column>
        <Column>
          {Array.isArray(products) > 0 && (
            <PaginationRange
              resultsPerPage={10}
              page={page}
              totalResults={totalResults}
              query={search.q || ''}
            />
          )}
        </Column>
      </Columns>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="spacing">
          {products.map(product => (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              imagePath={product.imagePath}
              price={product.price}
              year={product.year}
              brand={product.brand}
              category={product.category}
              condition={product.condition}
              rating={product.rating}
              //style={style}
            />
          ))}
        </div>
      ) : (
        <NoResults>
          No Results
          {search.q && (
            <span>
              {'. '}
              <Link to="/products">
                Clear Search & Filters
              </Link>
            </span>
          )}
        </NoResults>
      )}

      {!loading && (
        <Pagination
          as="footer"
          path="/products"
          totalResults={totalResults || 0}
          page={page}
          resultsPerPage={10}
        />
      )}
    </div>
  )
}

export default BrowseProducts
