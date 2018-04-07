import dispatcher from '../dispatcher'

const productActions = {
    types: {
        ADD_PRODUCT: 'ADD_PRODUCT',
        ALL_PRODUCTS: 'ALL_PRODUCTS',
        PRODUCT_DETAILS: 'PRODUCT_DETAILS',
        ADD_REVIEW: 'ADD_REVIEW',
        ALL_REVIEWS: 'ALL_REVIEWS',
        BUY_PRODUCT: 'BUY_PRODUCT',
        RESERVE_PRODUCT: 'RESERVE_PRODUCT'
    },
    add(product) {
        dispatcher.dispatch({
            type: this.types.ADD_PRODUCT,
            product
        })
    },
    all(page) {
        page = page || 1
        dispatcher.dispatch({
            type: this.types.ALL_PRODUCTS,
            page
        })
    },
    byId(id) {
        dispatcher.dispatch({
            type: this.types.PRODUCT_DETAILS,
            id
        })
    },
    addReview(id, review) {
        dispatcher.dispatch({
            type: this.types.ADD_REVIEW,
            id,
            review
        })
    },
    allReviews(id) {
        dispatcher.dispatch({
            type: this.types.ALL_REVIEWS,
            id
        })
    },
    buy(id) {
        dispatcher.dispatch({
            type: this.types.BUY_PRODUCT,
            id
        })
    },
    reserve(id) {
        dispatcher.dispatch({
            type: this.types.RESERVE_PRODUCT,
            id
        })
    }
}

export default productActions
