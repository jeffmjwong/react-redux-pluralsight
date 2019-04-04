import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import { newCourse } from '../../../tools/mockData';

import CourseForm from './CourseForm';

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  ...props
}) => {
  const [course, setCourse] = useState({...props.course});

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
      <CourseForm
        course={{id: 1, authorId: 1, title: 'haha', category: 'lol'}}
        authors={authors}
        onSave={() => alert('on save booyeah!')}
        onChange={() => alert('on change booyeah!')}
        saving={false}
        errors={{}}
      />
    </>
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = { loadCourses, loadAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
