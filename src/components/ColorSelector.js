import {  FormControl, InputLabel, makeStyles, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { colors } from '../utils/constants';

const useStyles = makeStyles(theme => ({
    circle: {
        marginRight: theme.spacing(1),
        display: 'inline-block',
        width: 24,
        height: 24,
        borderRadius: '50%'
    },
    selectRoot: {
      display: 'flex',
      alignItems: 'center',
    }
}))

export default function ColorSelector({name, color, handleChange}) {
    const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">{name}</InputLabel>
      <Select
        label={name}
        value={color}
        onChange={handleChange}
        classes={{root: classes.selectRoot}}
      >
        <MenuItem value="x">None</MenuItem> 
        {colors.map(color => {
            return (
                <MenuItem value={color.code}>
                    <div className={classes.circle}  style={{backgroundColor: color.code}}/>
                    {color.name}
                </MenuItem>
        )})}
      </Select>
    </FormControl>
  );
}