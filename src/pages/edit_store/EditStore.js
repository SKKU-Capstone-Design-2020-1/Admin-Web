import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import StoreInformation from "../../layouts/store_information/StoreInformation";
import { useSelector, useDispatch } from "react-redux";
import Typograhy from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { updateStore } from "../add_store/AddStoreActions";

const EditStore = ({history}) => {
    const store = useSelector(state => state.store);
    const [storeData, setStoreData] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!store.data || Object.keys(store.data).length === 0) return;


        setStoreData({
            ...store.data,
            go_time: Number(store.data.go_time),
            break_time: Number(store.data.break_time)
        });

    }, [store])


    const handleSubmit = () => {
        dispatch(updateStore({
            ...storeData,
            go_time: Number(storeData.go_time),
            break_time: Number(storeData.break_time)
        }, (id) => history.push(`/admin/${id}`)))
    }

    if (!storeData) {
        return (
            <div>
                <Typograhy variant="body1" className={classes.loadingTypo}>
                    Loading...
                </Typograhy>
            </div>
        )
    }
    return (
        <div className={classes.root}>
            <StoreInformation storeData={storeData} setStoreData={setStoreData} />
            <Grid container justify="center">
                <Grid item md={6} xs={12}>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        className={classes.btn}
                        variant="contained"
                        disableElevation
                        fullWidth>
                        Edit
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    loadingTypo: {
        marginTop: theme.spacing(1),
    },
    btn: {
        margin: `${theme.spacing(3)}px 0px`
    }
}))
export default EditStore