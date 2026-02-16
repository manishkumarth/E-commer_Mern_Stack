
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home'
import Cart from '../pages/cart'
import Login from '../pages/login'
import Register from '../pages/register'
import FourZeroFour from '../pages/404'
import Orders from '../pages/orders'
import ProtectedRoute from './proteced_route'
import ForgotPassword from '../pages/forgot_password'
export const PageRouter = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Orders />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='*' element={<FourZeroFour />} />
      </Routes>

    </>
  )
}
