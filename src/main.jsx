import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createHashRouter, RouterProvider} from "react-router-dom"
import initReactFastclick from 'react-fastclick'
import store from '@assets/store.js'
import App from './App.jsx'
import Popular from '@components/popular/Popular.module.jsx'
import SearchResult from '@components/searchResult/SearchResult.module.jsx'
import FilmPage from '@components/filmPage/filmPage.module.jsx'
import WatchPage from '@components/watchPage/WatchPage.module.jsx'
import SelectedPage from '@components/selectePage/SelectedPage.module.jsx'
import PersonPage from '@components/personPage/PersonPage.module.jsx'
import Categories from './assets/components/categories/Categories.module.jsx'
import NotFoundPage from './assets/components/notFoundPage/NotFoundPage.module.jsx'
import './index.scss'

initReactFastclick()

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Popular />,
      },
      {
        path: '/films/search/:name',
        element: <SearchResult />
      },
      {
        path: '/films/:id',
        element: <FilmPage />
      },
      {
        path: '/films/:id/watch',
        element: <WatchPage />
      },
      {
        path: '/films/selected/',
        element: <SelectedPage />
      },
      {
        path: '/staff/:id',
        element: <PersonPage />
      },
      {
        path: '/categories/:id',
        element: <Categories />
      },
      {
        path: "/*",
        element: <NotFoundPage />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} basename="/sm2/" />
  </Provider>,
)
