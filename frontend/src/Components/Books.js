import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }
    // executes handleBooksAdd method that is passed from Home components
    handleAdd() {
        this.props.handleAdd()
    }

    render() {
        return (
            <Container id='books-container'>
                <Card id='card-body-books'>
                    <Card.Img id='paperback' variant="top" src={this.props.paperBack} />
                    <Card.Body>
                        <Card.Title id='author'>{this.props.author}</Card.Title>
                        <ul>
                            <Card.Text id='stats-list'>

                                <li>Title: {this.props.title}</li>
                                <li>Genres: {this.props.genres}</li>
                                <li>Release Date: {this.props.releaseDate}</li>

                            </Card.Text>
                        </ul>
                        <Button onClick={this.handleAdd} variant="primary">ADD TO FAVORITES</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

}