import './App.css';
import Footer from './component/footer';
import Header from './component/header';
import { BrowserRouter } from 'react-router-dom';
import { PageRouter } from './routes/routers';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCart } from './features/cart';
import { setUser } from './features/auth_slice'
import { useEffect } from 'react';
import { getProfile, getUserCart } from './services/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // ✅ Step 1: Get user
        const userRes = await getProfile();
        const userData = userRes.data;

        dispatch(setUser({
          isAuth: true,
          role: userData.role,
          user: userData
        }));

        // ✅ Step 2: Get cart (only for user role)
        if (userData.role === "user") {
          const cartRes = await getUserCart();
          dispatch(setCart(cartRes.data.cart));
        }

      } catch (err) {
        console.log(err);
      }
    };

    initApp();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-16 md:pt-18 relative z-10">
            <PageRouter />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;