
import React, { useState } from 'react';
import './LoginForm.css';
import jwt_decode from 'jwt-decode';
import 'firebase/auth'
import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getDatabase, } from "firebase/database";



function Form() {
  const [showPopup, setShowPopup] = useState(false);
  const [companyDetails, setCompanyDetails] = useState([]);


  const firebaseConfig = {
    apiKey: "AIzaSyBPJD3rdE1X5T4lQNkHVzX3ogGUsr3RdfM",
    authDomain: "we360-c836c.firebaseapp.com",
    databaseURL: "https://we360-c836c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "we360-c836c",
    storageBucket: "we360-c836c.appspot.com",
    messagingSenderId: "734981139568",
    appId: "1:734981139568:web:dd61c02b608d3e11b318b5",
    measurementId: "G-4VMEW8QN6D"

    };
  
  initializeApp(firebaseConfig);

  const handleJWTClick = () => {
    setShowPopup(true);
  };



  const handleNormalUserClick = () => {
    setShowPopup(false);
  
    // Read the company details from the Firebase Realtime Database
    getDatabase().ref('1/2').on('value', (snapshot) => {
      const details = snapshot.val();
      if (details) {
        setCompanyDetails([...companyDetails, details]);
      }
    });
  };
  

  const handleCompanyNameChange = (event) => {
    setCompanyDetails([{ ...companyDetails[0], companyName: event.target.value }]);
  };


  const handleCompanyIdChange = (event) => {
    setCompanyDetails([{ ...companyDetails[0], companyId: event.target.value }]);
  };


  const handleDecodeClick = (jwtToken) => {
    const decoded = jwt_decode(jwtToken);
    const newDetails = {
      companyName: decoded.companyName,
      companyId: decoded.companyId,
      companyEmail: decoded.companyEmail,
      companyAddress: decoded.companyAddress,
      companyCity: decoded.companyCity,
      companyState: decoded.companyState,
      companyCountry: decoded.companyCountry,
      
    };
    setCompanyDetails([...companyDetails, newDetails]);
  };


  const handleCompanyDetailsClick = (jwtToken) => {
    const newDetails = {
      companyName: '  ',
      companyId: ' ',
      companyEmail: ' ',
      companyAddress: ' ',
      companyCity: ' ',
      companyState: '  ',
      companyCountry: '  ',
    };
    setCompanyDetails([...companyDetails, newDetails]);
    setShowPopup(true);
  
    // Write the company details to the Firebase Realtime Database
    getDatabase().ref('companyDetails').push(newDetails);
  };
  

  const handleJwtChange = (event) => {
    // clear existing company details when new JWT is entered
    setCompanyDetails([]);
    handleDecodeClick(event.target.value);
  };



  return (

  <div>
  <br />
  <br />
  <div className="button-container">
    <button className="jwt-option" onClick={handleJWTClick}>JWT Option</button>&nbsp;
    <button className="normal-user" onClick={handleNormalUserClick}>Normal User Option</button>
  </div>

  {showPopup && (
    <div className="popup">
      <h2>Welcome to the JWT Option</h2>
      <label>
        Please Enter your Code here:
        <br />
        <textarea onChange={handleJwtChange} />
      </label>
      <br />
      <br />
      <button onClick={handleCompanyDetailsClick}>Show Details</button>
      <br />
      <br />
      {companyDetails.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company ID</th>
                <th>Company Email</th>
                <th>Company Address</th>
                <th>Company City</th>
                <th>Company State</th>
                <th>Company Country</th>
              </tr>
            </thead>
            <tbody>
              {companyDetails.map((details, index) => (
                <tr key={index}>
                  <td>{details.companyName}</td>
                  <td>{details.companyId}</td>
                  <td>{details.companyEmail}</td>
                  <td>{details.companyAddress}</td>
                  <td>{details.companyCity}</td>
                  <td>{details.companyState}</td>
                  <td>{details.companyCountry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )}

  {!showPopup && (
    <div className="popup">
      <h2>Welcome to the Normal User Option</h2>
      <label>
        Company Name:&nbsp;
        <input type="text" onChange={handleCompanyNameChange} />
      </label>
      <br />
      <br />
      <label>
        Company ID:&nbsp;
        <input type="text" onChange={handleCompanyIdChange} />
      </label>
      <br />
      <br />
      <button onClick={"handleCompanyDetailsClick"}>Connect</button>
      <br />
      <br />
      {companyDetails.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{companyDetails[0].companyName}</td>
                <td>{companyDetails[0].companyId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )}
  
</div>

  );
}

export default Form;








// -----------------------------------------------------

//  Read me  --->

// token___1

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55TmFtZSI6IkFsdGVybmF0aXZlIENvbXBhbnkiLCJjb21wYW55SWQiOiJBV1I4OSIsImNvbXBhbnlFbWFpbCI6IkF0Y0BnbWFpbC5jb20iLCJjb21wYW55QWRkcmVzcyI6IjEyMyBTZXJ2aWNlcyBTdCwgc3RhdGUiLCJjb21wYW55Q2l0eSI6IkdyZWVuc2hpcCIsImNvbXBhbnlTdGF0ZSI6IkNPUkEiLCJjb21wYW55Q291bnRyeSI6IlVTQSJ9.Pi7Kq_SyfUWfLl4HfP5Lw05Pfs9LLFCkm_NxM8oCDOw



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55TmFtZSI6Ik1yLnBhdGVsLmppaWkiLCJjb21wYW55SWQiOiJNUEoxMiIsImNvbXBhbnlFbWFpbCI6Ik1wakBnbWFpbC5jb20iLCJjb21wYW55QWRkcmVzcyI6IjEyMyBFNiBBcmVhciBjb2xvbnkiLCJjb21wYW55Q2l0eSI6IkJob3BhbCIsImNvbXBhbnlTdGF0ZSI6Ik1QIiwiY29tcGFueUNvdW50cnkiOiJJbmRpYSJ9.gk3-uCXOB2-FVXPAwbD8pYfbmL_1d82gmYZ3zi3LdNo



// Generate token Jwt is here ----

// {
//   "companyName": "Alternative Company",
//   "companyId": "AWR89",
//   "companyEmail": "Atc@gmail.com",
//   "companyAddress": "123 Services St, state",
//   "companyCity": "Greenship",
//   "companyState": "CORA",
//   "companyCountry": "USA"
// }


//  User name & user id is here ----

//  companyName - Alternative Company 
//  companyId - AWR89 

