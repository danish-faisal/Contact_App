import React from 'react';
import user from "../images/user.jpg";

const ContactDetail = () => {
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">Danish</div>
          <div className="description">danishfaisal.wwe@gmail.com</div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetail;