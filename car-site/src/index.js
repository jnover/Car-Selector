import React from 'react';
import ReactDOM from 'react-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import './index.css';

class Result extends React.Component {
	render() {
		let id = this.props.val.id,
			lot_name = this.props.val.lot.name,
			lot_city = this.props.val.lot.city,
			lot_country = this.props.val.lot.country,
			make = this.props.val.make,
			model = this.props.val.model,
			year = this.props.val.year,
			vin = this.props.val.vin,
			askingPrice = this.props.val.askingPrice,
			dealerCost = this.props.val.dealerCost,
			color = this.props.val.color || "white",
			dateListed = this.props.val.dateListed;
			
		return (
			<div className="car-information">
				<Accordion>
					<AccordionSummary
						style={{backgroundColor: color}}
						id="panel1a-header">
						<div>{year} {make} {model}</div> <div style={{marginLeft: "auto"}}>${askingPrice}</div>
					</AccordionSummary>
					<AccordionDetails style={{backgroundColor: "#D3D3D3"}}>
						<Typography>
							<div name="car-id">
								ID: {id}
							</div>
							<div name="car-lot-name">
								Lot: {lot_name} of ({lot_city}, {lot_country})
							</div>
							<div name="car-vin">
								VIN: {vin}
							</div>
							<div name="car-dealercost">
								Dealer cost: {dealerCost}
							</div>
							<div name="car-color">
								Color: {color}
							</div>
							<div name="car-datelisted">
								Date listed: {dateListed}
							</div>
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		);
	}
}

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {search: "", results: []};
	}
	
	searchCars = (e) => {
		var query = e.target.value.toLowerCase();
		if (query.length >= 2) { // less strain on the searching
			this.setState({
				search: query, 
				// Horrendous if statement, I previously attempted using some().
				results: this.props.results.filter(res =>
					(res.id && res.id.toLowerCase().includes(query)) 
					|| (res.lot && (res.lot.name.toLowerCase().includes(query) || res.lot.city.toLowerCase().includes(query) || res.lot.country.toLowerCase().includes(query))) 
					|| (res.make && res.make.toLowerCase().includes(query)) 
					|| (res.model && res.model.toLowerCase().includes(query)) 
					|| (res.year && res.year.toString().includes(query)) 
					|| (res.vin && res.vin.toLowerCase().includes(query)) 
					|| (res.askingPrice && res.askingPrice.toString().includes(query)) 
					|| (res.dealerCost && res.dealerCost.toString().includes(query)) 
					|| (res.color && res.color.toLowerCase().includes(query)) 
					|| (res.dateListed && res.dateListed.toLowerCase().includes(query))
				)
			});
		}
		else
			this.setState({results: []});
	}
	
	render() {
		var results = this.state.results
		return (
			<div>
				<input 
					className="search-input"
					onChange={this.searchCars}
					placeholder="Search for a car" 
					type="text" 
				/>
				{results.slice(0, 20).map(i => {
					return <Result 
						val={i} />
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
				<SearchBox results={results}/>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Selector />,
	document.getElementById('root')
);
