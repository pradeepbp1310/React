import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import counterReducer from './store/reducers/counterReducer';
import resultReducer from './store/reducers/resultReducer';
import thunk from 'redux-thunk';

const logger = store => {
    return next => {
        return action => {
            console.log('middleware', store.getState());
            const result = next(action)
            console.log(result);
            return result;
        }
    }
}

const rootReducer = combineReducers(
    {
        counter: counterReducer,
        result: resultReducer
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
