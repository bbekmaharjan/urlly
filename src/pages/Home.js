import React from 'react'

import Header from '../components/Header';
import HomeForm from '../components/HomeForm';

function Home() {
  return (
    <div className="home">
        <Header/>
        <div className="home__wrapper">
            <div className="home__description">
                <p className="text-reg mb-tn">
                The Original URL Shortener
                </p>
                <p className="text-sm">
                Create shorter URLs with TinyURL.

                Want more out of your link shortener? Track link analytics, use branded domains for fully custom links, and manage your links with our paid plans.
                </p>
            </div>
            <HomeForm/>
        </div>
    </div>

  )
}

export default Home