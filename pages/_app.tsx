// pages/_app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import Footer from '../components/main/footer';




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* Rest of your app */}
      <div className='flex flex-col min-h-screen'>
        <div className="flex-grow">
        <Component {...pageProps} />
        </div>
        </div>
      <Footer />
      
      
    </SessionProvider>
    
  );
}

export default MyApp;
