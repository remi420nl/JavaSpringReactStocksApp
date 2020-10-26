import React, {useState}from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {deletePosition} from '../../api/index'

const PositionOptions = (props) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {selectedPositions, updatePositions} = props;

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const options = [
    {
      id: 1,
      name: "delete",
    },
    {
      id: 2,
      name: "update *not working yet",
    },
  ];


  const clickHandler = (action) => {
   
    if(action === 1 && selectedPositions.length > 0 ){
    

      const toBeDeleted = [...selectedPositions]

      toBeDeleted.forEach(position => {
     
      deletePosition(position).then(() => updatePositions())
 
     console.log("deleted.. " + position)
    });
    console.log("deleting done.. " + selectedPositions)
  }
  }

  return(
  <div className="optionsbutton" >    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
  <DropdownToggle caret>
    Actie
    </DropdownToggle>
  <DropdownMenu>
    {options.map(p => <DropdownItem key={p.id} onClick={() => clickHandler(p.id)}>{p.name}</DropdownItem>)}
  </DropdownMenu>
</Dropdown>
</div>
  )
}

export default PositionOptions