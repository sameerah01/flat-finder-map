import Modal from "react-bootstrap/Modal";
import React, {useState} from 'react';

function getDetails({setAddDetails, rentalType, lat, lng, userdata}){
  const [error, setError] = useState('');
  const [inputData , setInputData] = useState({
    name: userdata ? userdata.name : '',
    telephone: userdata ? userdata.telephone : '',
    email: userdata ? userdata.email : '',
    propImage: userdata ? userdata.propImage : '',
    rentalType: userdata ? userdata.rentalType : rentalType,
  })

const inputsHandler = (e) =>{
  const { name, value , files} = e.target;
   setInputData((prevState) => ({
     ...prevState,
     [name]: files ? files : value,
   }));
}
const submitButton = async (e) =>{
  inputData.telephone = localStorage.getItem('userPhoneNumber').split('-')[1];
  console.log('inputData',inputData);
  debugger
  e.preventDefault();
  if(!inputData.name || !inputData.propImage){
    setError('Please Fill all the fields');
    return
  } else {
    setError('');
  }
  const data = new FormData();
  Object.keys(inputData).forEach((key) => {
    if(key === 'propImage'){
      for(var x = 0; x<inputData[key].length; x++) {
        data.append(key, inputData[key][x]);
      }
    } else {
      data.append(key, inputData[key]);
    }
  })
  if(userdata){
    try{
      data.append('_id', userdata._id);
      const res = await fetch('http://localhost:9000/updateUserData', {
        method: "PUT",
        body: data
      })
      location.reload();
      return
    } catch(e){
      console.log('error', e);
    }
    return
  }
  data.append('lat', lat);
  data.append('lng', lng);

  try{
    const res = await fetch('http://localhost:9000/postUserData', {
      method: "POST",
      body: data
    })
    setAddDetails(false);
    location.reload();
  } catch(e) {
    console.log('error', e);
  }
}
  return(
    <>
      <Modal
        show={true}
        onHide={() => {
          setAddDetails(false);
        }}
        data-wg-notranslate
        backdropClassName={"w-100"}
        dialogClassName={`m-0 address-popup h-50 modal-content-address`}
        centered
      >
      <Modal.Header className={`border-bottom-0 pb-0 pl-3 address-modal-title close pt-0`} closeButton>
        <Modal.Title
          className="font-weight-bold mt-0"
          id="contained-modal-title-vcenter"
        >
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
      <form action="/addUserData" method="POST" encType="multiport/form-data" onSubmit={(e) => handleSubmit(e)}>
        <input 
        className="bg-light user-details-input" 
        type="file" id="fileUploadBtn" 
        name="propImage"
        multiple
        onChange={inputsHandler} 
        required
        hidden
        />
        <label for="fileUploadBtn" 
        className="user-details-input w-50 bg-light pt-4" 
        style={{opacity: '0.7.5'}}>{inputData?.propImage?.length ? 'Selected' : 'Choose File'}</label>
        <span>{inputData?.propImage?.length + ` files selected`}</span>
        <input
        className="user-details-input"
        placeholder="Name"
        name="name"
        type="text"
        value={inputData?.name}
        required
        onChange={inputsHandler}
        />
        {inputData?.telephone && <input
        className="user-details-input"
        placeholder="Phone Number"
        name="telephone"
        value={inputData?.telephone}
        type="text"
        onChange={inputsHandler}
        />}
        <input
        className="user-details-input"
        placeholder="Email"
        name="email"
        value={inputData?.email}
        type="text"
        onChange={inputsHandler}
        />
        {error && <div className="text-danger ml-2">{error}</div>}
        <input type="submit" value="Submit" className="btn submit-button py-2 mt-2 bg-dark text-light w-50" onClick={submitButton}/>
      </form>
      </Modal.Body>
      </Modal>
    </>
  )
}

export default getDetails;


