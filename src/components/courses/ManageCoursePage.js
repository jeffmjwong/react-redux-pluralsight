import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import { newCourse } from '../../../tools/mockData';

import CourseForm from './CourseForm';

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => alert('Loading authors failed ' + error));
    }

    if (courses.length === 0) {
      loadCourses().catch(error => alert('Loading courses failed ' + error));
    }
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setCourse(prevCourse => {
      return {
        ...prevCourse,
        [name]: name === 'authorId' ? parseInt(value, 10) : value
      }
    });
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    saveCourse(course);
  };

  return (
    <CourseForm
      course={course}
      authors={authors}
      onSave={handleSave}
      onChange={handleChange}
      errors={errors}
    />
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = { loadCourses, saveCourse, loadAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
