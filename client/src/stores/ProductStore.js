import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import productActions from '../actions/ProductActions'
import productService from '../services/productService'

class ProductStore extends EventEmitter {
    addProduct(product) {
        productService
            .add(product)
            .then(data => this.emit(this.eventTypes.PRODUCT_ADDED, data))
    }

    allProducts(page) {
        page = page || 1
        productService
            .all(page)
            .then(data => this.emit(this.eventTypes.PRODUCTS_RETRIEVED, data))
    }

    byId(id) {
        productService
            .byId(id)
            .then(data => this.emit(this.eventTypes.PRODUCT_DETAILS_RETRIEVED, data))
    }

    addReview(id, review) {
        productService
            .addReview(id, review)
            .then(data => this.emit(this.eventTypes.REVIEW_ADDED, data))
    }

    allReview(id) {
        productService
            .allReviews(id)
            .then(data => this.emit(this.eventTypes.REVIEWS_RETRIEVED, data))
    }

    buy(id) {
        productService
            .buy(id)
            .then(data => this.emit(this.eventTypes.PRODUCT_BOUGHT, data))
    }

    reserve(id) {
        productService
            .reserve(id)
            .then(data => this.emit(this.eventTypes.PRODUCT_RESERVED, data))
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
            case productActions.types.ADD_REVIEW: {
                this.addReview(action.id, action.review)
                break
            }
            case productActions.types.ALL_REVIEWS: {
                this.allReview(action.id)
                break
            }
            case productActions.types.BUY_PRODUCT: {
                this.buy(action.id)
                break
            }
            case productActions.types.RESERVE_PRODUCT: {
                this.reserve(action.id)
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
    PRODUCT_DETAILS_RETRIEVED: 'product_details_retrieved',
    REVIEW_ADDED: 'review_added',
    REVIEWS_RETRIEVED: 'reviews_retrieved',
    PRODUCT_BOUGHT: 'product_bought',
    PRODUCT_RESERVED: 'PRODUCT_RESERVED'
}

dispatcher.register(productStore.handleAction.bind(productStore))
export default productStore
