import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import TasksPage from './pages/tasks/TasksPage';
import CreateTaskPage from './pages/create-task/CreateTaskPage';

@inject('userStore')
@observer
class App extends Component {
  render() {
    const { userStore } = this.props;
    const isLoggedIn = userStore && userStore.username;

    return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/create" element={<CreateTaskPage />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/tasks" /> : <Navigate to="/signin" />} />
      </Routes>
    );
  }
}

export default App;
