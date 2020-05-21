import React, { useLayoutEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { MAP_BUILDER_HEIGHT } from "./util/const";
import MapDisplay from "./MapDisplay";
import MapTabs from "./MapTabs";
import AppBar from "@material-ui/core/AppBar";
import Grey from "@material-ui/core/colors/grey";
import { DndProvider } from "react-dnd";
import Backend from 'react-dnd-html5-backend';
const MapViewer = (
    { maps, beacons, seatGroups }
) => {
    const classes = useStyles();
    const [mapIdx, setMapIdx] = useState(0);


    const handleClick = action => {
        console.log(action)
    }

    const handleEvents = action => {
        console.log(action)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" elevation={1}>
                <MapTabs mapIdx={mapIdx} setMapIdx={setMapIdx} maps={maps} />
            </AppBar>
            <div className={classes.main}>
                <DndProvider backend={Backend}>
                    <MapDisplay
                        handleClick={handleClick}
                        handleEvents={handleEvents}
                        data={maps[mapIdx]}
                        disableDrag={true}
                        seatGroups={seatGroups.filter(group => group.map_id === maps[mapIdx].map_id)}
                    />
                </DndProvider>

            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    main: {
        overflow: 'auto',
        height: MAP_BUILDER_HEIGHT
    },
    root: {
        margin: theme.spacing(1),
        border: `.5px solid ${Grey['400']}`,
        backgroundColor: 'white',
        paddingBottom: 1,
    }
}))
export default MapViewer;