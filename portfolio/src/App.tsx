import { ReactElement } from 'react';
import Headline from './components/Headline';
import './App.css';

const App = (): ReactElement => (
    <Headline
        content="This is my headline"
        keywords={{ is: '#FF0000', headline: '#0000FF' }}
    />
);

export default App;
