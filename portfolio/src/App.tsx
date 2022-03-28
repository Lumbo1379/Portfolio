import { Fragment } from 'react';
import Headline from './components/Headline';
import './App.css';

function App() {
  return (
    <Fragment>
      <Headline content="This is my headline" keywords={{ "is": "#FF0000", "headline": "#0000FF" }} />
    </Fragment>
  );
}

export default App;
