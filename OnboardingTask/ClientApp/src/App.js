import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import { Customer } from './components/Customer/Customer';
import { Product } from './components/Product/Product';
import { Store } from './components/Store/Store';
import { Sales } from './components/Sales/Sales';

export default class App extends Component {
 static displayName = App.name;

 render () {
   return (
     <Layout>
       <Route exact path='/' component={Home} />
       <Route path='/customer' component = {Customer} />
       <Route path='/product' component = {Product} />
       <Route path='/store' component = {Store} />
       <Route path='/sales' component = {Sales} />

     </Layout>
   );
 }
}
