import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'Cheese'},
    {label: 'Meat', type: 'Meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControl}>
        {
            controls.map(control => (
                    <BuildControl 
                        key={control.label} 
                        label={control.label} 
                    />
                )
            )
        }
        
    </div>
);

export default buildControls;