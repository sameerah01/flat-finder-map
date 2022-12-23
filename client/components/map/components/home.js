import { useState, useEffect, useRef } from "react";
import AddDetails from './addDetails';
import Details from './showDetails';

function home(){
  const mapRef = useRef();
  const [mapClicked, setMapClicked] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [service, setService] = useState({});
  const [showSearchRes, setShowSearchRes] = useState(false);
  const [geoCoder, setGeoCoder] = useState({});
  const [mapInit, setMapInit] = useState(false);
  const [placeId, setPlaceId] = useState('');
  const [addDetails, setAddDetails] = useState(false);
  const [rentalType, setRentaltType] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [allUsersData, setAllUsersData] = useState([]);
  const [showDetails, setShowDetails] = useState({show: false});
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postAdClick, setPostAdClick] = useState(false);
  const [showRentalOptions, setShowRentalOptions] = useState(false);
  const [drawer, setDrawer] = useState(false);

  let map;
  let marker;

  useEffect(() => {
    getLocations();
  },[])

  useEffect(() => {
    setPhoneNumber(localStorage.getItem('userPhoneNumber'))
  },[])

  useEffect(() => {
    // setLat(map.getCenter().lat());
    // setLng(map.getCenter().lng());
  },[])

  useEffect(() =>{
    setService(new google.maps.places.AutocompleteService());
    setGeoCoder(new google.maps.Geocoder());
    map = new google.maps.Map(mapRef.current ? mapRef.current : backMapRef.current, {
      zoom: 17,
      disableDefaultUI: true,
    });
    map?.addListener('click', (e) => {
      mapClicked ? null : setMapClicked(true);
      setLat(e.latLng.lat);
      setLng(e.latLng.lng);
      // marker.setPosition(e.latLng);
    })
    // marker = new google.maps.Marker({
    //   map: map,
    //   draggable: true,
    //   optimized: true ,
    //   title: 'marker'
    // });
    map.addListener('dragend',() => {
      setLat(map.getCenter().lat());
      setLng(map.getCenter().lng());
    })
    // marker?.addListener('dragend', function(e) {
    //   marker.setPosition(e.latLng);
    // });
    // map.addListener('center_changed', () => {

    // })
    getCurrentLocation(placeId);
    addMarker(allUsersData);
  }, [mapInit])

  const getCurrentLocation = (placeId) => {
    console.log('placeId',placeId);
    console.log('navigator',navigator);
    if(placeId){
      geocodePosition(placeId)
    } else {
    if(navigator.geolocation) {
      console.log('navigator.geolocationAAA',navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('position',position);
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          setLat(pos.lat);
          setLng(pos.lng);
          // marker.setPosition(pos);
        }, (error) => {
          console.log('error in getCurrentPosition', error);
        }
      );
    }
    }
  }

  const addMarker = (markerList) => {
    let tenentIcon = 'http://13.233.25.67:9000/uploads/tenentIcon.png';
    let ownerIcon = 'http://13.233.25.67:9000/uploads/ownerIcon.png';
    let halfOwnerIcon = 'http://13.233.25.67:9000/uploads/halfOwnerIcon.png';
    let userLocIcon = 'http://13.233.25.67:9000/uploads/userLocIcon.png'
    let phoneNumber = localStorage.getItem('userPhoneNumber');
    markerList.forEach((item) => {
      const marker = new google.maps.Marker({
        map: map,
        icon : item.telephone === phoneNumber ? userLocIcon : item.rentalType === 'halfOwner' ? halfOwnerIcon : item.rentalType === 'owner' ? ownerIcon : tenentIcon,
      });
      const pos = {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng)
      };
      marker.setPosition(pos);
      marker?.addListener('click', function(e) {
        setShowDetails({show: true, latlng : e.latLng});
      });
    })
  }

  const geocodePosition = (pos, property) => {
    geoCoder.geocode({
      placeId : pos,
    }, function(responses) {
      if (responses && responses.length > 0) {
        // marker?.setPosition(responses[0].geometry.location)
        map?.setCenter(responses[0].geometry.location);
      }
    });
  }

  const getLocations = async() => {
    const data = await fetch("http://13.233.25.67:9000/getUserData");
    data.json().then((res) => {
      setAllUsersData(res);
      addMarker(res);
    })
  }

  const handleAddDetails = async(userType) => {
    setAddBtnClicked(true);
  }

  const inputsHandler = (e) => {
    const {name, value} = e.target;
    setRentaltType(value);
  }

  const openLinkedIn = () => {
    window.location.href = "https://www.linkedin.com/in/sameer-ahmed-764470150/"
  }

  // const getImages = async() => {
  //   const data = await fetch("http://13.233.25.67:9000/getUserData")
  //   data.json().then((res) => {
  //     setImgUrl("http://13.233.25.67:9000/" + res[0].propImage[1].path);
  //   })
  // }

    return (
        <>
          <div>
            <div className={`mapClass position-absolute w-100 ${postAdClick ? 'markerClass' : ''}`} style={{justifyContent : 'center', height: '100vh'}} ref={mapRef}></div>
            <div className="d-inline-flex flex-row w-100 position-absolute">
              <div className="mt-5 menu" onClick={() => {setDrawer(true)}}>
                <hr className="menu-line mt-3"></hr>
                <hr className="menu-line"></hr>
                <hr className="menu-line"></hr>
              </div>
              
              <div id="mySidenav" class="sidenav" style={drawer ? {width: '280px'} : {width: '0px'}}>
                <div class="closebtn" onClick={() => {setDrawer(false)}}>&times;</div>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <div className="d-flex">
                  <div onClick={openLinkedIn}>
                    <img className="ml-4 bg-light" src="http://13.233.25.67:9000/uploads/linkedin-1.png" height="22px" width="22px"/>
                  </div>
                  <img className="ml-2 bg-light mt-1" src="http://13.233.25.67:9000/uploads/email-3.png" height="22px" width="22px"/>
                  <div className="text-light contact-email mt-2">01ahmedsameer@gmail.com</div>
                </div>
                <div></div>
              </div>
              <input
                placeholder="Search..."
                name="address"
                type="text"
                className="mt-5 search-input font-size-14"
                onChange = {(e) => {
                  if(!e.target.value){
                    setShowSearchRes(false);
                  } else {
                    setShowSearchRes(true);
                  }
                  service?.getPlacePredictions(
                  {
                    input: e.target.value,
                  },
                  function (predictions = null, status) {
                    setAddressList(predictions);
                  }
                );}}
              />
            </div>
            <div className="search-card">
            {addressList && showSearchRes && addressList.map((address, index) => {
              return (
                <>
                  <div className="search-result"
                  onClick={() => {
                    setMapInit(!mapInit);
                    setPlaceId(address.place_id);
                    setShowSearchRes(false);
                  }}
                  >
                  {address.description}
                </div>
                <hr></hr>
                </>
              )
            })}
            </div>
            <div className="position-absolute w-100" style={{bottom: '0'}}>
                {showRentalOptions ? <form className="options-btn bg-dark">
                  <div className="text-light rental-option">Choose any one option</div>
                  <div className="ml-4">
                    <div class="form-check my-2">
                      <input class="form-check-input" type="radio" value="owner" name="rentalType" id="owner" onChange={inputsHandler}/>
                      <label class="form-check-label text-light" for="rentalType">
                        Have a house and looking for tenent ?
                      </label>
                    </div>
                    <div class="form-check my-2">
                      <input class="form-check-input" type="radio" value="halfOwner" name="rentalType"  id="halfOwner" onChange={inputsHandler}/>
                      <label class="form-check-label text-light" for="rentalType">
                        Already rented a house and looking for flatmate ?
                      </label>
                    </div>
                    <div class="form-check my-2">
                      <input class="form-check-input" type="radio" value="tenent"  name="rentalType" id="tenent" onChange={inputsHandler}/>
                      <label class="form-check-label text-light" for="rentalType">
                        Looking for full house / flatmate ?
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    {rentalType ? <button className="rental-option-cont btn my-3" onClick={(e) => {e.preventDefault();setAddDetails(true)}}>Continue</button> : <div style={{height: '70px'}}></div>}
                  </div>
                  </form> : postAdClick ? <button className="done-btn bg-dark" onClick={() => {
                      setShowRentalOptions(true);
                    }}>Done</button> : (<div>
                    <div className="p-2 mb-2" style={{fontSize: '12px', backgroundColor: 'white', opacity: '0.6'}}>Didn't find the location you are looking for? Click below and drop your location for others to reach out to you.</div>
                    {phoneNumber ? <div>
                      <button className="postAdBtn bg-dark text-light px-0" onClick={() => {setPostAdClick(true)}}>Post an Ad</button>
                    </div> : (
                    <div>
                      <button className="postAdBtn bg-dark text-light">Sign in to post an Ad</button>
                      <button className="signInBtn btn px-3" onClick={() => {window.location.href = '/sign-in'}}>Sign in</button>
                    </div>
                )}</div>)}
              </div>
           {addDetails && <AddDetails setAddDetails={setAddDetails} rentalType={rentalType} lat={lat} lng={lng} userdata={{telephone: phoneNumber}}/>}
           {showDetails.show && <Details allUsersData={allUsersData} showDetails={showDetails} setShowDetails={setShowDetails}/>}
          </div>
        </>
    )
}

export default home;