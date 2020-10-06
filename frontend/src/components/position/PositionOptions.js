import React, {useState}from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const PositionOptions = (props) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {options} = props;

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const menu3=
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Actie
        </DropdownToggle>
      <DropdownMenu>
        {options.map(p => <DropdownItem key= {p.id}>{p.name}</DropdownItem>)}
      </DropdownMenu>
    </Dropdown>;

    

return menu3;
}

export default PositionOptions