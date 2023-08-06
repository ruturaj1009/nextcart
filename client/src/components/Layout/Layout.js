import React from 'react'
import Footer from './Footer';
import Header from './Header';
import {Helmet} from 'react-helmet';


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
      <meta charset="UTF-8" />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='author' content={author} />
      <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight:"87.5vh"}}>
        
        {children}
      </main>
      <Footer/>
    </div>
  );
};

Layout.defaultProps = {
  title:"NΞXTCΛRT",
  description:"app development phase",
  keywords:"mern,node,express,react,node",
  author:"Ruturaj Sahu"
};

export default Layout
