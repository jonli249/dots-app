// pages/_app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import Footer from '../components/main/footer';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* Rest of your app */}
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
    
  );
}

export default MyApp;
