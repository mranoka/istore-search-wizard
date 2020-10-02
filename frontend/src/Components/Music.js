import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Styles.css';


export default class Music extends React.Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
    }
    // executes handleMusicAdd method that is passed from Home component
    handleAdd() {
        this.props.handleAdd();
    }

    render() {
        return (
            <Container id='music-container'>
                <Card id='card-body-music'>
                    <Card.Img id='album-art' variant="top" src={this.props.albumArt} />
                    <Card.Body>
                        <Card.Title id='artistName'>{this.props.artistName}</Card.Title>
                        <Card.Text id='item-stats'>
                            {this.props.songName} <br />
                            {this.props.releaseDate}
                        </Card.Text>
                        <Button onClick={this.handleAdd} variant="primary">ADD TO FAVORITES</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

}