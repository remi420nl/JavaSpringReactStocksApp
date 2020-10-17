import React, {useState}from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {deletePosition} from '../../api/index'

const PositionOptions = (props) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {options, selectedPositions, updatePositions} = props;

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const clickHandler = (action) => {
   
    if(action === 1 && selectedPositions.length > 0 ){
      console.log("going to deleted.. " + selectedPositions)

      const toBeDeleted = [...selectedPositions]

      toBeDeleted.forEach(position => {
     
      deletePosition(position).then(() => updatePositions())
 
     console.log("deleted.. " + position)
    });
    console.log("deleting done.. " + selectedPositions)
  }
  }

  const menu3=
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Actie
        </DropdownToggle>
      <DropdownMenu>
        {options.map(p => <DropdownItem key={p.id} onClick={() => clickHandler(p.id)}>{p.name}</DropdownItem>)}
      </DropdownMenu>
    </Dropdown>;

    

return menu3;
}

export default PositionOptions