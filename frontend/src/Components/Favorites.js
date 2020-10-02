import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './Styles.css';

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }
    // handles deletion of selected item
    handleDelete(e) {
        fetch('/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemName: e.target.value
            })
        }).then(() => '', err => console.log(err));
        alert(`${e.target.value} has been DELETED!`)
        window.location.reload();
    }
    // retrieves data and music that user has added to favorites

    // retrieves data each time component mounts
    componentDidMount() {
        fetch('/get').then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({
                    list: response
                })
            }, error => console.log(error));
    }

    render() {
        // compile items in database into a list
        const favItems = this.state.list.map((item, index) => {
            return (
                <>
                    {item.albumArt &&
                        <>
                            <Container className='fav-container'>
                                <div>
                                    <img src={item.albumArt} alt={item.songName} />
                                </div>
                                <ul className='fav-text'>
                                    <li key={index + 10} className='data-list'>{item.artistName}</li>
                                    <li key={index + 12} className='data-list'>{item.songName}</li>
                                    <li key={index + 14} className='data-list'>{item.releaseDate}</li>
                                </ul>
                                <Button onClick={this.handleDelete} value={item.songName} variant="danger">Delete</Button>
                                <hr />
                            </Container>
                        </>
                    }

                    {item.paperBack &&

                        <>
                            <Container className='fav-container'>
                                <div>
                                    <img src={item.paperBack} alt={item.title} />
                                </div>
                                <ul className='fav-text'>
                                    <li key={index + 1} className='data-list'>{item.author}</li>
                                    <li key={index + 2} className='data-list'>{item.title}</li>
                                    <li key={index + 4} className='data-list'>{item.releaseDate}</li>
                                </ul>
                                <Button onClick={this.handleDelete} value={item.title} variant="danger">Delete</Button>
                                <hr />
                            </Container>
                        </>}


                </>
            )

        })
        return (
            <div>
                {favItems}
            </div>
        );
    }

}