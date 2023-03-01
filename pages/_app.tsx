import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { FlagsmithProvider } from 'flagsmith/react';
import flagsmith from 'flagsmith/isomorphic';

function App({ Component, pageProps, flagsmithState }: AppProps & { flagsmithState: any }) {
  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
    <Component {...pageProps} />
    </FlagsmithProvider>
  ) 
}

App.getInitialProps = async () => {
  // this could be getStaticProps too depending on your build flow
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  await flagsmith.init({
   // fetches flags on the server
   environmentID: '3HtwKgqSkpYN2yWBGffapb',
   identity: 'my_user_id', // optionaly specify the identity of the user to get their specific flags
  });
  return { flagsmithState: flagsmith.getState() };
 };
 
 export default App;