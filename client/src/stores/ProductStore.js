import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import productActions from '../actions/ProductActions'
import ProductService from '../services/productService'

class ProductStore extends EventEmitter {
    addProduct(product) {
        ProductService
            .add(product)
            .then(data => this.emit(this.eventTypes.PRODUCT_ADDED, data))
    }

    allProducts(page) {
        page = page || 1
        ProductService
            .all(page)
            .then(data => this.emit(this.eventTypes.PRODUCTS_RETRIEVED, data))
    }

    byId(id) {
        ProductService
            .byId(id)
            .then(data => this.emit(this.eventTypes.PRODUCT_DETAILS_RETRIEVED, data))
    }

    handleAction(action) {
        switch (action.type) {
            case productActions.types.ADD_PRODUCT: {
                this.addProduct(action.product)
                break
            }
            case productActions.types.ALL_PRODUCTS: {
                this.allProducts(action.page)
                break
            }
            case productActions.types.PRODUCT_DETAILS: {
                this.byId(action.id)
                break
            }
            default: break
        }
    }
}

let productStore = new ProductStore()

productStore.eventTypes = {
    PRODUCT_ADDED: 'product_added',
    PRODUCTS_RETRIEVED: 'products_retrieved',
    PRODUCT_DETAILS_RETRIEVED: 'product_details_retrieved'
}

dispatcher.register(productStore.handleAction.bind(productStore))
export default productStore
