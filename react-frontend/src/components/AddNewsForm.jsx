import React, { Component } from 'react';
import NewsService from '../services/NewsService';

class AddNewsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            thumbnailUrl: '',
            description: '',
            content: '',
            category: '', // Add category to the state
            categories: ['istorya', 'aranetalk', 'animo-spotlight', 'balitaraneta', 'silid-aralneta', 'animo-vodcast'] // Add available categories
        };
        
        // Bind event handlers
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeThumbnailUrlHandler = this.changeThumbnailUrlHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.saveOrUpdateNews = this.saveOrUpdateNews.bind(this);
    }

    componentDidMount() {
        const { id } = this.state;
    
        if (id !== '_add') {
            // Fetch news details if editing existing news
            NewsService.getNewsById(id).then(res => {
                let news = res.data;
                const author = localStorage.getItem('fullName'); // Fetch author from local storage
                this.setState({
                    title: news.title,
                    thumbnailUrl: news.thumbnailUrl,
                    description: news.description,
                    content: news.content,
                    category: news.category,
                    author: author // Set author from local storage
                });
            });
        } else {
            // Set author when adding new news
            const author = localStorage.getItem('fullName');
            this.setState({ author: author });
        }
    }
    


    saveOrUpdateNews(e) {
        e.preventDefault();
        const author = localStorage.getItem('fullName');
        const { id, title, thumbnailUrl, description, content, category } = this.state;
    
        const news = {
            title,
            thumbnailUrl,
            description,
            content,
            category,
            author // Include author in the news object
        };
    
        if (id === '_add') {
            NewsService.createNews(news).then(res => {
                this.props.history.push('/news');
            });
        } else {
            NewsService.updateNews(news, id).then(res => {
                this.props.history.push('/news');
            });
        }
    }

    changeTitleHandler(event) {
        this.setState({ title: event.target.value });
    }

    changeThumbnailUrlHandler(event) {
        this.setState({ thumbnailUrl: event.target.value });
    }

    changeContentHandler(event) {
        this.setState({ content: event.target.value });
    }

    changeDescriptionHandler(event) {
        this.setState({ description: event.target.value });
    }

    changeCategoryHandler(event) {
        this.setState({ category: event.target.value });
    }

    render() {
        return (
            <div>
                <header className="header">
                    <div>WEBTUBE NEWS CONTENT MANAGEMENT</div>
                </header>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">
                            <h3 className="text-center">{this.state.id === '_add' ? 'Add' : 'Update'} News</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input placeholder="Title" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Thumbnail URL:</label>
                                        <input placeholder="Thumbnail URL" name="thumbnailUrl" className="form-control"
                                            value={this.state.thumbnailUrl} onChange={this.changeThumbnailUrlHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea placeholder="Description" name="description" className="form-control"
                                            value={this.state.description} onChange={this.changeDescriptionHandler} rows={4} />
                                    </div>
                                    <div className="form-group">
                                        <label>Content:</label>
                                        <textarea placeholder="Content" name="content" className="form-control"
                                            value={this.state.content} onChange={this.changeContentHandler} rows={8} />
                                    </div>
                                    <div className="form-group">
                                        <label>Category:</label>
                                        <select className="form-control" value={this.state.category} onChange={this.changeCategoryHandler}>
                                            <option value="">Select Category</option>
                                            {this.state.categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateNews}>Save</button>
                                    <button className="btn btn-danger" onClick={() => this.props.history.push('/news')} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewsComponent;
