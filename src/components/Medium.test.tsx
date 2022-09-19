import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow, ShallowWrapper } from 'enzyme';

import Medium from './Medium';

describe('<Medium />', () => {
    const TAG_RETURN_DATA = [
        [
            {
                description: 'C++',
                colour: '#F5CAC3',
            },
        ],
        [
            {
                description: 'Firebase',
                colour: '#84A59D',
            },
            {
                description: 'Authentication',
                colour: '#BDB8B0',
            },
        ],
    ];

    const TAGS = [
        ['C++'],
        ['Firebase', 'Authentication'],
    ];

    it('returns tags', async () => {
        // const axiosMock = new MockAdapter(axios);

        // axiosMock.onPost('/tags', { tags: TAGS }).reply(200, TAG_RETURN_DATA);

        // const tags = await getTags(TAGS);

        // expect(tags).toEqual(TAG_RETURN_DATA);
    });
});
