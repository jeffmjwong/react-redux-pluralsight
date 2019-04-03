import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import { bindActionCreators } from 'redux';

import CourseList from './CourseList';

class CoursesPage extends Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert('Loading authors failed ' + error));
    }

    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch(error => alert('Loading courses failed ' + error));
    }
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
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.map(course => {
      return {
        ...course,
        authorName: state.authors.find(author => author.id === course.authorId).name
      };
    }),
    authors: state.authors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
