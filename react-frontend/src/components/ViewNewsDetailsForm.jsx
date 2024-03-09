import React, { Component } from 'react';
import NewsService from '../services/NewsService';

class ViewNewsDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            news: {}
        };
    }

    componentDidMount() {
        NewsService.getNewsById(this.state.id).then(res => {
            this.setState({ news: res.data });
        });
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

    back(){
        this.props.history.push('/news');
    }
    render() {
        return (
            <div>
                <header className="header">
                    <div>WEBTUBE NEWS CONTENT MANAGEMENT</div>
                </header>
                <br></br>
               
            <button className="btn btn-danger" onClick={this.back.bind(this)} style={{ marginTop: "40px", marginLeft: "10px" }}>Back</button>

                <div className="card col-md-6 offset-md-3" id="container">
                    <h3 className="text-center"> More Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Date Created: </label>
                            <div> {this.formatDate(this.state.news.formattedCreatedAt)}</div>
                        </div>

                        <div className="row">
                            <label> Category: </label>
                            <div> {this.state.news.category}</div> {/* Add this line */}
                        </div>
                        
                        <div className="row">
                            <label> Title: </label>
                            <div> {this.state.news.title}</div>
                        </div>
                        <div className="row">
                            <label>Image:</label>
                            <img
                                src={this.state.news.thumbnailUrl}
                                alt="Thumbnail"
                                style={{ maxWidth: "300px" }} // Adjust the values as needed
                            />
                        </div>
                        <br />
                        <div className="row">
                            <label> Description: </label>
                            <div> {this.state.news.description}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label> Content: </label>
                            <div> {this.state.news.content}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label> Author: </label>
                            <div> {this.state.news.author}</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ViewNewsDetailsForm;
