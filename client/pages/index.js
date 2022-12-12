import React from "react";
import Head from "next/head";
import Home from "../components/map/components/home.js"
import Script from 'next/script'

function map(){
    return(
        <>
          <head>
              <title>Map</title>
              <meta name="theme-color" content="#ffffff" />
              <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}></script>
          </head>
          <Home/>
        </>
    )
}


export default map;