import React from 'react';
import { shallow } from 'enzyme';
import { DateTimePicker, DropdownList } from 'react-widgets';
import {
  Label,
  Input,
  FormGroup,
  CustomInput,
} from 'reactstrap';
import {
  renderField as RenderField,
  Validations,
  renderSelectField as RenderSelectField,
  renderCheckbox as RenderCheckbox,
  renderDatePicker as RenderDatePicker,
  renderSwitch as RenderSwitch,
} from '../index';

describe('FormUtils cases', () => {
  const baseProps = {
    input: {},
    label: 'label',
    name: 'name',
    type: 'type',
    placeholder: 'placeholder',
    disabled: false,
    validationError: {},
    meta: { touched: false, error: 'error string', warning: 'warning string' },
  };

  it('Should render renderField', () => {
    const wrapper = shallow(<RenderField {...baseProps} />);
    const elmntLength = el => wrapper.find(el).length;
    expect(elmntLength(FormGroup)).toEqual(1);
    expect(elmntLength(Label)).toEqual(1);
    expect(elmntLength(Input)).toEqual(1);
    expect(elmntLength(Validations)).toEqual(1);
  });

  it('Should render renderSelectField', () => {
    const finalProps = {
      ...baseProps,
      placeholder: '',
      options: {},
      defaultSelected: {},
    };

    const wrapper = shallow(<RenderSelectField {...finalProps} />);
    const elmntLength = el => wrapper.find(el).length;
    expect(elmntLength(FormGroup)).toEqual(1);
    expect(elmntLength(Label)).toEqual(1);
    expect(elmntLength(DropdownList)).toEqual(1);
    expect(elmntLength(Validations)).toEqual(1);
  });

  it('Should render renderCheckbox', () => {
    const finalProps = {
      ...baseProps,
      checked: false,
    };

    const wrapper = shallow(<RenderCheckbox {...finalProps} />);
    const elmntLength = el => wrapper.find(el).length;
    expect(elmntLength(FormGroup)).toEqual(1);
    expect(elmntLength(Label)).toEqual(1);
    expect(elmntLength(Input)).toEqual(1);
    expect(elmntLength(Validations)).toEqual(1);
  });

  it('Should render renderSwitch', () => {
    const finalProps = {
      ...baseProps,
      checked: false,
      id: 'id',
    };

    const wrapper = shallow(<RenderSwitch {...finalProps} />);
    const elmntLength = el => wrapper.find(el).length;
    expect(elmntLength(CustomInput)).toEqual(1);
  });

  it('Should render Validations', () => {
    const { validationError, meta } = baseProps;
    const { touched, error, warning } = meta;
    const result = (
      <>
        <div>
          {touched && ((error && <span className="field_error">{error}</span>)
          || (warning && <span>{warning}</span>))}
        </div>
        {validationError && (
          <div>
            {(validationError && <span className="field_error">{validationError}</span>)}
          </div>
        )}
      </>
    );

    const expected = Validations({
      ...meta,
      validationError,
    });
    expect(expected).toEqual(result);
  });

  it('Should render renderDatePicker', () => {
    const finalProps = {
      ...baseProps,
      input: {
        onChange: jest.fn(),
        value: '',
      },
      formatType: 'formatType',
      timeFormating: 'timeformatting',
      step: 'step',
      time: 'time',
      date: 'data',
    };

    const wrapper = shallow(<RenderDatePicker {...finalProps} />);
    const elmntLength = el => wrapper.find(el).length;
    expect(elmntLength(FormGroup)).toEqual(1);
    expect(elmntLength(Label)).toEqual(1);
    expect(elmntLength(DateTimePicker)).toEqual(1);
    expect(elmntLength(Validations)).toEqual(1);
  });
});
