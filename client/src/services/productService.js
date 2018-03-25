import DataService from './dataService'
const baseUrl = 'products'

class ProductService {
    static all(page) {        
        page = page || 1
        return DataService.get(`${baseUrl}/all?page=${page}`)
    }

    static add(product) {
        return DataService.post(`${baseUrl}/add`, product, true)
    }

    static byId(id) {
        return DataService.get(`${baseUrl}/${id}`, true)
    }
}

export default ProductService
