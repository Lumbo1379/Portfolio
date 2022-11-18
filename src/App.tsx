import { ReactElement } from 'react';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (): ReactElement => (
    <>
        <ToastContainer />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Portfolio" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    </>
);

export default App;
