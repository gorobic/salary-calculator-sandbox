import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { InputAdornment } from 'material-ui/Input';

class Field extends Component {
    render() {
        return (
                <TextField
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{this.props.appendInput}</InputAdornment>,
                    }}
                    type="number"
                    value={this.props.name}
                    onChange={this.props.change}
                    label={this.props.fieldLabel}
                    margin="normal"
                />
        );
    }
}

export default Field;
