import React, {useState} from 'react';
import './styles.css'


//this is not being used, its for the range selection for later implementation
function SelectBox (props) {
 
const [showMenu, setShowMenu] = useState (false);
const [selected, setSelected] = useState()

    
const availableRanges = [{
    id : 1,
    value : 'max',
    name : 'Maximaal'
  },
  {
      //needs adjustment in stockinfo u prefix
    id:2,
    value :'5y',
    name: '5 Jaar *not working properly*'
  },
  {
    id :3,
    value : '1y',
    name : '1 Jaar'
  },
  {
    id :4,
    value : 'ytd',
    name : 'Afgelopen Jaar'
  },
  {
    id :5,
    value : '3m',
    name : '3 Maanden'
  },
  {
    id :6,
    value : '1m',
    name : '1 Maand'
  },
  {
    id :7,
    value : '5d',
    name : '5 Dagen'
  },
  {
    id :8,
    value : 'dynamic',
    name : 'Dynamisch'
  }
  ]
    
  function selectHandler(item){

    props.rangeSelector(item.value);
    setSelected(item.name);
    setShowMenu(false);
  }


        return(
          <div>
          <div className="select-box--box"
           style = {{width: props.width || 200}}>
            <div
              className="select-box--container"
            > 

              <div 
              className="select-box--selected-item"
              >{selected}
                <div
                  className="select-box--arrow"
                  onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)}>
                  <span className={`${showMenu ? 'select-box--arrow-up' : 'select-box--arrow-down'} `}

                  />

                </div>
                <div
                  style={{ display: showMenu ? 'block' : 'none' }}
                  className="select-box--items"
                  >
                  {
                    availableRanges.map(item => <div key={item.id} value={item.value} onClick={() => selectHandler(item)}
                      className={selected === item.name ? 'selected' : ''}>
                      {item.name}
                    </div>)
                  }
                </div>
              </div>
            </div>
          </div>
          </div>
        )
    
}

export default SelectBox;