import * as types from './actionTypes';
import * as courseAPI from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const loadCoursesSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export const createCourseSuccess = course => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export const updateCourseSuccess = course => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export const deleteCourseOptimistic = course => {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course }
}

export const loadCourses = () => dispatch => {
  dispatch(beginApiCall());
  return courseAPI
    .getCourses()
    .then(courses => dispatch(loadCoursesSuccess(courses)))
    .catch(error => {
      dispatch(apiCallError());
      throw error;
    });
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
    .catch(error => {
      dispatch(apiCallError());
      throw error;
    });
}

export const deleteCourse = course => dispatch => {
  dispatch(deleteCourseOptimistic(course));
  return courseAPI.deleteCourse(course.id);
}
