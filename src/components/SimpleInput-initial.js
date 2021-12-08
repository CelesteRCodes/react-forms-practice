import React, {useRef, useState} from "react";


const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputRef = useRef();

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue)
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        type='text' 
        id='name' 
        onChange={nameInputChangeHandler} 
        ref={nameInputRef}
        onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && <p className="error-text">Empty fields</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
