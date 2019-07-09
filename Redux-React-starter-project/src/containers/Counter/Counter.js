import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { connect } from 'react-redux';
import { increment, decrement, add, subtract, storeResult, deleteResult, reset } from '../../store/actions/index';

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.increment} />
                <CounterControl label="Decrement" clicked={this.props.decrement} />
                <CounterControl label="Add 5" clicked={this.props.add} />
                <CounterControl label="Subtract 5" clicked={this.props.sub} />
                <CounterControl label="Reset" clicked={this.props.reset} />
                <hr />
                <button onClick={this.props.onStoreResult.bind(this, this.props.ctr)}>STORE RESULT</button>
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
        ctr: state.counter.counter,
        storeResult: state.result.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        add: () => dispatch(add({ value: 5 })),
        sub: () => dispatch(subtract({ value: 5 })),
        reset: () => dispatch(reset()),
        onStoreResult: (ctr) => dispatch(storeResult(ctr)),
        onDeleteREsult: (id) => dispatch(deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);