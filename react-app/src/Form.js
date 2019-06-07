import React, { Component } from 'react';

class Form extends Component {
    initialState = {
        name: '',
        job: '',
    }

    state = this.initialState;
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    saveData = () => {
        if (this.state.name && this.state.job) {
            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        }
    }

    render() {
        const { name, job } = this.state;
        return (
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input name='name' type='text' value={name} onChange={this.handleChange} className='form-control' />
                </div>
                <div className="form-group">
                    <label>Job:</label>
                    <input name='job' type='text' value={job} onChange={this.handleChange} className='form-control' />
                </div>
                <div className="form-group">
                    <input name='job' type='button' className='btn btn-primary' value='Save' onClick={this.saveData} />
                </div>
            </form>
        )
    }
}

export default Form;
