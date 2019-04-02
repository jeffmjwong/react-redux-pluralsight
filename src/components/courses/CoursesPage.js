import React, { Component } from 'react';

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
    alert(this.state.course.title);
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
      </form>
    );
  }
}

export default CoursesPage;
