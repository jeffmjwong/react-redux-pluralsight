import * as types from './actionTypes';
import * as courseAPI from '../../api/courseApi';
import { beginApiCall } from './apiStatusActions';

export const loadCoursesSuccess = (courses) => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export const createCourseSuccess = (course) => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export const updateCourseSuccess = (course) => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export const loadCourses = () => dispatch => {
  dispatch(beginApiCall());
  return courseAPI
    .getCourses()
    .then(courses => dispatch(loadCoursesSuccess(courses)))
    .catch(error => { throw error });
}

//eslint-disable-next-line no-unused-vars
export const saveCourse = course => (dispatch, getState) => {
  dispatch(beginApiCall());
  return courseAPI
    .saveCourse(course)
    .then(savedCourse => {
      course.id ?
        dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    })
    .catch(error => { throw error });
}
