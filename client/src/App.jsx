import "./index.css"
import { Route, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import PostGame from "./components/PostGame/PostGame";
import About from "./components/About/About";

function App() {
  

  return (
    < >
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/post" element={<PostGame />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
