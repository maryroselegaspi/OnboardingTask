import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

import './custom.css'
import { Customer } from './components/Customer/Customer';
// import {Create} from './components/Customer/Create';
// import { Update } from './components/Customer/Update';
// import { Delete } from './components/Customer/Delete';

 import { Product } from './components/Product/Product';
// import { ProductCreate } from './components/Product/ProductCreate';
// import { ProductUpdate } from './components/Product/ProductUpdate';
// import { ProductDelete } from './components/Product/ProductDelete';

 import { Store } from './components/Store/Store';
// import { StoreCreate } from './components/Store/StoreCreate';
// import { StoreUpdate } from './components/Store/StoreUpdate';
//import { StoreDelete } from './components/Store/StoreDelete';

 import { Sales } from './components/Sales/Sales';
// import { SalesCreate } from './components/Sales/SalesCreate';
// import { SalesUpdate } from './components/Sales/SalesUpdate';
// import { SalesDelete } from './components/Sales/SalesDelete';

export default class App extends Component {
 static displayName = App.name;

 render () {
   return (
     <Layout>
       <Route exact path='/' component={Home} />
      {/* <Route path='/customer/create' component = {Create} /> */}
       <Route path='/customer/customer' component = {Customer} />
       {/* <Route path='/customer/update/:id' component = {Update} />
       <Route path='/customer/delete/:id' component = {Delete} /> */}
 
       <Route path='/product/product' component = {Product} />
     {/*  <Route path='/product/create' component = {ProductCreate} />
       <Route path='/product/update' component = {ProductUpdate} />
       <Route path='/product/delete' component = {ProductDelete} /> */}

       <Route path='/store/store' component = {Store} />
       {/* <Route path='/store/create' component = {StoreCreate} />
       <Route path='/store/update/:id' component = {StoreUpdate} />
       <Route path='/store/delete/:id' component = {StoreDelete} /> */}
 
       <Route path='/sales/sales' component = {Sales} />
{/*       <Route path='/sales/create' component = {SalesCreate} />
       <Route path='/sales/update/:id' component = {SalesUpdate} />
       <Route path='/sales/delete/:id' component = {SalesDelete} />  */}

     </Layout>
   );
 }
}
