import { ReactElement } from 'react';
import Headline from './components/Headline';
import Collage from './components/Collage';
import './App.css';

import arXRay from './media/ar-x-ray.gif';
import tanks from './media/tanks.gif';
import soulSurvivor from './media/soul-survivor.gif';

const App = (): ReactElement => (
    <div>
        <Headline
            content="This is my headline"
            keywords={{ is: '#FF0000', headline: '#0000FF' }}
        />
        <Collage
            images={[arXRay, soulSurvivor, tanks]}
            layout={[
                [0, 1],
                [0, 2],
            ]}
        />
    </div>
);

export default App;
