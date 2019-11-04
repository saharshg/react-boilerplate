/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import React from 'react';
import moment from 'moment';
import momentLocaliser from 'react-widgets-moment';
import { DateTimePicker, DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import {
  Label,
  Input,
  FormFeedback,
  FormGroup,
  CustomInput,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import './style.scss';

momentLocaliser(moment);

export const Validations = ({
  error,
  validationError,
  warning,
}) => (
  <>
    <FormFeedback className="d-block">{validationError || error}</FormFeedback>
    {(warning && <span>{warning}</span>)}
  </>
);

const renderSwitch = (props) => {
  const {
    input,
    id,
    name,
    checked,
  } = props;
  return (
    <CustomInput
      {...input}
      id={id}
      name={name}
      checked={checked}
      type="switch"
    />
  );
};

const renderField = (props) => {
  const {
    input,
    label = '',
    name,
    className = '',
    type = 'text',
    placeholder = '',
    disabled,
    autoFocus = false,
    validationError,
    meta: { touched, error, warning },
  } = props;

  return (
    <FormGroup className={`${className} force-mb-10`} style={{ width: '100%' }}>
      {label && <Label className="force_mb-5" for={name}>{label}</Label>}
      <Input
        {...input}
        {...{
          input,
          label,
          name,
          className,
          type,
          placeholder,
          disabled,
          autoFocus,
          meta: { touched, error, warning },
        }}
        disabled={disabled}
        type={type}
        invalid={(touched && !input.value && error) ? touched : false}
        placeholder={placeholder}
        className={`${(touched && error) ? 'validation-error' : className}`}
      />
      {(touched && error) && (
        <Validations
          {...{
            error,
            warning,
            validationError,
          }}
        />
      )}
    </FormGroup>
  );
};

const renderFileInput = (props) => {
  const {
    input,
    label = '',
    name,
    className = '',
    type = 'file',
    disabled,
    validationError,
    meta: { touched, error },
    customInput = null,
    handleChange,
  } = props;

  if (type === 'file') {
    delete input.value;
  }

  const handleInputChange = (value) => {
    const { onChange } = input;
    onChange(value);
    if (handleChange) {
      handleChange();
    }
  };

  return (
    <FormGroup className="force-mb-10">
      {label && <Label className="force_mb-5" for={name}>{label}</Label>}
      {customInput || <Label htmlFor={input.name} className="custom-file-input-new">Choose file</Label>}
      <Input
        id={input.name}
        {...input}
        {...{
          label,
          name,
          type,
          disabled,
          meta: { touched, error },
        }}
        onChange={handleInputChange}
        className={`file-input  d-none ${validationError || (touched && error) ? 'validation-error' : className}`}
      />
    </FormGroup>
  );
};

const renderAttachFileInput = (props) => {
  const {
    input,
    label = '',
    name,
    className = '',
    type = 'file',
    disabled,
    validationError,
    meta: { touched, error, warning },
  } = props;
  if (type === 'file') {
    delete input.value;
  }

  return (
    <FormGroup className="force-mb-10">
      <InputGroup className={`file-inputgroup ${validationError || (touched && error) ? 'validation-error' : className}`}>
        <InputGroupAddon addonType="prepend">
          <Label className="force_mb-5 ellipse-label" for={name}>{label}</Label>
          <Input
            accept="image/*"
            data-max-size="10000"
            id={input.name}
            {...input}
            {...{
              label,
              name,
              type,
              disabled,
              meta: { touched, error },
            }}
            className="file-input"
          />
        </InputGroupAddon>
        <InputGroupAddon addonType="append">
          <Label className="custom-file-inputgroup-label" htmlFor={input.name}>Choose file</Label>
        </InputGroupAddon>
      </InputGroup>
      {touched && (
        <Validations
          {...{
            error,
            warning,
            validationError,
          }}
        />
      )}
    </FormGroup>
  );
};

const renderDatePicker = (props) => {
  const {
    input: { onChange, value },
    label,
    disabled,
    formatType,
    timeFormating,
    name,
    step,
    time,
    date,
    placeholder,
    validationError,
    meta: { touched, error, warning },
  } = props;

  return (
    <FormGroup className="force-mb-10">
      <Label className=" force_mb-5" for={name}>{label || ''}</Label>
      <DateTimePicker
        onChange={onChange}
        format={formatType}
        time={time}
        date={date}
        step={step || 5}
        timeFormat={timeFormating}
        disabled={disabled || false}
        defaultValue={null}
        placeholder={placeholder || ''}
        className={validationError || (touched && error) ? 'validation-error' : ''}
        value={!value ? null : new Date(value)}
        min={null}
      />
      {touched && (
        <Validations
          {...{
            error,
            warning,
            validationError,
          }}
        />
      )}
    </FormGroup>
  );
};

const renderCheckbox = (props) => {
  const {
    input,
    placeholder,
    validationError,
    checked,
    meta: { touched, error, warning },
  } = props;

  return (
    <FormGroup check>
      <Label check>
        <Input {...input} checked={checked} type="checkbox" />
        {' '}
        {placeholder}
      </Label>
      {touched && (
        <Validations
          {...{
            error,
            warning,
            validationError,
          }}
        />
      )}
    </FormGroup>
  );
};

const renderSelectField = (props) => {
  const {
    input,
    label,
    validationError,
    name,
    options,
    disabled,
    defaultSelected,
    placeholder,
    meta: { touched, error, warning },
  } = props;

  return (
    <FormGroup>
      <Label className="force_mb-5" for={name}>{label || ''}</Label>
      <DropdownList
        {...input}
        data={options || []}
        defaultValue={defaultSelected}
        name={name}
        className={validationError || (touched && error) ? 'validation-error' : ''}
        disabled={disabled || false}
        placeholder={placeholder || null}
      />
      {touched && (
        <Validations
          {...{
            error,
            warning,
            validationError,
          }}
        />
      )}
    </FormGroup>
  );
};

export {
  renderField,
  renderSelectField,
  renderCheckbox,
  renderDatePicker,
  renderSwitch,
  renderFileInput,
  renderAttachFileInput,
};
