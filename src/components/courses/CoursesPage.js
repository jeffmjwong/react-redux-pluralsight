import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends Component {
  state = {
    course: {
      title: ''
    }
  }

  handleChange = (evt) => {
    const course = { ...this.state.course, title: evt.target.value };
    this.setState({ course });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  render() {
    const { course } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={course.title}
        />
        <input type="submit" value="Save" />

        {
          this.props.courses.map((course) => (
            <div key={course.title}>{ course.title }</div>
          ))
        }
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  };
};

export default connect(mapStateToProps)(CoursesPage);
