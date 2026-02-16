import './App.css'
import Footer from './component/footer'
import Header from './component/header'
import { BrowserRouter } from 'react-router-dom'
import { PageRouter } from './routes/routers'
import {Toaster} from 'react-hot-toast'

function App() {


  return (
    <>
      <BrowserRouter >
      <Toaster />
        <Header />
        <div className=''>
          <PageRouter />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
