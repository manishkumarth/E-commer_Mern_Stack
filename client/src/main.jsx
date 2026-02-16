import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import SearchProvider from './context/searchcontext.jsx'
const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <SearchProvider>
        <App />
      </SearchProvider>
      <ReactQueryDevtools initilIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)
