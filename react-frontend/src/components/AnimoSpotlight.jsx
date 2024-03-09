import React, { Component } from 'react';
import Header from './Header';
import PublicNewsService from '../services/PublicNewsService';

class AnimoSpotlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animoSpotlightNews: []
        };
    }

    componentDidMount() {
        // Fetch all news items
        PublicNewsService.getAllPublicNews()
            .then(res => {
                // Filter news items based on category "animo-spotlight"
                const animoSpotlightNews = res.data.filter(news => news.category === 'animo-spotlight');
                // Update state with filtered news items
                this.setState({ animoSpotlightNews });
            })
            .catch(error => {
                console.error('Error fetching animo-spotlight news:', error);
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container mt-5">
                    <br />
                    <div className="row mt-4">
                        {/* Render filtered news items */}
                        {this.state.animoSpotlightNews.map(news => (
                            <div key={news.id} className="col-md-4 mb-3">
                                <div className="card">
                                    <img src={news.thumbnailUrl} className="card-img-top" alt="Thumbnail" />
                                    <div className="card-body">
                                        <h5 className="card-title">{news.title}</h5>
                                        <p className="card-text">{news.description}</p>
                                        {/* You can add more details if needed */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default AnimoSpotlight;
