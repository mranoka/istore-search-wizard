import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default class Audiobook extends React.Component {
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
                    <Card.Img id='paperback' variant="top" src={this.props.coverArt} />
                    <Card.Body>
                        <Card.Title id='author'>{this.props.artist}</Card.Title>
                        <ul>
                            <Card.Text id='stats-list'>

                                <li>Title: {this.props.collection}</li>
                                <li><a href={this.props.preview} target='_blank' rel="noopener noreferrer">Preview</a></li>
                                <li>Release Date: {this.props.release}</li>

                            </Card.Text>
                        </ul>
                        <Button onClick={this.handleAdd} variant="primary">ADD TO FAVORITES</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

}