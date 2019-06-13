import React from 'react';
import Table from './Table';
import Form from './Form';
import API from './API';

class App extends React.Component {
    state = {
        characters: []
    }

    deleteRow = (index) => {
        const { characters } = this.state;
        characters.splice(index, 1);
        // const chars = characters.filter((character, i) => { return i !== index });
        this.setState({
            characters: characters
        })
    }

    handleSubmit = character => {
        console.log(this.state.characters);
        this.setState({ characters: [...this.state.characters, character] })
    }

    render() {
        return (
            <div className="container">
                <Table characters={this.state.characters} deleteRow={this.deleteRow} />
                <Form handleSubmit={this.handleSubmit} />
                <API />
            </div>
        )
    }
}

export default App;