import React, { useState, useRef, useEffect } from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import '../FilterCheckbox/FilterCheckbox.css';

function SearchForm(props) {

  // const { filterCards, required = true, page, updateSearch } = props;
  const { filterCards, required = true, page } = props;

  // Переменная состояния кнопки поиска - активна/ не активна
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  // Переменная состояния ошибки
  const [error, setError] = useState({ name: '', isShorts: '' });
  // Переменная состония поля input поиска
  const [value, setValue] = useState({ name: '', isShorts: false });

  const formRef = useRef(null);

  // Эффект отслеживания состояния поля input поиска 

  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('search-movies'));
    if (searchMovies) {
      setValue(searchMovies);
      filterCards(searchMovies);
    }
    if (page === 'saved-movies') {
      filterCards(value);
      setValue({ name: '', isShorts: false });
    }
  }, []);


  // Функция изменения input поиска
  const handleChange = (e) => {
    const {
      name,
      value: inputValue,
      validationMessage,
    } = e.target;

    const updatedValue = {
      ...value,
      [name]: inputValue
    }
    if(page === 'movies'){
    localStorage.setItem('search-movies', JSON.stringify(updatedValue));
    }
    setValue(updatedValue);
    setError((state) => ({
      ...state,
      [name]: validationMessage,
    })
    );
    setIsDisabledButton(!formRef.current.checkValidity())
  };

  // Функция отработки чекбокса
  const handleCheckbox = (e) => {
    const {
      name,
      checked
    } = e.target;
    const updatedValue = {
      ...value,
      [name]: checked
    };

    localStorage.setItem('search-movies', JSON.stringify(updatedValue)); 
    setValue(updatedValue);
    filterCards(updatedValue);
  }

  // Функция отправки формы
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
          required={required}
          onChange={handleChange}
          value={value.name}
          name="name"
        />
        <button type="button" className={`searchform__button ${isDisabledButton ? "searchform__button_disabled" : ""}`} disabled={isDisabledButton} onClick={handleSubmit}></button>
        <span className="searchform__span"> {error.name}</span>
        <div className="searchform__checkbox">

          {/* Исполнение чекбокса в коде формы поиска */}
          <label className="switch">
            <input onChange={handleCheckbox} type="checkbox" name='isShorts'  checked={value.isShorts} id='switch' />
            <span className="switch__slider"></span>
          </label>

          {/* <FilterCheckbox  
          filterCards={filterCards}
          page="movies"
          /> */}

          <p className="searchform__text">Короткометражки</p>
        </div>
        <div className="searchform__border"></div>
      </form>
    </div>
  )
}

export default SearchForm