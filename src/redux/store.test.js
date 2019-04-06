import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

it('handles creating courses', () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course1 = { title: 'Clean Code' };
  const course2 = { title: 'Ruby' }

  // act
  const action1 = courseActions.createCourseSuccess(course1);
  const action2 = courseActions.createCourseSuccess(course2);
  store.dispatch(action1);
  store.dispatch(action2)

  // assert
  const courses = store.getState().courses;
  expect(courses.length).toEqual(2);
});
