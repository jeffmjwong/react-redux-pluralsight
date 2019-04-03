import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import { bindActionCreators } from 'redux';

import CourseList from './CourseList';

class CoursesPage extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions
      .loadCourses()
      .catch(error => alert('Loading courses failed ' + error));
  }

  render() {
    const { courses } = this.props;

    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={courses} />
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
