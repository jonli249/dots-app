// pages/_app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* Rest of your app */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
