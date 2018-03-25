import dispatcher from '../dispatcher'

const productActions = {
    types: {
        ADD_PRODUCT: 'ADD_PRODUCT',
        ALL_PRODUCTS: 'ALL_PRODUCTS',
        PRODUCT_DETAILS: 'PRODUCT_DETAILS',
    },
    add(product) {
        dispatcher.dispatch({
            type: this.types.ADD_PRODUCT,
            product
        })
    },
    all (page) {
        page = page || 1
        dispatcher.dispatch({
            type: this.types.ALL_PRODUCTS,
            page
        })
    },
    byId (id) {
        dispatcher.dispatch({
            type: this.types.PRODUCT_DETAILS,
            id
        })
    }
}

export default productActions
