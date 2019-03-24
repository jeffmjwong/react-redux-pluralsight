import React, { Component } from 'react';

class CoursesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: ''
      }
    };
  }

  handleChange = (evt) => {

  }

  render() {
    const { course } = this.state;

    return (
      <form>
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
