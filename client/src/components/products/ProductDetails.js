import React, { Component } from 'react'
import productActions from '../../actions/ProductActions'
import productStore from '../../stores/ProductStore'
import Reviews from './Reviews'

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        const id = this.props.match.params.id

        this.state = {
            id,
            product: {}
        }

        this.handleProductRetrieved = this.handleProductRetrieved.bind(this)

        productStore.on(
            productStore.eventTypes.PRODUCT_DETAILS_RETRIEVED,
            this.handleProductRetrieved)
    }

    componentDidMount() {
        productActions.byId(this.state.id)
    }

    componentWillUnmount() {
        productStore.removeListener(
            productStore.eventTypes.PRODUCT_DETAILS_RETRIEVED,
            this.handleProductRetrieved)
    }

    handleProductRetrieved(data) {
        this.setState({
            product: data
        })
    }

    render() {
        const product = this.state.product
        return (
            <div className='product-details'>
                <h1>{product.name} - {product.price}</h1>
                <h3>{product.type} - {product.status}</h3>
                <div>
                    <img src={product.image} alt={product.name} />
                </div>
                <div>
                    <Reviews productId= {this.state.id}/>
                </div>
            </div>
        )
    }
}

export default ProductDetails