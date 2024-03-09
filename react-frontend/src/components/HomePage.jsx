import React, { Component } from 'react';
import PublicNewsService from '../services/PublicNewsService';
import Header from './Header';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            showFooter: false // Add state variable to track footer visibility
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.fetchNews();
        window.addEventListener('scroll', this.handleScroll); // Add scroll event listener
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll); // Remove scroll event listener
    }

    fetchNews() {
        PublicNewsService.getAllPublicNews()
            .then(res => {
                this.setState({ newsList: res.data });
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }

    handleScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const bottomThreshold = 50; // Adjust as needed

        if (documentHeight - (scrollTop + windowHeight) < bottomThreshold) {
            this.setState({ showFooter: true });
        } else {
            this.setState({ showFooter: false });
        }
    }

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true
        };
        return new Date(dateString).toLocaleString('en-US', options);
    }

    render() {
        const { newsList } = this.state;

        // Determine the number of columns dynamically based on the number of items in the newsList
        const columnCount = newsList.length > 3 ? '4' : '6';

        return (
            <div>
                <Header />
                <div className="container mt-5">
                    <br />
                    <div className="row mt-4">
                        {newsList.map(news => (
                            <div key={news.id} className={`col-12 col-sm-6 col-md-${columnCount} mb-3`}>
                                <div className="card">
                                    <div style={{ maxHeight: '300px', overflow: 'hidden' }}> {/* Set maximum height and hide overflow */}
                                        <img
                                            src={news.thumbnailUrl}
                                            className="card-img-top"
                                            alt="Thumbnail"
                                            style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Set object-fit property
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{news.title}</h5>
                                        <p className="card-text">{news.description}</p>
                                        <p className="card-text">
                                            <small className="text-muted">{this.formatDate(news.formattedCreatedAt)}</small>
                                        </p>
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

export default HomePage;
