import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: ''
    }
  }

  initializeURLs = () => {
    getUrls()
    .then(data => this.setState({urls: data.urls}))
    .catch(() => this.setState({ error: 'Something went wrong' }))
  }

  submitNewURL = (title, longUrl) => {
    let body = {
      title: title,
      long_url: longUrl
    }
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then(() => this.initializeURLs())
  }

  componentDidMount() {
    this.initializeURLs()
  }
    

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitNewURL={this.submitNewURL}/>
        </header>
        {this.state.error && <h2>{this.state.error}</h2>} 
        {!this.state.error && <UrlContainer urls={this.state.urls}/>}
        
      </main>
    );
  }
}

export default App;
