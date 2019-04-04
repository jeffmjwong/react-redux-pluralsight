import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';

const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors }) => {
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => alert('Loading authors failed ' + error));
    }

    if (courses.length === 0) {
      loadCourses().catch(error => alert('Loading courses failed ' + error));
    }
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
};

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = { loadCourses, loadAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
