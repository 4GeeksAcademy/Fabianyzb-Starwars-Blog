import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './component/scrollToTop'
import injectContext from './store/appContext'

import Home from './views/Home.jsx'
import Navbar from './component/Navbar.jsx'
import Footer from './component/Footer.jsx'
import NotFound from './views/NotFound.jsx'
import Details from './views/Details.jsx'

const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || ''

  return (
    <div>
      <div className='bg'></div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/character/:uid'
              element={
                <Details type='character' key={document.location.href} />
              }
            />
            <Route
              path='/planet/:uid'
              element={<Details type='planet' key={document.location.href} />}
            />
            <Route
              path='/vehicle/:uid'
              element={<Details type='vehicle' key={document.location.href} />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)
