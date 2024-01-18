import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

function HomeForm() {

    const [longUrl, setLongUrl] = useState('');
    const [urlDesc, setUrlDesc] = useState('');
    const [shortUrl, setShortUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        // Further form validation can be implemented for the links and 
        setIsLoading(true);
        if(longUrl.length > 0) {
            await fetch("https://api.tinyurl.com/create", {
               method: "POST",
               headers: {
                 Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                   "url": longUrl,
                   "domain": "tinyurl.com",
                   "description": urlDesc,
                //    "alias": "customurl" Alias is not working for the custom link. Refer to the https://tinyurl.com/app/dev
                 }),
             }).then(response => response.json())
             .then(data =>{ 
                setIsLoading(false);
                setShortUrl(data.data.tiny_url); 
                toast.success("Link successfully shortened");
                setUrlDesc('');    
            })
             .catch((e) => {toast.error(e.error); setIsLoading(false)})
               
               
        }else {
            toast.error('Please enter the long url');
            setIsLoading(false);
        }
   }   

   const handleSubmitAgain = () => {
    setLongUrl('');        
    setShortUrl(null);    
   }

  return (
    <>
        <div className="home__form-wrapper">
            {
                shortUrl ?
                <div className="home__result">
                    <p className="text-med mb-sm">Long URL: <span className="home__url">{longUrl}</span> </p>
                    <p className="text-med mb-md">Short URL: <span className="home__url">{shortUrl}</span> </p>
                    <button onClick={handleSubmitAgain} className="home__btn">Shorten again</button>
                </div>
                :
                <div className="home__form">
                    <input type="text" className='home__input mb-sm' placeholder='Enter Long URL' onChange={(e) => setLongUrl(e.target.value)} required/>
                    <input type="text" className='home__input mb-md' placeholder='Enter URL Description' onChange={(e) => setUrlDesc(e.target.value)}/>
                    <button onClick={handleSubmit} className="home__btn" disabled={isLoading}>Shorten it</button>
                </div>
            }
            
        </div>
        <ToastContainer/>
    </>
  )
}

export default HomeForm