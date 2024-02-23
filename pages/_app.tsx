// pages/_app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import Footer from '../components/main/footer';
import { ChakraProvider } from '@chakra-ui/react';





function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
      <div className='flex flex-col justify-between min-h-screen overflow-hidden'>
        <Component {...pageProps} />

        </div>
        </ChakraProvider>
      <Footer />
      
      
    </SessionProvider>
    
  );
}

export default MyApp;
