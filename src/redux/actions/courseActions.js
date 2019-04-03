import * as types from './actionTypes';
import * as courseAPI from '../../api/courseApi';

export const createCourse = (course) => {
  return { type: types.CREATE_COURSE, course };
}

export const loadCoursesSuccess = (courses) => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export const loadCourses = () => {
  return (dispatch) => {
    return courseAPI
      .getCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => { throw error });
  };
}
