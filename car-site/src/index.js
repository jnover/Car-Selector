import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//var json = require('./MOCK_DATA.json');

class Result extends React.Component {
	render() {
		let car_name = this.props.name, 
			vin = this.props.vin,
			dealerCost = this.props.dealerCost,
			dateListed = this.props.dateListed;
		
		return (
			<div className="car-information">
				<div name="car-vin">
					VIN: {vin}
				</div>
				<div name="car-name">
					NAME: {car_name}
				</div>
				<div name="car-dealercost">
					DEALERCOST: {dealerCost}
				</div>
				<div name="car-datelisted">
					DATELISTED: {dateListed}
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
		var results = [{vin:"123", name:"car1", dealerCost:1.23, dateListed:"05/01/2021"},
			{vin:"234", name:"car2", dealerCost:2.34, dateListed:"05/01/2021"},
			{vin:"345", name:"car3", dealerCost:3.45, dateListed:"05/01/2021"},
		];
		return (
			<div>
				<input 
					onChange={this.searchCars}
					placeholder="Search for a car" 
					type="text" 
				/>
				{results.map(i => {
					return <Result 
						vin={i.vin} 
						name={i.name}
						dealerCost={i.dealerCost} 
						dateListed={i.dateListed} />
				})}
			</div>
		);
	}
}

class Selector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			results: []
		};
	}

	componentDidMount() {
		fetch("./MOCK_DATA.json")
		.then(res => res.json())
		.then(
			(result) => {
			this.setState({
				isLoaded: true,
				results: result
		});
	},
	(error) => {
		this.setState({
			isLoaded: true,
			error
			});
		})
	}
	
	render() {
		const {error, isLoaded, results} = this.state;
		if (error) {
			return <div className="error">Error: {error.message}</div>;
		}
		else if (!isLoaded) {
			return <div className="loading">Loading...</div>;
		}
		return (
			<div className="selector">
				<div>Loaded entries {results.length}</div>
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
