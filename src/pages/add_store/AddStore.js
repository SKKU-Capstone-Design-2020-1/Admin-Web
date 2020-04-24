import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { ADD_STORE_STEPS } from "../../libs/const";
import StoreInformation from "../../layouts/store_information/StoreInformation";

const AddStore = () => {
    const classes = useStyles();
    const [curStep, setCurStep] = useState(0);


    return (
        <div className={classes.root}>
            <Stepper activeStep={curStep} className={classes.stepper} alternativeLabel>
                {ADD_STORE_STEPS.map((label, idx) => (
                    <Step key={idx}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className={classes.contents}>
                {curStep == 0 && <StoreInformation />}
            </div>
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'center',
    },
    stepper: {
        background: 'none'
    },
    contents: {
        maxWidth: 500, 
        margin: 'auto',
    }
}))
export default AddStore;