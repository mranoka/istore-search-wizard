import React from 'react';
import Home from '../Components/Home';
import Favorites from '../Components/Favorites';
import renderer from 'react-test-renderer';


test('Home renders correctly!', () => {
    const tree = renderer
        .create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
})
test('Favorites renders correctly!', () => {
    const tree = renderer
        .create(<Favorites />).toJSON();
        expect(tree).toMatchSnapshot();
})