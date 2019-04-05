import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../common/Spinner';
import CourseList from './CourseList';
import { toast } from 'react-toastify';

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  };

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

  handleDeleteCourse = async course => {
    const { actions } = this.props;

    toast.success('Course Deleted');

    try {
      await actions.deleteCourse(course);
    } catch(error) {
      toast.error('Delete failed. ' + error.message, { autoClose: false });
    }
  }

  render() {
    const { courses, loading } = this.props;
    const { redirectToAddCoursePage } = this.state;

    return (
      <>
        { redirectToAddCoursePage && <Redirect to='/course' /> }

        <h2>Courses</h2>

        {
          loading ?
            <Spinner /> :
            <>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-course"
                onClick={() => this.setState({ redirectToAddCoursePage: true })}
              >
                Add Course
              </button>

              <CourseList courses={courses} onDeleteClick={this.handleDeleteCourse} />
            </>
        }
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.map(course => {
      return {
        ...course,
        authorName: state.authors.find(author => author.id === course.authorId).name
      };
    }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
