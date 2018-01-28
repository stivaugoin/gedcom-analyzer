/* eslint-disable jsx-a11y/anchor-is-valid, no-script-url */

import React, { Component } from 'react';
import gedcom from 'parse-gedcom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CurrentFile from './components/CurrentFile';
import Home from './views/Home';

import './styles/style.css';
import './styles/vendors/feather-icons/feather.css';
import TreeParser from './classes/parser/TreeParser';
import PersonParser from './classes/parser/PersonParser';
import { People } from './classes';

// eslint-disable-next-line
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
      people: {},
    };

    this.localStorage = window.localStorage;
    const filename = this.localStorage.getItem('filename');
    const treeRaw = window.localStorage.getItem('dataParsed');

    if (treeRaw) {
      const data = JSON.parse(treeRaw);

      const tree = new TreeParser(data);
      const people = tree.getPersons().map(
        person => new PersonParser(data, person).format(),
      );

      this.state = {
        filename,
        people: new People(people),
      };
    }

    this.clearFile = this.clearFile.bind(this);
    this.onFileLoaded = this.onFileLoaded.bind(this);
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

        const people = myTree.getPersons().map(
          person => new PersonParser(dataParsed, person).format(),
        );

        this.setState({
          filename,
          people: new People(people),
        });
      };
      fileReader.readAsText(file);
    }
  }

  clearFile() {
    this.localStorage.clear();

    this.setState({
      filename: '',
      people: {},
    });
  }

  render() {
    return (
      <div className="header-dark sidebar-light sidebar-expand">
        <div id="wrapper" className="wrapper">
          <Navbar />
          <div className="content-wrapper">
            <Sidebar />
            <main className="main-wrapper clearfix">
              {this.state.filename ? [
                <CurrentFile filename={this.state.filename} onClickClose={this.clearFile} />,
                <Home people={this.state.people} />,
              ] : (
                <input type="file" onChange={this.onFileLoaded} />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
