
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Provider} from 'react-redux';
import { store } from './store/index.ts';
import Login from './pages/login/login.tsx';
import Encoder from './pages/encoder/encoder.tsx';
import Result from './pages/results/result.tsx';
import Profile from './pages/profile/profile.tsx';
import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import Registration from './pages/registration/registration.tsx';

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className='app'>
          <Header/>

          <div className='main-content'>
            <Routes>
              <Route path='/profile'element={<Profile/>}/>
              <Route path='/login'element={<Login/>}/>
              <Route path='/registration'element={<Registration/>}/>
              <Route path='/encoder'element={<Encoder/>}/>
              <Route path='/decoder'element={<Encoder/>}/>
              <Route path='/results'element={<Result/>}/>
            </Routes>
          </div>

          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
