import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { InputAdornment } from 'material-ui/Input'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'

class AddField extends Component {
    constructor(props){
        super(props)
        this.state = {
            size: '',
            fieldType: props.fieldType[0]
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    modalClick(){
        this.props.handleCloseModal()
        this.props.handleAddToState(this.state)
    }

    fieldTypeRender(fieldType){
        if(fieldType[0] === 'currencies') {
            return (
                <div>
                    <TextField
                        type="text"
                        label="Nume Valuta:"
                        margin="normal"
                        onChange={(event) => this.setState({label: event.target.value})}
                    />
                    <br />
                    <TextField
                        InputProps={{
                            endAdornment: <InputAdornment position="end">RON</InputAdornment>,
                        }}
                        type="number"
                        min="0"
                        label="Rata de schimb:"
                        margin="normal"
                        onChange={(event) => this.setState({curs: event.target.value})}
                    />
                </div>
            )
        }else{
            return (
                <div>
                    <TextField
                        type="text"
                        label="Nume Perioada:"
                        margin="normal"
                        onChange={(event) => this.setState({label: event.target.value})}
                    />
                    <br />
                    <TextField
                        type="number"
                        min="0"
                        label="Rația:"
                        margin="normal"
                        onChange={(event) => this.setState({ratio: event.target.value})}
                    />
                    <br />
                    <FormControl
                        margin="normal"
                    >
                        <InputLabel htmlFor="age-helper">Semnul</InputLabel>
                        <Select
                            value={this.state.size}
                            onChange={this.handleChange}
                            input={<Input name="size" id="age-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'*'}>* (inmultim salariul)</MenuItem>
                            <MenuItem value={'/'}>/ (impartim salariul)</MenuItem> constructor
                        </Select>
                        <FormHelperText>Inmultim sau impartim salariul de baza?</FormHelperText>
                    </FormControl>
                </div>
            )
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                { this.fieldTypeRender(this.props.fieldType) }
                <Button
                    margin="normal"
                    variant="raised"
                    color="primary"
                    onClick={this.modalClick.bind(this)}
                    disabled={
                        (this.state.fieldType === 'currencies' && (!this.state.label || !this.state.curs))
                        ||
                        (this.state.fieldType === 'fieldsInfo' && (!this.state.label || !this.state.ratio || !this.state.size))
                    }
                >
                    Adaugă
                </Button>
            </div>
        );
    }
}

export default AddField;
