import React from 'react';
import './form.sass';

const Form = ({ sumbitMessage, writeMessage, valueWrittenMessage }) => (
  <form className="form-message" action="" onSubmit={sumbitMessage} >
    <input className="input-message" type="text" value={valueWrittenMessage} placeholder="Votre message" onChange={writeMessage}/>
  </form>
);

export default Form;
