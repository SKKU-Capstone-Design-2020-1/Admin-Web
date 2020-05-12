import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { ADD_STORE_STEPS } from "../../libs/const";
import StoreInformation from "../../layouts/store_information/StoreInformation";
import MapBuilder from "../../layouts/map_builder/MapBuilder";
import Grid from "@material-ui/core/Grid";
import cuid from "cuid";
import { useDispatch } from "react-redux";
import { registerStore } from "./AddStoreActions";

const temp_map_id = cuid.slug();
const AddStore = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [curStep, setCurStep] = useState(0);
    const [storeData, setStoreData] = useState({
        postal_code: '',
        address: '',
        address_detail: '',
        name: '',
        address_info: {

        },
        latitude: '',
        longtitude: '',
        limit_time: '',
        img_file: null,
    });
    const [maps, setMaps] = useState([
        { name: 'TEMP', height: 400, width: 500, map_id: temp_map_id }
    ]);
    const [seatGroups, setSeatGroups] = useState([
        { clicked: false, beacon_ids: [], map_id: temp_map_id, seat_id: cuid.slug(), deg: 0, x: 0, y: 0, seats: [{ status: 0, id: "1" }, { status: 0, id: "2" }] },
        { clicked: false, beacon_ids: [], map_id: temp_map_id, seat_id: cuid.slug(), deg: 0, x: 150, y: 100, seats: [{ status: 0, id: "3" }, { status: 0, id: "4" }] },
    ])

    const handleStep = (value) => {
        if (curStep + value > 2){
            dispatch(registerStore({maps, seatGroups, storeData}));
        }
        else setCurStep(curStep + value >= 0 ? curStep + value : curStep)
    }


    return (
        <div className={classes.root}>
            <Stepper activeStep={curStep} className={classes.stepper} alternativeLabel>
                {ADD_STORE_STEPS.map((label, idx) => (
                    <Step key={idx}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <main>
                {curStep === 0 &&
                    <StoreInformation storeData={storeData} setStoreData={setStoreData} />}
                {curStep === 1 &&
                    <MapBuilder maps={maps} setMaps={setMaps} seatGroups={seatGroups} setSeatGroups={setSeatGroups} />}
            </main>

            <div className={classes.btnRoot}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} md={4}>
                        <Button
                            disabled={curStep > 0 ? false : true}
                            onClick={() => handleStep(-1)}
                            fullWidth
                            className={classes.button}
                            variant="contained"
                            disableElevation>
                            Previous
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            onClick={() => handleStep(1)}
                            fullWidth
                            className={classes.button}
                            variant="contained"
                            disableElevation
                            color="primary">
                            {curStep === 2 ? "Complete" : "Next"}
                        </Button>
                    </Grid>
                </Grid>

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
        margin: 'auto',
    },
    btnRoot: {
        textAlign: 'right',
        paddingBottom: theme.spacing(5),
        marginTop: theme.spacing(2)
    },
}))
export default AddStore;