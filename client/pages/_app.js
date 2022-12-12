import '../styles/globals.css'
import '/Users/Sameer/Documents/code/location-db/client/components/map/css/map.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  UserContextProvider } from "../components/map/context/useUserAuth";

function MyApp({ Component, pageProps }) {
  return( 
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
