import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import { bindActionCreators } from 'redux';

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
    this.props.actions.createCourse(this.state.course);
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
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
