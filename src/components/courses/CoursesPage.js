import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import { bindActionCreators } from 'redux';

class CoursesPage extends Component {
  render() {
    return (
      <>
        <h2>Courses</h2>

        {
          this.props.courses.map((course) => (
            <div key={course.title}>{ course.title }</div>
          ))
        }
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
