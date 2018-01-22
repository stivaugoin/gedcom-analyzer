import React, { Component } from 'react';
import gedcom from 'parse-gedcom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import { PersonParser, TreeParser } from './classes/parser';
import { Person, Persons } from './classes';
import List from './components/List';
import ListItem from './components/ListItem';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filename: '',
			persons: [],
		};

		this.localStorage = window.localStorage;

		this.onFileLoaded = this.onFileLoaded.bind(this);
		this.clear = this.clear.bind(this);
	}

	componentWillMount() {
		const dataParsed = this.localStorage.getItem('dataParsed');
		const filename = this.localStorage.getItem('filename');

		if (filename && dataParsed !== 'undefined') {
			const data = JSON.parse(dataParsed);

			const myTree = new TreeParser(data);

			this.setState({
				persons: myTree.getPersons().map(person => new PersonParser(data, person).format()),
				filename,
			});
		}
	}

	onFileLoaded(event) {
		if (typeof window.FileReader !== 'function') {
			throw new Error('The file API isn\'t supported on this browser.');
		}
		const input = event.target;
		if (!input) {
			throw new Error('The browser does not properly implement the event object');
		}
		if (!input.files) {
			throw new Error('This browser does not support the `files` property of the file input.');
		}
		if (input.files[0]) {
			const file = input.files[0];
			const filename = file.name;
			const fileReader = new FileReader();
			fileReader.onload = (fileContent) => {
				const { result } = fileContent.currentTarget;
				const dataParsed = gedcom.parse(result);

				this.localStorage.setItem('dataParsed', JSON.stringify(dataParsed));
				this.localStorage.setItem('filename', filename);

				const myTree = new TreeParser(dataParsed);

				const persons = myTree.getPersons().map(
					person => new PersonParser(dataParsed, person).format(),
				);

				this.setState({
					filename,
					persons,
				});
			};
			fileReader.readAsText(file);
		}
	}

	clear() {
		this.localStorage.clear();

		this.setState({
			filename: '',
			persons: [],
		});
	}

	renderLongestLife() {
		const persons = new Persons(this.state.persons);
		const person = persons.getLongestLife();
		const { format } = new Person(person);
		return `${format} - ${person.age} years`;
	}

	renderShortestLife() {
		const persons = new Persons(this.state.persons);
		const person = persons.getShortestLife();
		const { format } = new Person(person);
		return `${format} - ${person.age} years`;
	}

	renderAverageAge() {
		const persons = new Persons(this.state.persons);
		const age = persons.getAverageAge();
		return `${age} years`;
	}

	renderMedianAge() {
		const persons = new Persons(this.state.persons);
		const age = persons.getMedianAge();
		return `${age} years`;
	}

	renderOldestAncestor() {
		const persons = new Persons(this.state.persons);
		const oldest = persons.getOldestAncestor();
		const { format } = new Person(oldest);
		if (oldest.age) {
			return `${format} - ${oldest.age} years`;
		}

		return format;
	}

	render() {
		return (
			<div>
				<div>
					{!this.state.filename ? (
						<input type="file" onChange={this.onFileLoaded} />
					) : (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								margin: '1em 2em',
							}}
						>
							<div style={{ flex: 1 }}>
								<h3>{this.state.filename}</h3>
							</div>
							<div style={{ flex: 1, textAlign: 'right' }}>
								<button onClick={this.clear}>Clear</button>
							</div>
						</div>
					)}
				</div>
				<div style={{ margin: '1em 2em', fontSize: '12px' }}>
					{!!this.state.filename && (
						<Tabs defaultIndex={1}>
							<TabList>
								<Tab>Raw data</Tab>
								<Tab>Persons</Tab>
							</TabList>

							<TabPanel>
								<div>
									<h3>Persons</h3>
									<hr />
									{this.state.persons.map(d => (
										<div key={d.pointer}>
											<p><strong>{d.pointer} - {d.names[0].complete}</strong></p>
											<pre>{JSON.stringify(d, null, 2)}</pre>
											<hr />
										</div>
									))}
								</div>
							</TabPanel>
							<TabPanel>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}
								>
									<div>
										<h3>List of people</h3>
										<hr />
										<List>
											{this.state.persons.map((p) => {
												const person = new Person(p);
												return <ListItem>{person.format}</ListItem>;
											})}
										</List>
									</div>

									<div>
										<h3>Statistics</h3>
										<hr />
										<div><strong>Amount of people:</strong> {this.state.persons.length}</div>
										<hr />
										<div><strong>Longest life:</strong> {this.renderLongestLife()}</div>
										<div><strong>Shortest life:</strong> {this.renderShortestLife()}</div>
										<div><strong>Oldest ancestor:</strong> {this.renderOldestAncestor()}</div>
										<hr />
										<div><strong>Average age:</strong> {this.renderAverageAge()}</div>
										<div><strong>Median age:</strong> {this.renderMedianAge()}</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
					)}
				</div>
			</div>
		);
	}
}

export default App;
