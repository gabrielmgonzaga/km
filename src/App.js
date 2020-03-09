import React from 'react';

// api
import { PeopleApi } from './services/PeopleApi.js';

// background image
import backgroundImage from './images/background.jpg'

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

    // Fetches new people every 5 seconds
    this.interval = setInterval(() => this.fetchPeople(), 5000);
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

    if (val.target.value === 'No Filter') {
      this.setState({
        people: this.state.people
      })
    }

    if (val.target.value === 'Male') {
      this.setState({
        people: this.state.people.filter(i => i.gender === 'male')
      })
    }

    if (val.target.value === 'Female') {
      this.setState({
        people: this.state.people.filter(i => i.gender === 'female')
      })
    }
  }

  deleteCard = (i) => {
    this.state.people.splice(i, 1)
    this.setState({
      people: this.state.people
    })
  }

  renderPeople = () => {
    if(this.state.people) {
      return this.state.people.map(({ picture, name, gender }, i) => (
          <div key={i} className="card-wrapper">
            <a className="close-icon" onClick={ () => this.deleteCard(i) } href="#">X</a>
            <img style={{ height: 90 }} src={backgroundImage} />
            <div className="person">
              <img src={picture.large} alt=""/>
              <div className="name">
                { `${name.first} ${name.last}` }
              </div>
              <div className="gender">
                { `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`}
              </div>
              <a className="connect" href="#">Connect</a>
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