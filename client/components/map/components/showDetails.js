import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from 'react';
import AddDetails from './addDetails';
import Head from 'next/head';

function showDetails({allUsersData, showDetails, setShowDetails}){
  const [userData, setUserData] = useState({});
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  useEffect(() => {
    allUsersData.forEach((item) => {
      if(item.lat == showDetails.latlng.lat() && item.lng == showDetails.latlng.lng()){
        setUserData(item);
      }
    })
  },[])

  const editDetails = () => {
    setShowUpdateDetails(true);
  }

  const deleteDetails = async () => {
    try{
      const res = await fetch('http://localhost:9000/deleteUserData' + '/' + userData._id, {
        method: "DELETE",
      })
      location.reload();
    }catch(e){
      console.log('error', e);
    }
  }

  return(
    <>
      <Head>
        <script src="https://kit.fontawesome.com/6d46745ffb.js" crossorigin="anonymous"></script>
      </Head>
      <Modal
        show={showDetails.show && !showUpdateDetails}
        onHide={() => {
          setShowDetails({...showDetails, show: false});
        }}
        data-wg-notranslate
        backdropClassName={"w-100"}
        dialogClassName={`m-0 address-popup h-50 modal-content-address`}
        centered
      >
      <Modal.Header className={`border-bottom-0 pb-1 pl-3 pt-1 close text-light`} closeButton>
        <Modal.Title
          className="font-weight-bold mt-0"
          id="contained-modal-title-vcenter"
        >
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div>
          <div>
            <div className="d-flex" style={{overflow: 'overlay hidden'}}>
            {userData?.propImage?.map((item) => {
              return (
                <div className="mr-1" style={{border: '3px solid white'}}>
                  <img src={`http://localhost:9000/${item.path}`} style={{maxHeight:"200px", maxWidth:"250px"}}/>
                </div>)
              })}
            </div>
            <div className="btn bg-light mt-4 w-100">
              {userData.telephone === localStorage.getItem('userPhoneNumber').split('"')[1] && <div className="d-flex">
                  <button className="btn text-light bg-dark" style={{marginLeft: '62%'}} onClick={() => {editDetails()}}>Edit</button>
                  <button className="btn text-light bg-dark ml-2"  onClick={() => {deleteDetails()}}>Delete</button>
                </div>}
              <div className="font-size-16 font-weight-bold d-flex mt-2" >
                <i className="fas fa-user mr-2"></i>
                <div>{userData.name}</div>
              </div>
              <div className="font-size-16 font-weight-bold d-flex mt-2">
                <i className="fas fa-phone mr-2"></i>
                <div className="mb-1">{userData.telephone}</div>
              </div>
              <form action={`https://www.google.com/maps/search/${userData.lat},${userData.lng}`}>
                <input className="btn submit-button py-2 mt-2 bg-dark text-light w-50" type="submit" value="Get direction" style={{left: '0'}}/>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
      </Modal>
      {showUpdateDetails && <AddDetails setAddDetails={setShowUpdateDetails} userdata={userData}/>}
    </>
  )
}


export default showDetails;