import React, { Component } from 'react'
import FormHelpers from '../common/forms/FormHelpers'
import AddProductForm from './AddProductForm'
import productActions from '../../actions/ProductActions'
import productStore from '../../stores/ProductStore'
import toastr from 'toastr'
import authService from '../../services/authService'

class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: {
                name: 'IPhone X',
                price: 999,
                image: 'https://cdn.macrumors.com/article-new/2017/09/iphonexdesign.jpg',
                type: 'Mobile phone',
                total: 10,
                status: 'Reserved',
                author: authService.getUser().name
            },
            error: ''
        }
        this.handleProductCreated = this.handleProductCreated.bind(this)

        productStore.on(
            productStore.eventTypes.PRODUCT_ADDED,
            this.handleProductCreated)
    }

    componentWillUnmount() {
        productStore.removeListener(
            productStore.eventTypes.PRODUCT_ADDED,
            this.handleProductCreated)
    }

    handleProductCreated(data) {
        if (!data.success) {
            let firstError = FormHelpers.getFirstError(data)

            this.setState({
                error: firstError
            })
        } else {
            toastr.success(data.message)
            this.props.history.push(`/products/${data.product._id}`)
        }
    }

    handleProductChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'product')
    }

    handleProductSave(event) {
        event.preventDefault()

        //validate form 
        let formIsValid = true
        let error = ''

        if (!this.state.product.name) {
            error = 'Name is required'
            formIsValid = false
        }

        if (!formIsValid) {
            this.setState({ error })
            return
        }

        productActions.add(this.state.product)
    }

    render() {
        return (
            <div>
                <h1>Create Product</h1>
                <AddProductForm
                    product={this.state.product}
                    error={this.state.error}
                    onChange={this.handleProductChange.bind(this)}
                    onSave={this.handleProductSave.bind(this)} />
            </div>
        )
    }
}

export default AddProduct
