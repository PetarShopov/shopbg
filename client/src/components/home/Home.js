import React, { Component } from 'react'
import queryString from 'query-string'
import productActions from '../../actions/ProductActions'
import productStore from '../../stores/ProductStore'
import ProductInfo from '../products/ProductInfo'

class Home extends Component {
    constructor(props) {
        super(props)

        const query = queryString.parse(this.props.location.search)
        const page = parseInt(query.page, 10) || 1

        this.state = {
            products: [],
            page: page
        }

        this.handleProductsRetrieved = this.handleProductsRetrieved.bind(this)

        productStore.on(
            productStore.eventTypes.PRODUCTS_RETRIEVED,
            this.handleProductsRetrieved)
    }

    componentDidMount() {
        productActions.all(this.state.page)
    }

    componentWillUnmount() {
        productStore.removeListener(
            productStore.eventTypes.PRODUCTS_RETRIEVED,
            this.handleProductsRetrieved)
    }

    handleProductsRetrieved(data) {
        console.log(data)
        this.setState({
            products: data.products
        })
    }

    goToPrevPage() {
        let page = this.state.page
        if (page === 1) {
            return
        }
        page--

        this.setState({
            page
        })
        this.props.history.push(`/?page=${page}`)
        productActions.all(page)
    }

    goToNextPage() {
        if (this.state.products.length === 0) {
            return
        }

        let page = this.state.page
        page++

        this.setState({
            page
        })
        this.props.history.push(`/?page=${page}`)
        productActions.all(page)
    }

    render() {
        let products = 'No products found'

        if (this.state.products.length > 0) {
            products = this.state.products.map(product => (
                <ProductInfo key={product._id} {...product} />
            ))
        }

        return (
            <div>
                <h1>All Products</h1>
                <div>
                    <button onClick={this.goToPrevPage.bind(this)}>Prev</button>
                    <button onClick={this.goToNextPage.bind(this)}>Next</button>
                </div>
                <ul>
                    {products}
                </ul>
            </div>
        )
    }
}

export default Home
