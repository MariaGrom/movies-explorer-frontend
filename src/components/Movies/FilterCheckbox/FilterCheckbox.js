import React from "react";
import './FilterCheckbox.css'

function FilterCheckbox({onChange, checked}) {


  return (
    <label className="switch">
       <input onChange={onChange} type="checkbox" name='isShorts'  checked={checked} id='switch' />
      <span className="switch__slider"></span>
    </label>
  )
}

export default FilterCheckbox