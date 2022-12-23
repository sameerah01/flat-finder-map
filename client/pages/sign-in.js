import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { getAuth } from "firebase/auth";
import { useAuthContext } from '../components/map/context/useUserAuth';

export default function SignIn(props) {
  const [number, setNumber] = useState('');
  const { mobileSignIn } = useAuthContext();
  const [signInResponse, setSignInResponse] = useState('');
  const [otp, setOtp] = useState('');
  const [numberError, setNumberError] = useState('');
  const [otpError, setOtpError] = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();
    if(!number){
      setNumberError('Please enter your Phone number')
      return
    } else {
      setNumberError('');
    }
    let phoneNumber = number;
    if(!phoneNumber.includes('+91')){
      phoneNumber = '+91' + phoneNumber;
    }
    try{
        const response = await mobileSignIn(phoneNumber);
        setSignInResponse(response);
    } catch(e) {  
        console.log('error', e);
        setNumberError('Enter valid phone number');
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault();
    if(!otp){
      setOtpError('Please enter OTP')
      return;
    } else {
      setOtpError('');
    }
    try{
        const res = await signInResponse.confirm(otp);
        localStorage.setItem('userPhoneNumber', res.user.phoneNumber)
        window.location = "/";
    } catch(error) {
        console.log('error', error);
        setOtpError('Invalid OTP');
    }
  }

  return(
    <>
      <div style={{backgroundColor: '#f3f3f3', height: '100vh'}} >
        <div className='d-flex align-items-center flex-column'>
          {!signInResponse ? <Form onSubmit={sendOtp} className="w-75">
            <input
              placeholder='Enter Phone Number'
              className='login badge-pill'
              value={number}
              minlength="8"
              onChange={(e) => setNumber(e.target.value)}
            />
            <div id="recaptcha-container"></div>
            {numberError && <div className='text-danger' style={{position: 'absolute'}}>{numberError}</div>}
            <button type='submit' id='submit-btn' className='btn bg-dark btn-pill text-light w-100' style={{marginTop: '30px'}}>Continue</button>
          </Form> : <Form onSubmit={verifyOtp} className="w-75">
            <input
              placeholder='Enter your OTP'
              className='login badge-pill'
              minlength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError && <div className='text-danger' style={{position: 'absolute'}}>{otpError}</div>}
            <button type='submit' className='btn bg-dark btn-pill text-light w-100' style={{marginTop: '30px'}}>Continue</button>
          </Form>}
        </div>
      </div>
    </>
  )
}
