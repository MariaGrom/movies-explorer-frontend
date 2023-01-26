import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import '../FilterCheckbox/FilterCheckbox.css';


function SearchForm(props) {

  const { filterCards, required = true } = props;

  const [isDisabledButton, setIsDisabledButton] = React.useState(true);
  const [error, setError] = React.useState({
    name: '',
    isShorts: '',
  });
  const [value, setValue] = React.useState({
    name: '',
    isShorts: false,
  });

  const formRef = React.useRef(null);

  const handleChange = (e) => {
    const {
      name,
      value: inputValue,
      validationMessage,
    } = e.target;
    setValue((state) => ({
      ...state,
      [name]: inputValue,
    })
    );
    setError((state) => ({
      ...state,
      [name]: validationMessage,
    })
    );
    setIsDisabledButton(!formRef.current.checkValidity())
  };


  const handleCheckbox = (e) => {
    const {
      name,
      checked
    } = e.target;
    const updatedValue = {
      ...value,
      [name]: checked
    };
    setValue(updatedValue);
    filterCards(updatedValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    filterCards(value);
  }

  return (
    <div className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit} ref={formRef} noValidate>
        <input
          type="text"
          className="searchform__input"
          placeholder="Фильм"
          required=""
          onChange={handleChange}
          value={value.name}
          name="name"
        />
        <button type="button" className="searchform__button" disabled={isDisabledButton} onClick={handleSubmit}></button>

        <div className="searchform__checkbox">
          {/* Исполнение чекбокса в коде формы поиска */}
          <label className="switch">
            <input onChange={handleCheckbox} type="checkbox" name='isShorts' value={value.isShorts} id='switch'/>
            <span className="switch__slider"></span>
          </label>

          {/* <FilterCheckbox /> */}
          <p className="searchform__text">Короткометражки</p>
        </div>
        {/* <div className="searchform__border"></div> */}

      </form>
    </div>
  )
}

export default SearchForm