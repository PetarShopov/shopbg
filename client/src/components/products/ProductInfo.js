import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import productActions from '../../actions/ProductActions'
import productStore from '../../stores/ProductStore'
import toastr from 'toastr'

class ProductInfo extends Component {
    constructor(props) {
        super(props)
        this.state = props
        this.handleProductBought = this.handleProductBought.bind(this)
        this.handleProductReserved = this.handleProductReserved.bind(this)

        productStore.on(
            productStore.eventTypes.PRODUCT_BOUGHT,
            this.handleProductBought)

        productStore.on(
            productStore.eventTypes.PRODUCT_RESERVED,
            this.handleProductReserved)
    }

    componentWillUnmount() {
        productStore.removeListener(
            productStore.eventTypes.PRODUCT_BOUGHT,
            this.handleProductBought)

        productStore.removeListener(
            productStore.eventTypes.PRODUCT_RESERVED,
            this.handleProductReserved)
    }

    buy(id) {
        productActions.buy(id)
    }

    reserve(id) {
        productActions.reserve(id)
    }

    handleProductBought(data) {
        if (this.state._id === data.id) {
            if (!data.success) {
                toastr.success(data.message)
            } else {
                this.setState({
                    bought: data.bought
                })
            }
        }
    }

    handleProductReserved(data) {
        if (this.state._id === data.id) {
            if (!data.success) {
                toastr.success(data.message)
            } else {
                this.setState({
                    reserved: data.reserved
                })
            }
        }
    }

    render() {
        return (
            <li className='product-info'>
                <span>{this.props.name} - {this.props.total} total - {this.state.bought} bought - {this.state.reserved} reserved </span>
                <br></br>
                <img src={this.props.image} alt={this.props.name} />
                <br></br>
                <Link className="btn" to={`/products/${this.props._id}`}>Details</Link>
                <button className="btn" onClick={() => this.buy(this.props._id)}>Buy</button>
                <button className="btn" onClick={() => this.reserve(this.props._id)}>Reserve</button>
            </li>
        )
    }
}


export default ProductInfo
