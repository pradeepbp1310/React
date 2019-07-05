import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { connect } from 'react-redux'

class Counter extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.increment} />
                <CounterControl label="Decrement" clicked={this.props.decrement} />
                <CounterControl label="Add 5" clicked={this.props.add} />
                <CounterControl label="Subtract 5" clicked={this.props.sub} />
                <CounterControl label="Reset" clicked={this.props.reset} />
                <hr />
                <button onClick={this.props.onStoreResult}>STORE RESULT</button>
                <ul>
                    {
                        this.props.storeResult.map(sr => {
                            return <li key={sr.id} onClick={() => this.props.onDeleteREsult(sr.id)}>{sr.value}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
        storeResult: state.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        increment: () => dispatch({ type: 'INCREMENT' }),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        add: () => dispatch({ type: 'ADD', payload: { value: 5 } }),
        sub: () => dispatch({ type: 'SUBSTRACT', payload: { value: 5 } }),
        reset: () => dispatch({ type: 'RESET' }),
        onStoreResult: () => dispatch({ type: 'STORE_RESULT' }),
        onDeleteREsult: (id) => dispatch({ type: 'DELETE_RESULT', resId: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);