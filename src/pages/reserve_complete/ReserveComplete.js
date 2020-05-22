import React, { useEffect } from 'react'
import qs from "query-string";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const ReserveComplete = ({location}) => {
    const classes = useStyles();

    useEffect(() => {
        const query = qs.parse(location.search);
        console.log(query)
    }, [location])
    
    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography align="center" varaint="body1" className={classes.title}>
                Reservation Completed!
            </Typography>  
            <Typography variant="body1" align="center">
                Please go to the reserved seat in the limited time.
            </Typography> 
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: `${theme.spacing(4)}px ${theme.spacing(2)}px`
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    }
}))
export default ReserveComplete;