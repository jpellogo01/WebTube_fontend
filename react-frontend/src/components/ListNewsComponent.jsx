import React, { Component } from 'react';
import axios from 'axios';
import NewsService from '../services/NewsService';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newss: []
        };
        this.addNews = this.addNews.bind(this);
        this.editNews = this.editNews.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
    }

    deleteNews(id) {
        NewsService.deleteNews(id).then(res => {
            this.setState({ newss: this.state.newss.filter(news => news.id !== id) });
        });
    }

    viewNews(id) {
        this.props.history.push(`/view-news/${id}`);
    }

    editNews(id) {
        this.props.history.push(`/add-news/${id}`);
    }

    addNews() {
        this.props.history.push('/add-news/_add');
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        try {
            const role = localStorage.getItem('role'); // Fetch user role from local storage
            const author = role === 'AUTHOR' ? localStorage.getItem('fullName') : null; // Fetch author only if the user role is AUTHOR
            const newsresponse = await axios.get("http://localhost:8080/api/v1/news");
            let filteredNews = newsresponse.data;
            if (role === 'AUTHOR') {
                // Filter news items to display only those authored by the current user
                filteredNews = filteredNews.filter(news => news.author === author);
            }
            this.setState({ newss: filteredNews, loading: false });
        } catch (error) {
            console.error('Error fetching news data:', error);
            this.setState({ newss: [], loading: false });
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

    logout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        localStorage.removeItem('role'); // Remove the role from local storage
        // Redirect to the login page or any other appropriate page
        this.props.history.push('/login'); // Assuming '/login' is the route for your login page
    };

    render() {
        return (
            <div>
                <header className="header">
                    <div>WEBTUBE CONTENT MANAGEMENT</div>
                    <button onClick={this.logout} className="logout-button">
                        Logout
                    </button>
                </header>
                <div className="body">
                    <button className="bntAction" onClick={this.addNews}> Add News</button>
                    <br></br>
                    <div className="row scrollable-div">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Title</th>
                                    <th> Description</th>
                                    <th> Author</th>
                                    <th> Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(this.state.newss) && this.state.newss.map(news => (
                                    <tr key={news.id}>
                                        <td style={{ maxWidth: "200px", overflowWrap: "break-word" }}>{news.title}</td>
                                        <td style={{ maxWidth: "200px", overflowWrap: "break-word" }}>{news.description}</td>
                                        <td>{news.author}</td>
                                        <td>{this.formatDate(news.formattedCreatedAt)}</td>
                                        <td>
                                            <button onClick={() => this.editNews(news.id)} className="bntAction">Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this user?")) {
                                                    this.deleteNews(news.id);
                                                }
                                            }} className="bntAction" id="btnDel">Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => this.viewNews(news.id)} className="bntAction" >View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer className="footer">
                    <span className="">"Stay Connected with WebTube for the Latest Updates from De La Salle Araneta University!"</span>
                    <br></br>
                    <span className="">All Rights Reserved 2024 @JOHN PAUL PELLOGO</span>
                </footer>
            </div>
        )
    }
}

export default ListUserComponent;
