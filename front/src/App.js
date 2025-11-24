
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Provider} from 'react-redux';
import { store } from './store/index.ts';
import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import Encoder from './pages/encoder/encoder.tsx';

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className='app'>
          <Header/>

          <div className='main-content'>
            <Routes>
              {/* <Route path='/profile'element={<Profile/>}/> */}
              {/* <Route path='/login'element={<Login/>}/> */}
              {/* <Route path='/registration'element={<Registration/>}/> */}
              <Route path='/encoder'element={<Encoder/>}/>
              <Route path='/decoder'element={<Encoder/>}/>
              {/* <Route path='/results'element={<Result/>}/> */}
            </Routes>
          </div>

          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
