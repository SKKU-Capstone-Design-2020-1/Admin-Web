import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const MapTabs = ({ maps, mapIdx, setMapIdx }) => {
    const classes = useStyles();
    const handleChange = (event, value) => {
        setMapIdx(value);
    }

    return (
        <div className={classes.root}>
            <Tabs
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                onChange={handleChange}
                indicatorColor="primary"
                value={mapIdx}
            >
                {maps && maps.map((map, idx) => (
                    <Tab key={idx} label={map.name} />
                ))}
            </Tabs>
        </div>

    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    }
}))
export default MapTabs;