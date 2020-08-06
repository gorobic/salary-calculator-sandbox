import React, { Component } from 'react'
import './App.css'
import Field from './ComponentaMea'
import AddField from './addField'
import { FormControl } from 'material-ui/Form';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            salariuBaza: 2300,
            defaultFieldsLabel: 'Per luna',
            defaultCurrenciesLabel: 'RON',
            fieldsInfo: [
                {
                    label: 'Per zi',
                    ratio: '22',
                    size: '/'
                },
                {
                    label: 'Per An',
                    ratio: '12',
                    size: '*'
                },
                {
                    label: 'Per Oră',
                    ratio: '168',
                    size: '/'
                }
            ],
            currencies: [
                {
                    label: 'EUR',
                    curs: 4.66
                },
                {
                    label: 'USD',
                    curs: 3.77
                },

                {
                    label: 'RUB',
                    curs: 0.77
                },
                {
                    label: 'BGP',
                    curs: 5.2
                },
            ],
        }
    }

    handleChange(value){
        if(value > 0) {
            this.setState({salariuBaza: value})
        }
    }

    handleRemoveElement(value, index) {
        //return () => {
            let temporar = this.state[value].slice()
            temporar.splice(index, 1)
            this.setState({[value]: temporar})
        //}
    }

    handleOpenModal = (value) => {
        this.setState({ open: true, modalAdd: [value] });
    };

    handleCloseModal = () => {
        this.setState({ open: false });
    };

    handleAddToState = (data) => {
        console.log(data.fieldType);
        let temporar = this.state[data.fieldType].slice()
        if(data.curs){
            temporar.push(
                {
                    label: data.label,
                    curs: data.curs
                }
            )
        }else{
            temporar.push(
                {
                    label: data.label,
                    ratio: data.ratio,
                    size: data.size
                }
            )
        }
        this.setState({ [data.fieldType]: temporar })
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="App" style={{ padding: 12 }}>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleCloseModal}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <AddField fieldType={this.state.modalAdd} handleCloseModal={this.handleCloseModal.bind(this)} handleAddToState={this.handleAddToState.bind(this)}></AddField>
                    </div>
                </Modal>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button onClick={this.handleOpenModal.bind(this, 'fieldsInfo')} size="small" variant="raised" color="primary">
                                    + perioada
                                </Button>

                                <Button onClick={this.handleOpenModal.bind(this, 'currencies')} size="small" variant="raised" color="primary">
                                    + valuta
                                </Button>
                            </TableCell>
                            <TableCell>
                                {this.state.defaultCurrenciesLabel}
                            </TableCell>
                            { this.state.currencies.map((item, index) => (
                                <TableCell key={index} >
                                    {item.label}
                                    <IconButton onClick={this.handleRemoveElement.bind(this, 'currencies', index)} aria-label="Delete" data-index={index} data-field="currencies">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            )) }
                        </TableRow>
                        <TableRow>
                            <TableCell style={{border:'none'}}>
                                {this.state.defaultFieldsLabel}
                            </TableCell>
                            <TableCell style={{border:'none'}}>
                                <FormControl fullWidth >
                                    <Field
                                        name={
                                            Math.round(
                                                (
                                                    this.state.salariuBaza
                                                ) * 100
                                            ) / 100
                                        }
                                        change={
                                            (event) => this.handleChange(
                                                event.target.value
                                            )
                                        }
                                        fieldLabel={this.state.defaultCurrenciesLabel + ' ' + this.state.defaultFieldsLabel}
                                        appendInput={this.state.defaultCurrenciesLabel}
                                    />
                                </FormControl>
                            </TableCell>
                            { this.state.currencies.map((item, index) => (
                                <TableCell key={index} style={{border:'none'}}>
                                    <FormControl fullWidth >
                                        <Field
                                            name={
                                                Math.round(
                                                    (
                                                        this.state.salariuBaza / item.curs
                                                    ) * 100
                                                ) / 100
                                            }
                                            change={
                                                (event) => this.handleChange(
                                                    event.target.value * item.curs
                                                )
                                            }
                                            fieldLabel={item.label + ' ' + this.state.defaultFieldsLabel}
                                            appendInput={item.label}
                                        />
                                    </FormControl>
                                </TableCell>
                            )) }
                        </TableRow>
                        { this.state.fieldsInfo.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell style={{border:'none'}}>
                                    {item.label}
                                    <IconButton onClick={this.handleRemoveElement.bind(this, 'fieldsInfo', index)} aria-label="Delete" data-index={index} data-field="fieldsInfo">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{border:'none'}}>
                                    <FormControl fullWidth >
                                        <Field
                                            name={
                                                Math.round(
                                                    (
                                                        item.size === '/'
                                                            ? this.state.salariuBaza / item.ratio
                                                            : this.state.salariuBaza * item.ratio
                                                    ) * 100
                                                ) / 100
                                            }
                                            change={
                                                (event) => this.handleChange(
                                                    item.size === '/'
                                                        ? event.target.value * item.ratio
                                                        : event.target.value / item.ratio
                                                )
                                            }
                                            fieldLabel={this.state.defaultCurrenciesLabel + ' ' + item.label}
                                            appendInput={this.state.defaultCurrenciesLabel}
                                        />
                                    </FormControl>
                                </TableCell>
                                { this.state.currencies.map((item_child, index_child) => (
                                    <TableCell key={index_child} style={{border:'none'}}>
                                        <FormControl fullWidth >
                                            <Field
                                                name={
                                                    Math.round(
                                                        (
                                                            item.size === '/'
                                                                ? this.state.salariuBaza / item_child.curs / item.ratio
                                                                : this.state.salariuBaza / item_child.curs * item.ratio
                                                        ) * 100
                                                    ) / 100
                                                }
                                                change={
                                                    (event) => this.handleChange(
                                                        item.size === '/'
                                                            ? event.target.value * item_child.curs * item.ratio
                                                            : event.target.value * item_child.curs / item.ratio
                                                    )
                                                }
                                                fieldLabel={item_child.label + ' ' + item.label}
                                                appendInput={item_child.label}
                                            />
                                        </FormControl>
                                    </TableCell>
                                )) }
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>

            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
