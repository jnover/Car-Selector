import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Result extends React.Component {
	render() {
		let car_name = "2007 Jeep Commander",
			vin = "3C3CFFJH2ET392187",
			dealerCost = 7584.97,
			dateListed = "2020-10-12 23:25:58"
		
		return (
			<div className="car-information">
				<div name="car-vin">
					{vin}
				</div>
				<div name="car-name">
					{car_name}
				</div>
				<div name="car-dealercost">
					{dealerCost}
				</div>
				<div name="car-datelisted">
					{dateListed}
				</div>
			</div>
		);
	}
}

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {search: ""};
	}
	
	searchCars = (e) => {
		this.setState({search: e.target.value});
	}
	
	render() {
		return (
			<div>
				<input 
					onChange={this.searchCars}
					placeholder="Search for a car" 
					type="text" 
					/>
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
