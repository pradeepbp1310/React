import React, { Component } from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Actions</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.characters.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    {/* <button onClick={() => props.deleteRow(index)} className='btn btn-primary' type="button">Edit</button> */}
                    <button onClick={() => props.deleteRow(index)} className='btn btn-danger' type="button">Delete</button>
                </td>

            </tr>
        )
    })
    return (
        <tbody>
            {rows}
        </tbody>
    )
}
class Table extends Component {
    render() {
        const { characters, deleteRow } = this.props;
        return (
            <table className='table table-dark'>
                <TableHeader />
                <TableBody characters={characters} deleteRow={deleteRow} />
            </table>
        )
    }
}

export default Table;