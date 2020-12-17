import React, { useState } from 'react';
import PropTypes from 'prop-types';

const useFormField = (initialVal = '') => {
  //Custom FormField hook for handling Form Fields
  const [value, setValue] = useState(initialVal);
  const onChange = e => setValue(e.target.value);
  return { value, setValue, onChange };
};

const AddMovie = ({ onAdd }) => {
  const titleField = useFormField();
  const subtitleField = useFormField();
  const yearField = useFormField(2020);
  const imageUrlField = useFormField();
  const descriptionField = useFormField();
  const [validation, setValidation] = useState({
    titleField: '',
    subtitleField: '',
    yearField: '',
    imageUrlField: '',
    descriptionField: '',
  });

  const validate = () => {
    let flag = true;
    let newValidation = { ...validation };
    if (titleField.value == '') {
      newValidation.titleField = 'Title must not be empty!';
      flag = false;
    } else {
      newValidation.titleField = '';
    }
    if (subtitleField.value == '') {
      newValidation.subtitleField = 'Subtitle must not be empty!';
      flag = false;
    } else {
      newValidation.subtitleField = '';
    }
    if (yearField.value < 1900 || yearField.value > 2020) {
      newValidation.yearField = 'Year must be between 1900 and 2020!';
      flag = false;
    } else {
      newValidation.yearField = '';
    }
    if (imageUrlField.value == '') {
      newValidation.imageUrlField = 'Image URL must not be empty!';
      flag = false;
    } else {
      newValidation.imageUrlField = '';
    }
    if (descriptionField.value == '') {
      newValidation.descriptionField = 'Description must not be empty!';
      flag = false;
    } else {
      newValidation.descriptionField = '';
    }
    setValidation(newValidation);
    return flag;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const movie = {
        title: titleField.value,
        subtitle: subtitleField.value,
        description: descriptionField.value,
        year: yearField.value,
        imageUrl: imageUrlField.value,
      };
      onAdd(movie);
      titleField.setValue('');
      subtitleField.setValue('');
      descriptionField.setValue('');
      yearField.setValue(2020);
      imageUrlField.setValue('');
      setValidation({
        titleField: '',
        subtitleField: '',
        yearField: '',
        imageUrlField: '',
        descriptionField: '',
      });
    }
  };

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  value={titleField.value}
                  onChange={titleField.onChange}
                />
                <span style={{ color: 'red' }}>{validation.titleField}</span>
              </div>
              <div className="form-group">
                <label htmlFor="subtitle">Subtitle:</label>
                <input
                  type="text"
                  className="form-control"
                  id="subtitle"
                  placeholder="Enter subtitle"
                  value={subtitleField.value}
                  onChange={subtitleField.onChange}
                />
                <span style={{ color: 'red' }}>{validation.subtitleField}</span>
              </div>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  value={yearField.value}
                  onChange={yearField.onChange}
                />
                <span style={{ color: 'red' }}>{validation.yearField}</span>
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  placeholder="Enter Image URL"
                  value={imageUrlField.value}
                  onChange={imageUrlField.onChange}
                />
                <span style={{ color: 'red' }}>{validation.imageUrlField}</span>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Enter description"
                  rows="8"
                  value={descriptionField.value}
                  onChange={descriptionField.onChange}
                />
                <span style={{ color: 'red' }}>{validation.descriptionField}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Add Movie
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

AddMovie.propTypes = {};

export default AddMovie;
