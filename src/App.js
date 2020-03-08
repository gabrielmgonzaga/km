import React from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';

// style
import styled from 'styled-components';
import './App.scss';

const SelectContainer = styled.select`
  width: 160px;
  height: 30px;
`

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      people: [],
    }
  }

  componentDidMount = () => {
    this.fetchPeople()

    // Fetches new people every 5seconds
    // this.interval = setInterval(() => this.fetchPeople(), 5000);
  }

  fetchPeople = async () => {
    try {
      const res = await PeopleApi.getPeople();

      this.setState({
        people: res
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = (val) => {
    
  }

  renderPeople = () => {
    if(this.state.people) {
      return this.state.people.map((person) => (
          <div key={person.email} className="card-wrapper">
            <img style={{ height: 90 }} src={require('./images/background.jpg')} />
            <div className="person">
              <img src={person.picture.large} alt=""/>
              <div className="name">
                { `${person.name.first} ${person.name.last}` }
              </div>
              <div className="gender">
                { person.gender }
              </div>
              <a href="!#">Connect</a>
            </div>
          </div>
      ));
    }

    return null;
  }

  render = () => {
    return (
      <div>
        <SelectContainer onChange={(val) => this.handleChange(val)}>
            <option>No Filter</option>
            <option>Male</option>
            <option>Female</option>
        </SelectContainer>

        { this.renderPeople() }

      </div>
    );
  }

}