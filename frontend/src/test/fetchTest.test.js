
import 'isomorphic-fetch';

test('Testing fetch request for functionality', async () => {
    let data = await fetch(`https://itunes.apple.com/search?term=drake&media=music`)
        .then(res => res.json());

        expect(typeof data).toBe('object')

});