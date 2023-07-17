import React, { useEffect, useState } from 'react';

function App() {
  const [empCode, setEmpCode] = useState('');
  const [empName, setEmpName] = useState('');
  const [empDob, setEmpDob] = useState('');
  const [empSal, setEmpSal] = useState('');
  const [empServ, setEmpServ] = useState('');
  const [empMof, setEmpMof] = useState('');
  const [empCrk, setEmpCrk] = useState('');
  const [empFb, setEmpFb] = useState('');
  const [empTwn, setEmpTwn] = useState('');
  const [empRem, setEmpRem] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({
    empCode: '',
    empName: '',
    empDob: '',
    empSal: '',
    empServ: '',
    empMof: '',
    empCrk: '',
    empFb: '',
    empTwn: '',
    empRem: ''

  });




  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    let formIsValid = true;
    const newErrors = {
      empCode: '',
      empName: '',
      empDob: '',
      empSal: '',
      empServ: '',
      empMof: '',

      empCrk: '',
      empFb: '',
      empTwn: '',
      empRem: ''
    };


    if (empCode.trim() === '') {
      newErrors.empCode = 'Employee Code is required';
      formIsValid = false;
    }

    if (empName.trim() === '') {
      newErrors.empName = 'Employee Name is required';
      formIsValid = false;
    }

    if (empDob.trim() === '') {
      newErrors.empDob = 'Date of Birth is required';
      formIsValid = false;
    }

    if (empSal.trim() === '') {
      newErrors.empSal = 'Basic Salary is required';
      formIsValid = false;
    }

    if (empServ.trim() === '') {
      newErrors.empServ = 'Service is required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      // Create a data object with the form data
      const formData = {
        empCode,
        empName,
        empDob,
        empSal,
        empServ,
        empMof,
        empCrk,
        empFb,
        empTwn,
        empRem,
      };

      // Send the form data to the server



      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setErrorMessage(data.error);
            setSuccessMessage('');
          } else {
            setErrorMessage('');
            // Reset form fields or show success message
            setSuccessMessage(`Data saved successfully. Employee Code: ${empCode}`);
            setEmpCode('');
          setEmpName('');
          setEmpDob('');
          setEmpSal('');
          setEmpServ('');
          setEmpMof('');
          setEmpCrk('');
          setEmpFb('');
          setEmpTwn('');
          setEmpRem('');
          setErrors({
            empCode: '',
            empName: '',
            empDob: '',
            empSal: '',
            empServ: '',
            empMof: '',
            empCrk: '',
            empFb: '',
            empTwn: '',
            empRem: ''
          });
        }
        })
        .catch(error => {
          console.error(error);
          setErrorMessage('An error occurred while saving the data');
          setSuccessMessage('');
        });
    }
  };

  return (
    <div>
      <h1>Add Records</h1>
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <table width='68%'>
          <tbody>
            <tr>
              <td>Employee Code</td>
              <td>
                <input
                  type='text'
                  name='empcode'
                  id='empcode'
                  size='6'
                  maxLength='6'
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                />
                {errors.empCode && <div className='error'>{errors.empCode}</div>}
              </td>
            </tr>

            <tr>
              <td>Employee Name</td>
              <td>
                <input
                  type='text'
                  name='empnam'
                  id='empnam'
                  size='30'
                  maxLength='30'
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                />
                {errors.empName && <div className='error'>{errors.empName}</div>}
              </td>
            </tr>

            <tr>
              <td>Date of Birth</td>
              <td>
                <input
                  type='text'
                  name='empdob'
                  id='empdob'
                  size='10'
                  maxLength='10'
                  value={empDob}
                  onChange={(e) => setEmpDob(e.target.value)}
                />
                {errors.empDob && <div className='error'>{errors.empDob}</div>}
              </td>
            </tr>

            <tr>
              <td>Basic Salary</td>
              <td>
                <input
                  type='text'
                  name='empsal'
                  id='empsal'
                  size='10'
                  maxLength='10'
                  value={empSal}
                  onChange={(e) => setEmpSal(e.target.value)}
                />
                {errors.empSal && <div className='error'>{errors.empSal}</div>}
              </td>
            </tr>

            <tr>
              <td>Service</td>
              <td>
                <input
                  type='text'
                  name='empserv'
                  id='empserv'
                  size='10'
                  maxLength='10'
                  value={empServ}
                  onChange={(e) => setEmpServ(e.target.value)}
                />
                {errors.empServ && <div className='error'>{errors.empServ}</div>}
              </td>
            </tr>
          </tbody>
        </table>

        <table width='50%'>
          <tbody>
            <tr>
              <td>Employee Male or Female</td>
              <td width='55%'>
                <input
                  type='radio'
                  name='empmof'
                  value='M'
                  checked={empMof === 'M'}
                  onChange={() => setEmpMof('M')}
                />
                Male
                <input
                  type='radio'
                  name='empmof'
                  value='F'
                  checked={empMof === 'F'}
                  onChange={() => setEmpMof('F')}
                />
                Female
              </td>
            </tr>
          </tbody>
        </table>

        <table width='50%'>
          <tbody>
            <tr>
              <td>Employee play cricket</td>
              <td>
                <input
                  type='checkbox'
                  name='empcrk'
                  id='empcrk'
                  checked={empCrk}
                  onChange={() => setEmpCrk(!empCrk)}
                />
                Yes
              </td>
            </tr>

            <tr>
              <td>Employee play football</td>
              <td width='55%'>
                <input
                  type='checkbox'
                  name='empfb'
                  id='empfb'
                  checked={empFb}
                  onChange={() => setEmpFb(!empFb)}
                />
                Yes
              </td>
            </tr>
          </tbody>
        </table>

        <table width='50%'>
          <tbody>
            <tr>
              <td>Employee Town</td>
              <td width='55%'>
                <select
                  id='emptwn'
                  name='emptwn'
                  value={empTwn}
                  onChange={(e) => setEmpTwn(e.target.value)}
                >
                  <option id='CMB'>COLOMBO</option>
                  <option id='GAL'>GALLE</option>
                  <option id='KAN'>KANDY</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table width='50%'>
          <tbody>
            <tr>
              <td>Employee Remarks</td>
              <td width='55%'>
                <textarea
                  name='emprem'
                  wrap='hard'
                  cols='20'
                  rows='10'
                  maxLength='50'
                  value={empRem}
                  onChange={(e) => setEmpRem(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <table align='left'>
          <tbody>
            <tr>
              <td>
                <input type='reset' name='cancel' value='CANCEL'></input>
              </td>
              <td>
                <input type='submit' name='save' value='SAVE'></input>
                
              </td>
              <td>
              {errorMessage && <div className="error">{errorMessage}</div>}</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;
