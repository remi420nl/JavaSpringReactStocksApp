import React, {useState}from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


function PositionMenu  (props)  {

const { positions } = props;

  
const [dropdownOpen, setDropdownOpen] = useState(false);


const toggle = () => setDropdownOpen(prevState => !prevState);

const menu3=
  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle caret>
      Actie
      </DropdownToggle>
    <DropdownMenu>
      {positions.map(p => <DropdownItem key= {p.id}>{p.stock.name} amount {p.amount}</DropdownItem>)}
    </DropdownMenu>
  </Dropdown>;

  

return menu3;
}



export default PositionMenu;