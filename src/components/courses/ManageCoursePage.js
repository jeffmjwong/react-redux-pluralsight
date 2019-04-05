import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import { newCourse } from '../../../tools/mockData';
import { toast } from 'react-toastify';

import Spinner from '../common/Spinner';
import CourseForm from './CourseForm';

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => alert('Loading authors failed ' + error));
    }

    if (courses.length === 0) {
      loadCourses().catch(error => alert('Loading courses failed ' + error));
    } else {
      setCourse({ ...props.course });
    }
  }, [props.course]);

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
    setSaving(true);
    saveCourse(course).then(() => {
      toast.success('Course saved.');
      history.push('/courses');
    });
  };

  return (
    authors.length === 0 || courses.length === 0 ?
      <Spinner /> :
      <CourseForm
        course={course}
        authors={authors}
        onSave={handleSave}
        onChange={handleChange}
        saving={saving}
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
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export const getCourseBySlug = (courses, slug) => {
  return courses.find(course => course.slug === slug) || null;
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0 ?
    getCourseBySlug(state.courses, slug) :
    newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = { loadCourses, saveCourse, loadAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
