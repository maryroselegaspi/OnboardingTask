import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';
import 'semantic-ui-css/semantic.min.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
      return (
          <div className="ui inverted segment" >
              <div className="ui inverted secondary pointing menu">
                  <Menu.Item as={NavLink} exact to='/'
                      name='home'
                  />
                  <Menu.Item as={NavLink} to='/customer'
                      name='customer'
                  />
                  <Menu.Item as={NavLink} to='/product'
                      name='product'
                  />
                  <Menu.Item as={NavLink} to='/store'
                      name='store'
                  />
                  <Menu.Item as={NavLink} to='/sales'
                      name='sales'
                  />

               </div>
          </div>

     
    );
  }
}
