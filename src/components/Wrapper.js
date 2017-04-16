import React from 'react'
import { Scene, Router, Drawer } from 'react-native-router-flux'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import MenuDrawer from './MenuDrawer'
import Search from './Search'
import AuctionDetail from './AuctionDetail'
import CreateAuction from './CreateAuction'
import JoinedAuctions from './JoinedAuctions'
import MyAuctions from './MyAuctions'
import WonAuctions from './WonAuctions'

const Wrapper = () => (
  <Router>
    <Scene key='MenuDrawer' component={MenuDrawer} open={false} type='reset'>
      <Scene key='main' tabs={false} >
        <Scene key='CreateAuction' component={CreateAuction} hideNavBar />
        <Scene key='Search' component={Search} hideNavBar />
        <Scene key='Login' component={Login} hideNavBar />
        <Scene key='Home' component={Home} hideNavBar />
        <Scene key='Register' component={Register} hideNavBar />
        <Scene key='AuctionDetail' component={AuctionDetail} hideNavBar />
        <Scene key='JoinedAuctions' component={JoinedAuctions} hideNavBar />
        <Scene key='WonAuctions' component={WonAuctions} hideNavBar />
        <Scene key='MyAuctions' component={MyAuctions} hideNavBar />
      </Scene>
    </Scene>
  </Router>
)

export default Wrapper
