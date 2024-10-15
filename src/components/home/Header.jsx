import React from 'react';
import { URLs } from "../../__data__/urls";
import { FaHome } from 'react-icons/fa';

const Header = () => {
  return (
      <a href={URLs.account.url} className="accountLink">
          <FaHome className="houseIcon"/>
          <p>My profile</p>
      </a>
  );
};

export default Header;
