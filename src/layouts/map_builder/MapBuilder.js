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
import { MAP_DIALOGS, MAP_BUILDER_HEIGHT } from "./util/const";
import update from "immutability-helper";
import Typography from "@material-ui/core/Typography";
import SeatDialog from './dialogs/SeatDialog';

const createMap = (values) => {
    return {
        ...values,
        seats: [],
    }
}
const MapBuilder = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mapWidth, setWidth] = useState(0);
    const [dialogs, setDialogs] = useState({
        mapDialog: false,
        seatDialog: false, 
    });
    const [maps, setMaps] = useState([]);
    const [mapIdx, setMapIdx] = useState(-1);

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
            default:
        }
    }

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
        <div className={classes.root} style={{ width: mapWidth}}>
            <AppBar position="static" color="default" elevation={1}>
                <MapToolbar handleDialog={handleDialog} />
                <MapTabs mapIdx={mapIdx} setMapIdx={setMapIdx} maps={maps} />
            </AppBar>
            <div className={classes.main} style={{ width: '100%' }} >
                {mapIdx >= 0 ? <MapDisplay data={maps[mapIdx]} /> : <MapNotAddded />}
            </div>

            <MapDialog open={dialogs.mapDialog} handleDialog={handleDialog} />
            <SeatDialog open={dialogs.seatDialog} handleDialog={handleDialog} />
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