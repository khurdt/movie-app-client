import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { MainView } from './components/main-view/main-view';
//import default MainView from './components/main-view/main-view.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

//Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//Main component (will eventually use all the others)
class myFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid style={{ margin: '0', padding: '0' }}>
          <MainView />
        </Container>
      </Provider>
    );
  }
}



//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);