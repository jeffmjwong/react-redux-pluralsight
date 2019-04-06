import React from 'react';
import { cleanup, render } from 'react-testing-library';

import CourseForm from './CourseForm';

afterEach(cleanup);

const renderCourseForm = args => {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  }

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
};

it('renders Add Course header', () => {
  const { getByText } = renderCourseForm();
  getByText('Add Course');
});

it('labels save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('labels save button as "Saving..." when saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
