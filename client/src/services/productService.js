import dataService from './dataService'
const baseUrl = 'products'

class ProductService {
    static all(page) {
        page = page || 1
        return dataService.get(`${baseUrl}/all?page=${page}`)
    }

    static add(product) {
        return dataService.post(`${baseUrl}/add`, product, true)
    }

    static byId(id) {
        return dataService.get(`${baseUrl}/${id}`, true)
    }

    static addReview(id, review) {
        return dataService.post(`${baseUrl}/${id}/reviews/add`, review, true)
    }

    static allReviews(id) {
        return dataService.get(`${baseUrl}/${id}/reviews`, true)
    }

    static buy(id) {
        return dataService.post(`${baseUrl}/buy/${id}`, {}, true)
    }

    static reserve(id) {
        return dataService.post(`${baseUrl}/reserve/${id}`, {}, true)
    }
}

export default ProductService
