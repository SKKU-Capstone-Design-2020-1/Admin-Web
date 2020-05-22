import React, { useLayoutEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import { MAP_BUILDER_HEIGHT, MAP_EVENTS, MAP_CLICK } from "./util/const";
import MapDisplay from "./MapDisplay";
import MapTabs from "./MapTabs";
import AppBar from "@material-ui/core/AppBar";
import Grey from "@material-ui/core/colors/grey";
import { DndProvider } from "react-dnd";
import Backend from 'react-dnd-html5-backend';
import { DRAWER_WIDTH } from "../../libs/const";
import { useDispatch } from "react-redux";
import { ownerSeatUpdate } from "../../pages/store/storeActions";
const MapViewer = (
    { maps, beacons, seatGroups }
) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [mapIdx, setMapIdx] = useState(0);
    const [mapWidth, setWidth] = useState(0);

    useLayoutEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            let adjustedWidth;
            if (width > theme.breakpoints.values['sm'])
                adjustedWidth = width - DRAWER_WIDTH - theme.spacing(10) - 4;
            else //when drawer is hidden 
                adjustedWidth = width - theme.spacing(8);

            if (adjustedWidth > 300) setWidth(adjustedWidth);
            else setWidth(300);

        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [theme]);


    const handleClick = action => {

        switch (action.type) {
            case MAP_CLICK.CLICK_SEAT:
                dispatch(ownerSeatUpdate(action.data));
                break;
            default:
                break;
        }
    }

    const handleEvents = action => {
        console.log(action)
    }

    return (
        <div className={classes.root} style={{ width: mapWidth }}>
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