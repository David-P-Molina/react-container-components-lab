import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'KK7RTU0lG6I3M27YxNgbNhnSAOOWVwjn';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends Component {
    constructor() {
        super()

        this.state = {
            reviews: [],
            searchTerm: ''
        }
    }
    handleOnSubmit = (e) => {
        e.preventDefault()
            fetch(URL.concat(this.state.searchTerm))
            .then((response) => response.json())
            .then((data) => this.setState({ reviews: data.results }))
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className='search-movies'>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor='search-term'>Search Movie Database For Reviews</label>
                    <input type='text' value={this.state.searchTerm} onChange={this.handleOnChange} />
                    <label htmlFor='submit-movie-search'/>
                    <input type='submit' />
                </form>
                
                {typeof this.state.reviews === 'object' &&
          this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
        <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer