import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/Post/SignIn';
import SignUp from './components/Post/Post'
import Header from './components/Header/Header';
import PostImage from './components/Header/PostImage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/HomePage' element={<Header />} />
          <Route path='/post' element={<PostImage />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
