import 'semantic-ui-css/semantic.min.css';
import './DropdownSelection.css';
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { regions } from '../regionsCenter';

const regionOptions = regions.map((item, index) => ({
  key: index,
  text: item.name,
  value: index,
}));



const DropdownSelection = props => {
  // const [region, setRegion] = useState("Find by Region");

const handleChange = (event, data) => {
  // setRegion(data.value);
  // console.log(regions[data.value].name);
  props.searchRegion(regions[data.value].name, regions[data.value].placeCenter);

};
return(
  <Dropdown 
  className="dropdown-holder" 
  placeholder='Region' 
  onChange={handleChange}
  search selection 
  options={regionOptions} />
)
}


export default DropdownSelection;
