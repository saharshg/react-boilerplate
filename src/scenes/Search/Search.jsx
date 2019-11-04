/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import { Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import searchAction from '../../actions/search';
import './style.scss';
import { renderField } from '../../utils/formUtils';

const Search = (props) => {
  const {
    searchForm = {},
    searchPlanet,
    search: { data: { results = [] } = {}, isLoading } = {},
  } = props;

  useEffect(() => {
    if (searchForm.planet && searchForm.planet.length > 0) {
      searchPlanet(searchForm.planet);
    }
  }, [searchForm.planet && searchForm.planet.length]);

  return (
    <>
      <Form className="container search-planet">
        <Field
          autoFocus
          name="planet"
          component={renderField}
          type="text"
          label="Search planet"
        />
      </Form>

      <div className="container d-flex" style={{ flexWrap: 'wrap' }}>
        {isLoading ? 'Loading...' : results.map((planet) => {
          if (!isNaN(planet.population)) {
            let factor = planet.population;
            // eslint-disable-next-line no-plusplus
            for (let i = 10; ; i++) {
              if (factor < 200) {
                break;
              } else {
                factor /= i;
              }
            }

            return (
              <div
                key={planet.name}
                style={{
                  width: `${factor * 3.5}px`,
                  height: `${factor * 3.5}px`,
                  padding: '5px',
                  border: '1px solid black',
                }}
              >
                {planet.name}
              </div>
            );
          }

          return '';
        })}
      </div>
    </>
  );
};

const SearchWrapper = reduxForm({
  form: 'searchForm',
})(Search);

const mapStateToProps = (state) => {
  const { form: { searchForm: { values } = {} } = {}, search } = state;
  return ({
    search,
    searchForm: values,
  });
};

const mapDispatchToProps = dispatch => ({
  searchPlanet: name => dispatch(searchAction(name)),
});

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchWrapper);

Search.defaultProps = {
  searchForm: {},
  searchPlanet: () => {},
  search: {
    data: {},
    isLoading: false,
  },
};

Search.propTypes = {
  searchForm: PropTypes.shape({}),
  searchPlanet: PropTypes.func,
  search: PropTypes.shape({
    data: PropTypes.object,
    isLoading: PropTypes.bool,
  }),
};

export default SearchContainer;
