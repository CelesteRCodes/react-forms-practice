import React, { useState, useEffect } from "react";
import useInput from '../hooks/use-input-reducer';

const BasicForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredFName,
    isValid: enteredFNameIsValid,
    hasError: fNameInputHasError,
    valueChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: resetFNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredLName,
    isValid: enteredLNameIsValid,
    hasError: lNameInputHasError,
    valueChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: resetLNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@') && value.includes('.'));

  useEffect(() => {
    if (enteredFNameIsValid && enteredLNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredFNameIsValid, enteredLNameIsValid, enteredEmailIsValid]);

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredFNameIsValid && !enteredLNameIsValid && !enteredEmailIsValid) {
      return;
    }
    resetFNameInput();
    resetLNameInput();
    resetEmailInput();
  };

  const fNameInputClasses = fNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const lNameInputClasses = lNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <div className={fNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={enteredFName}
            onBlur={fNameBlurHandler}
            onChange={fNameChangeHandler}
          />
          {fNameInputHasError && (
            <p className='error-text'>Enter valid first name.</p>
          )}
        </div>

        <div className={lNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={enteredLName}
            onBlur={lNameBlurHandler}
            onChange={lNameChangeHandler}
          />
          {lNameInputHasError && (
            <p className='error-text'>Enter valid last name.</p>
          )}
        </div>
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {emailInputHasError && (
          <p className='error-text'>Email not valid.</p>
        )}
      </div>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
