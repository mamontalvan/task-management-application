import { useNavigate } from 'react-router-dom';
import React from 'react';

// simple HOC to provide navigate prop to class components
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}
