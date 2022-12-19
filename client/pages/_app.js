import '../styles/globals.css'
import '../components/map/css/map.scss';
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
