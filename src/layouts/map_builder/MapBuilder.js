import React, { useState, useLayoutEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MapToolbar from "./MapToolbar";
import MapTabs from "./MapTabs";
import AppBar from "@material-ui/core/AppBar";
import Grey from "@material-ui/core/colors/grey";
import { DRAWER_WIDTH } from "../../libs/const";
import useTheme from "@material-ui/core/styles/useTheme";
import MapDialog from './dialogs/MapDialog';
import MapDisplay from "./MapDisplay";
import { MAP_DIALOGS, MAP_BUILDER_HEIGHT, MAP_EVENTS, MAP_CLICK } from "./util/const";
import update from "immutability-helper";
import Typography from "@material-ui/core/Typography";
import SeatDialog from './dialogs/SeatDialog';
import BeaconDialog from "./dialogs/BeaconDialog";
import cuid from "cuid";
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from "react-dnd";


const createMap = (values) => {
    return {
        ...values,
        map_id: cuid.slug(),
    }
}
const createSeatGroup = (map_id, values) => {
    return {
        map_id,
        seat_id: cuid.slug(),
        x: 0,
        y: 0,
        clicked: false,
        deg: 0,
        beacon_ids: [],
        seats: values.split(",").map(id => ({
            status: 0,
            id,
        })),
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
const MapBuilder = ({ maps, setMaps, seatGroups, setSeatGroups }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mapWidth, setWidth] = useState(0);
    const [dialogs, setDialogs] = useState({
        mapDialog: false,
        seatDialog: false,
        beaconDialog: false,
        beacon_ids: [],
    });

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
    }, [theme]);


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
                setDialogs(prev => ({
                    ...prev,
                    seatDialog: false
                }));
                const { seat_names } = action.data;
                setSeatGroups(prev => update(prev, {
                    $push: [createSeatGroup(maps[mapIdx].map_id, seat_names)]
                }));
                break;
            case MAP_DIALOGS.REMOVE_MAP:
                const removedID = maps[mapIdx].map_id;
                const removedMap = maps.filter((map, idx) => idx !== mapIdx);

                setMapIdx(-1);
                setMaps(removedMap);
                setSeatGroups(seatGroups.filter(seat => seat.map_id !== removedID));
                break;
            case MAP_DIALOGS.OPEN_BEACON:
                let map_id = maps[mapIdx].map_id;
                let seat = seatGroups.find(seat => seat.map_id === map_id);
                console.log(seat);
                setDialogs({
                    ...dialogs,
                    beaconDialog: true,
                    beacon_ids: seat ? seat.beacon_ids : [],
                });
                break;
            case MAP_DIALOGS.CLOSE_BEACON:
                setDialogs({
                    ...dialogs,
                    beaconDialog: false,
                    beacon_ids: [],
                });
                break;
            case MAP_DIALOGS.UPDATE_BEACON:
                setDialogs({
                    ...dialogs,
                    beaconDialog: false,
                    beacon_ids: [],
                });
                //update other seatgroups beacon ids
                const { data } = action;
                setSeatGroups(seatGroups.map(seat => {
                    if (seat.map_id === maps[mapIdx].map_id) {
                        return {
                            ...seat,
                            beacon_ids: data
                        }
                    }
                    else return seat;
                }))
                break;
            default:
        }
    }

    const handleEvents = (action) => {
        switch (action.type) {
            case MAP_EVENTS.UPDATE_SEAT_GROUP:
                const { x, y, seat_id } = action.data;
                let s_idx = seatGroups.findIndex(group => group.seat_id === seat_id);
                setSeatGroups(seatGroups.map((seat, idx) => {
                    console.log(seat.clicked, s_idx);
                    if (!seat.clicked && s_idx !== idx) return seat;
                    return {
                        ...seat,
                        x: seat.x + x,
                        y: seat.y + y
                    }
                }));

                break;
            case MAP_EVENTS.ROTATE_SEAT_LEFT:
                setSeatGroups(seatGroups.map(seat => {
                    if (!seat.clicked) return seat;
                    return {
                        ...seat,
                        deg: (seat.deg - 15) % 360
                    }
                }))
                break;
            case MAP_EVENTS.ROTATE_SEAT_RIGHT:
                setSeatGroups(seatGroups.map(seat => {
                    if (!seat.clicked) return seat;
                    return {
                        ...seat,
                        deg: (seat.deg + 15) % 360
                    }
                }))
                break;
            case MAP_EVENTS.CLEAR_SEATS:
                setSeatGroups(seatGroups.map(seat => ({
                    ...seat,
                    clicked: false,
                })));
                break;
            case MAP_EVENTS.REMOVE_SEATS:
                setSeatGroups(seatGroups.filter(seat => !seat.clicked));
                break;
            default:
        }
    }

    const handleClick = (action) => {
        switch (action.type) {
            case MAP_CLICK.CLICK_SEAT:
                const { seat_id, clicked } = action.data;
                const seat_idx = seatGroups.findIndex(group => group.seat_id === seat_id);

                setSeatGroups(
                    update(seatGroups, {
                        [seat_idx]: {
                            clicked: { $set: !clicked }
                        }
                    })
                );
                break;


            case MAP_CLICK.CLICK_MAP:
                setSeatGroups(seatGroups.map(seat => ({
                    ...seat,
                    clicked: false,
                })))
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
                <MapToolbar handleDialog={handleDialog} handleEvents={handleEvents} mapIdx={mapIdx} />
                <MapTabs mapIdx={mapIdx} setMapIdx={setMapIdx} maps={maps} />
            </AppBar>
            <div className={classes.main} style={{ width: '100%' }} >
                {mapIdx >= 0 &&
                    <DndProvider backend={Backend}>
                        <MapDisplay
                            handleClick={handleClick}
                            handleEvents={handleEvents}
                            seatGroups={mapIdx >= 0 ? seatGroups.filter(group => group.map_id === maps[mapIdx].map_id) : null}
                            data={maps[mapIdx]} />
                    </DndProvider>
                }
                {mapIdx < 0 && <MapNotAddded />}
            </div>

            <MapDialog open={dialogs.mapDialog} handleDialog={handleDialog} />
            <SeatDialog seatGroups={seatGroups} open={dialogs.seatDialog} handleDialog={handleDialog} />
            <BeaconDialog open={dialogs.beaconDialog} handleDialog={handleDialog} data={dialogs.beacon_ids} />
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