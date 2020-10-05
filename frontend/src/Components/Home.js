import React from 'react';
import 'isomorphic-fetch';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Music from './Music';
import Books from './Books';
import Favorites from './Favorites';
import Audiobook from './Audiobook';
import './Styles.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderSentinel: '',
            searchSentinel: '',
            music: '',
            books: '',
            media: '',
            search: '',
            results: '',
            favList: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMusicAdd = this.handleMusicAdd.bind(this);
        this.handleBooksAdd = this.handleBooksAdd.bind(this);
    }
    // adds music search results to favorites
    handleMusicAdd() {
        fetch('/postmusic', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                albumArt: this.state.results.artworkUrl100,
                artistName: this.state.results.artistName,
                songName: this.state.results.trackName,
                releaseDate: this.state.results.releaseDate
            })
        }).then(() => '', error => console.log(error));
        alert(`${this.state.results.trackName} added to Favorites`);


    }
    // adds music search results to favorites
    handleBooksAdd() {
        // add to databose if item is ebook
        if (this.state.results.kind === 'ebook') {
            fetch('/postbooks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    paperBack: this.state.results.artworkUrl100,
                    author: this.state.results.artistName,
                    title: this.state.results.trackName,
                    genres: this.state.results.genres,
                    releaseDate: this.state.results.releaseDate
                })
            }).then(() => '', error => console.log(error));
            alert(`${this.state.results.trackName} added to Favorites`);
        }
        // add to database if item is audiobook
        if (this.state.results.wrapperType === 'audiobook') {
            fetch('/postbooks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    paperBack: this.state.results.artworkUrl100,
                    author: this.state.results.artistName,
                    title: this.state.results.collectionName,
                    genres: this.state.results.primaryGenreName,
                    releaseDate: this.state.results.releaseDate
                })
            }).then(() => '', error => console.log(error));
            alert(`${this.state.results.collectionName} added to Favorites`);
        }
    }
    // fetches data with specified media and search parameters when called
    fetchFile() {
        fetch(`/get/${this.state.search},${this.state.media}`)
            .then(apiRes => apiRes.json())
            .then(response => {
                this.setState({
                    results: response
                })
            }, err => console.log(err))
    }

    // handles search request by user: fetches data related to info entered in search
    // bar.
    handleSearch(e) {
        e.preventDefault();
        // if search bar is empty when user clicks search
        // button, nothing should happen
        if (this.state.search === '' && this.state.media) {
            return;
            // if search bar is populated, make fetch request
            // and set value for searchSentinel
        } else {
            this.setState({
                searchSentinel: '1'
            })
            this.fetchFile();
        }
    }
    // handles input of item of interest into search bar
    // and sets state item 'search' to it
    handleInput(e) {
        this.setState({
            search: e.target.value
        })
    }
    // handles selection of media catergory from options
    handleCategory(e) {
        this.setState({
            media: e.target.value
        })
    }

    render() {
        return (
            <Container id='home-container'>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title id='title-home'><span id='istore'>iStore</span> <br /><span id='buscar'>Search</span> <br /> <span id='bruja'>Wizard</span></Card.Title>
                        <Card.Text>
                            <input id='search-bar' type='text' onChange={this.handleInput} value={this.state.search} placeholder='Search' />
                            <br />
                            <label>
                                Please select category: <span></span>
                            </label>
                            <select onClick={this.handleCategory} name='categories' id='categories'>
                                <option>None</option>
                                <option value='ebook'>Ebook</option>
                                <option value='audiobook'>Audiobook</option>
                                <option value='music'>Music</option>
                                <option value='podcast'>Podcast</option>
                                <option value='musicVideo'>Music Video</option>
                                <option value='tvShow'>TV Show</option>
                                <option value='software'>Software</option>
                            </select>
                            <br />
                            <small>Please select a category before searching</small>
                        </Card.Text>
                        <Button id='home-search' onClick={this.handleSearch} variant="primary">Search</Button>
                    </Card.Body>
                </Card>
                {this.state.media !== 'ebook' && this.state.media !== 'audiobook' && this.state.media && this.state.results ?
                    <Music albumArt={this.state.results.artworkUrl100}
                        artistName={this.state.results.artistName}
                        songName={this.state.results.trackName}
                        releaseDate={this.state.results.releaseDate}
                        handleAdd={this.handleMusicAdd}
                    /> : ''}
                {this.state.media === 'audiobook' && this.state.results ?
                    <Audiobook coverArt={this.state.results.artworkUrl100}
                        artist={this.state.results.artistName}
                        collection={this.state.results.collectionName}
                        preview={this.state.results.previewUrl}
                        release={this.state.results.releaseDate}
                        handleAdd={this.handleBooksAdd}
                    /> : ''}
                {this.state.media === 'ebook' && this.state.results ?
                    <Books paperBack={this.state.results.artworkUrl100}
                        author={this.state.results.artistName}
                        title={this.state.results.trackName}
                        genres={this.state.results.genres}
                        releaseDate={this.state.results.releaseDate}
                        handleAdd={this.handleBooksAdd}
                    /> : ''}

                {this.state.searchSentinel === '1' && this.state.results === '' ? <h1>Item Not Found. Please Try Again</h1> : ''}
                {this.state.renderSentinel && <Favorites favList={this.state.favList} />}
            </Container>
        );
    }
}