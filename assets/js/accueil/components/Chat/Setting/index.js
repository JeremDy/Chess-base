import React from 'react';
import classNames from 'classnames';
import './setting.sass';

const Setting = ({ hideForm, toggleForm, sumbitUserName, writeUserName, valueWrittenUserName }) => {
  const className = classNames(
    'form-user',
    {
      'form--display': true
    }
  );

  return (
    <div >
      <div className="setting">

        <div className="group-right">
          <button className={className} onClick={toggleForm}>  </button>
          <div className={className}>
            <form className="form-setting" onSubmit={sumbitUserName} >
              <input type="text" value={valueWrittenUserName} onChange={writeUserName} />
              <button type="submit">  </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
