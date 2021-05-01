import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Result extends React.Component {
  render() {
    return (
      <div>results shown here</div>
    );
  }
}

class SearchBox extends React.Component {
  render() {
    return (
      <div>
		<input type="text" width="10px" placeholder="Search for a car" value="" />
		<Result />
	  </div>
    );
  }
}

class Selector extends React.Component {
  render() {
    return (
      <div className="selector">
        <SearchBox />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Selector />,
  document.getElementById('root')
);
