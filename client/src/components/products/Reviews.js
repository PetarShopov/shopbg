import React, { Component } from 'react'
import AddReviewForm from './AddReviewForm'
import FormHelpers from '../common/forms/FormHelpers'
import productActions from '../../actions/ProductActions'
import productStore from '../../stores/ProductStore'
import AuthService from '../../services/authService'
import toastr from 'toastr'

class Reviews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newReview: {
                rating: 0,
                comment: '',
                createdOn: +Date.now(),
                user: AuthService.getUser().name
            },
            reviews: [],
            error: ''
        }

        this.handleReviewsRetrieved = this.handleReviewsRetrieved.bind(this)
        this.handleReviewsAdded = this.handleReviewsAdded.bind(this)

        productStore.on(
            productStore.eventTypes.REVIEWS_RETRIEVED,
            this.handleReviewsRetrieved)

        productStore.on(
            productStore.eventTypes.REVIEW_ADDED,
            this.handleReviewsAdded)
    }

    componentDidMount() {
        productActions.allReviews(this.props.productId)
    }

    componentWillUnmount() {
        productStore.removeListener(
            productStore.eventTypes.REVIEW_RETRIEVED,
            this.handleReviewsRetrieved)

        productStore.removeListener(
            productStore.eventTypes.REVIEW_ADDED,
            this.handleReviewsAdded)
    }

    handleReviewsRetrieved(data) {
        console.log(data)
        this.setState({
            reviews: data
        })
    }

    handleReviewsAdded(data) {
        if (!data.success) {
            let firstError = FormHelpers.getFirstError(data)

            this.setState({
                error: firstError
            })
        } else {
            this.setState({ reviews: data.reviews })
            toastr.success(data.message)
        }
    }

    handleReviewChange(event) {
        FormHelpers.handleFormChange.bind(this)(event, 'newReview')
    }

    handleReviewSave(event) {
        event.preventDefault()
        const rating = parseInt(this.state.newReview.rating, 10)

        if (!rating || rating < 1 || rating > 5) {
            this.setState({ error: 'Rating must be between 1 and 5' })
            return
        }
        productActions.addReview(this.props.productId, this.state.newReview)
    }

    render() {
        function compare(a, b) {
            if (a.createdOn < b.createdOn)
                return -1;
            if (a.createdOn > b.createdOn)
                return 1;
            return 0;
        }
        let reviews = ''
        let myReviews = this.state.reviews.sort(compare)
        if (myReviews.length > 0) {
            reviews = this.state.reviews.map((review, index) => (
                <div key={index}>
                    {review.user} - {review.rating} - {review.comment}
                </div>
            ))
        }
        return (
            <div>
                <h4>Share Your Opinion</h4>
                <AddReviewForm
                    review={this.state.newReview}
                    error={this.state.error}
                    onChange={this.handleReviewChange.bind(this)}
                    onSave={this.handleReviewSave.bind(this)} />
                <div>{reviews}</div>
            </div>
        )
    }
}

export default Reviews
