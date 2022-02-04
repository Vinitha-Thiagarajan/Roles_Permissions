import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Maintennace from "./Maintennace";
import Support from "./Support";
import Home from "./Home";
import Configurations from "./Configuration"
import Source from "./Configuration/SubPages/Source"
import SourceMap from "./Configuration/SubPages/SourceMap"
import SlackIntegration from "./Configuration/SubPages/Slack"
import TestConfiguration from "./Configuration/SubPages/TestConfiguration"
import Profile from "./Profile"
import Admin from "./Admin"
import Details from "./Dashboard/Details"
import TrendChart from "./TrendChart"
import GeneralTrend from "./TrendChart/SubPages/General"
import OverAllTrend from "./TrendChart/SubPages/OverAll"
import FailureTrend from "./TrendChart/SubPages/Failure"
import Dashboard from "./Dashboard";
import NotFound from './NotFound'
import AccessBlock from './AccessBlock'
import ParticularTrend from './TrendChart/ParticularSource'
import axios from 'axios';
import { connect, useSelector } from "react-redux";
import { useOktaAuth } from '@okta/okta-react';
import { fetch } from '../utils'
import query from '../assets/constant/query';
import { UserDetails } from "../../../../reducers/user/actions"


axios.defaults.headers.common['Authorization'] = 'Token 3c16b149993699327510049177f3008584232b7d';
axios.defaults.headers.common['Content-Type'] = 'application/json';
function Main(props) {
  const { authState, authService } = useOktaAuth();
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [tokenStatus, setTokenStatus] = useState(false)
  const tokenupdate = async () => {
    if (userInfo && userInfo.email) {
      if(process.env.REACT_APP_API_URL == "https://tardis.conde.io/api/graphql")
      axios.defaults.headers.common['Authorization'] = 'Token 3c16b149993699327510049177f3008584232b7d';
      else
      axios.defaults.headers.common['Authorization'] = 'Token 5c16b149993699327510049177f3008584233b7d';

      axios.defaults.headers.common['Content-Type'] = 'application/json';
      let response = await fetch(query.User(userInfo.email));
      let tokenval = response && response.data && response.data.data && response.data.data.users && response.data.data.users.results.length > 0 ? response.data.data.users.results[0].token : ""

      if (response.data.data.users && response.data.data.users.results) {
        setToken(tokenval)
        setTokenStatus(!tokenStatus)
      }
      axios.defaults.headers.common['Authorization'] = 'Token ' + tokenval;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      (tokenval) && props.UserDetails();
    }
  }

  const getUserInfo = async () => {
    let userinfo = await authService.getUser();
    setUserInfo(userinfo);
  }
  useEffect(() => {
    getUserInfo();
  }, [])

  useEffect(() => {
    if (authState.isAuthenticated && !token) {
      tokenupdate();
    }
  }, [userInfo, authState, tokenStatus])
  if (!token) {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    )

  }
  return (

    <Switch>
      <Route exact path="/tardis/dashboard" component={Dashboard} />
      <Route path="/tardis/maintenance" component={Maintennace} />
      <Route path="/tardis/configurations" component={Configurations} />
      <Route path="/tardis/source-configurations" component={Source} />
      <Route path="/tardis/source-map-configurations" component={SourceMap} />
      <Route path="/tardis/slack-integration" component={SlackIntegration} />
      <Route path="/tardis/test-case-configurations" component={TestConfiguration} />
      <Route path="/tardis/profile" component={Profile} />
      <PrivateRoute path="/tardis/admin">
        <Admin />
      </PrivateRoute>
      <Route path="/tardis/source-details/:sourcename/:logdate" component={Details} />
      <Route path="/tardis/source-details/:sourcename" component={Details} />
      <Route path="/tardis/trend-chart" component={TrendChart} />
      <Route path="/tardis/trend-chart-general" component={GeneralTrend} />
      <Route path="/tardis/trend-chart-overall" component={OverAllTrend} />
      <Route path="/tardis/trend-chart-failure" component={FailureTrend} />
      <Route path="/tardis/trend-source-chart/:sourcename" component={ParticularTrend} />
      <Route path="/tardis/access-block" component={AccessBlock} />
      <Route component={NotFound} />
    </Switch>

  );
}
function PrivateRoute({ component, ...rest }) {
  const userdata = useSelector(state => state.user);
  const { user } = userdata;
  let gplist = user && user.groups ? user.groups.map((e) => e.name) : [];
  let allow = false;
  if (gplist.indexOf("Configuration Admin") > -1) {
    allow = true;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        allow ? (
          component
        ) : (
            <Redirect
              to={{
                pathname: "/tardis/access-block",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
export default connect(
  null, { UserDetails }
)(Main);
