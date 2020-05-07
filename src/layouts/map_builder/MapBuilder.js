import React, { useState, useLayoutEffect, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MapToolbar from "./MapToolbar";
import MapTabs from "./MapTabs";
import AppBar from "@material-ui/core/AppBar";
import Grey from "@material-ui/core/colors/grey";
import { DRAWER_WIDTH } from "../../libs/const";
import useTheme from "@material-ui/core/styles/useTheme";
import MapDialog from './dialogs/MapDialog';
import MapDisplay from "./MapDisplay";
import { MAP_DIALOGS, MAP_BUILDER_HEIGHT, MAP_EVENTS } from "./util/const";
import update from "immutability-helper";
import Typography from "@material-ui/core/Typography";
import SeatDialog from './dialogs/SeatDialog';
import cuid from "cuid";

const createMap = (values) => {
    return {
        ...values,
        map_id: cuid.slug(),
    }
}
/**
 * maps: array
 * --name: string
 * --height: integer
 * --width: integer
 * --map_id: cuid()
 * 
 * seatGroups:
 * --map_id: cuid()
 * --seat_id: cuid(),
 * --x: integer
 * --y: integer
 * --name: string
 * --seats: array
 * ----status: integer
 * ----seat_id: 0, 1 
 * 
 */

const temp_map_id = cuid.slug();
const MapBuilder = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mapWidth, setWidth] = useState(0);
    const [dialogs, setDialogs] = useState({
        mapDialog: false,
        seatDialog: false,
    });
    const [maps, setMaps] = useState([
        { name: 'TEMP', height: 400, width: 500, map_id: temp_map_id }
    ]);
    const [seatGroups, setSeatGroups] = useState([
        { map_id: temp_map_id, seat_id: cuid.slug(), x: 0, y: 0, seats: [{ status: 0, id: 1 }, { status: 0, id: 2 }] },
    ])
    const [mapIdx, setMapIdx] = useState(0);

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
    }, []);


    const handleDialog = action => {
        switch (action.type) {
            case MAP_DIALOGS.OPEN_MAP:
                setDialogs(prev => ({
                    ...prev,
                    mapDialog: true
                }));
                break;
            case MAP_DIALOGS.CLOSE_MAP:
                setDialogs(prev => ({
                    ...prev,
                    mapDialog: false,
                }));
                break;
            case MAP_DIALOGS.ADD_MAP:
                let curMapSize = maps.length + 1;
                setMaps(prev => update(prev, {
                    $push: [createMap(action.data)]
                }));
                setDialogs(prev => ({
                    ...prev,
                    mapDialog: false,
                }));
                setMapIdx(curMapSize - 1);
                break;
            case MAP_DIALOGS.OPEN_SEAT:
                setDialogs(prev => ({
                    ...prev,
                    seatDialog: true
                }));
                break;
            case MAP_DIALOGS.CLOSE_SEAT:
                setDialogs(prev => ({
                    ...prev,
                    seatDialog: false
                }));
                break;
            case MAP_DIALOGS.ADD_SEAT:
                console.log(action);
                setDialogs(prev => ({
                    ...prev,
                    seatDialog: false
                }));

                break;
            default:
        }
    }

    const handleEvents = (action) => {
        switch (action.type){
            case MAP_EVENTS.UPDATE_SEAT_GROUP:
                const { x, y, seat_id } = action.data;
                let s_idx = seatGroups.findIndex(group => group.seat_id === seat_id);
                setSeatGroups(prev => update(prev, {
                    [s_idx]: {
                        x: {$set: x},
                        y: {$set: y}
                    }
                }));
                break;
            default:
        }
    }

    const MapNotAddded = () => {
        return (
            <div className={classes.defaultMapRoot}>
                <Typography variant="body1" align="center">
                    No map has added.
                </Typography>
            </div>
        )
    }

    return (
        <div className={classes.root} style={{ width: mapWidth }}>
            <AppBar position="static" color="default" elevation={1}>
                <MapToolbar handleDialog={handleDialog} mapIdx={mapIdx} />
                <MapTabs mapIdx={mapIdx} setMapIdx={setMapIdx} maps={maps} />
            </AppBar>
            <div className={classes.main} style={{ width: '100%' }} >
                {mapIdx >= 0 ? <MapDisplay
                    handleEvents={handleEvents}
                    seatGroups={mapIdx >= 0 ? seatGroups.filter(group => maps[mapIdx].map_id) : null}
                    data={maps[mapIdx]} /> : <MapNotAddded />}
            </div>

            <MapDialog open={dialogs.mapDialog} handleDialog={handleDialog} />
            <SeatDialog seat_groups={null} open={dialogs.seatDialog} handleDialog={handleDialog} />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        border: `.5px solid ${Grey['400']}`,
        backgroundColor: 'white',
        paddingBottom: 1,
    },
    main: {
        overflow: 'auto',
        height: MAP_BUILDER_HEIGHT
    },
    defaultMapRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
}))
export default MapBuilder