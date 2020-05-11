import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const StoreInformation = () => {
    const classes = useStyles();
    const [imgFile, setImgFile] = useState({
        data: null,
        file_name: '',
        file: null,
        ready: false,
    })
    const [storeData, setStoreData] = useState({
        postal_code: '',
        address: '',
        address_detail: '',
        name: '',
        address_info: {

        },
        latitude: '',
        longtitude: '', 
    })
    const [mapData, setMapData] = useState({
        visible: false,
    })

    useEffect(() => {
        if (!mapData.visible) return;

        let container = window.document.getElementById("map");
        let options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }

        let map = new window.kakao.maps.Map(container, options);
        
        let geoCoder = new window.kakao.maps.services.Geocoder();

        geoCoder.addressSearch(storeData.address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                console.log(coords);
                // 결과값으로 받은 위치를 마커로 표시합니다
                let marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                let infowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">Location</div>'
                });
                infowindow.open(map, marker);

                map.setCenter(coords);
                const { Ga, Ha } = coords;
                setStoreData({
                    ...storeData, 
                    latitude: Ha, 
                    longtitude: Ga 
                });
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData.address, mapData.visible])


    const handleImg = e => {
        const file = e.target.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onload = e => {
                setImgFile({
                    data: e.target.result,
                    file_name: file.name,
                    file,
                    ready: true,
                });
            }
            try {
                reader.readAsDataURL(file);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const onSearchAddress = () => {
        new window.daum.Postcode({
            onComplete: function (data) {
                const { roadAddress, zonecode } = data;
                setStoreData({
                    ...storeData,
                    address: roadAddress,
                    postal_code: zonecode,
                    address_info: data,
                });

                setMapData({
                    ...mapData,
                    visible: true
                })
            }
        }).open();
    }

    const handleChange = e => {
        setStoreData({
            ...storeData,
            [e.target.id]: e.target.value
        })
    }
    return (
        <div className={classes.root}>
            <TextField
                variant="outlined"
                label="Store Name"
                id="name"
                fullWidth
                className={classes.textField}
                onChange={handleChange}
                value={storeData.name}
            />
            <div className={classes.picRoot}>
                <div className={classes.picLabelRoot}>
                    <Typography variant="body1">
                        Select your store's picture.
                    </Typography>
                    <Button component="label" variant="contained" disableElevation size="small">
                        Select
                        <input
                            onChange={handleImg}
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </Button>
                </div>

                {imgFile.ready ? (
                    <React.Fragment>
                        <img src={imgFile.data} alt="pic" className={classes.img} />
                        <Typography variant="body1" className={classes.imgLabel}>
                            {imgFile.file_name}
                        </Typography>
                    </React.Fragment>

                ) : (
                        <div className={classes.tempPic} />
                    )}

            </div>

            <div className={classes.picRoot}>
                <div className={classes.picLabelRoot}>
                    <TextField
                        className={classes.postalCode}
                        label="Postal Code"
                        variant="outlined"
                        value={storeData.postal_code}
                    />
                    <Button variant="contained" onClick={onSearchAddress} disableElevation size="small">
                        Search
                     </Button>
                </div>
            </div>
            <TextField
                className={classes.textField}
                label="Address"
                value={storeData.address}
                variant="outlined"
                fullWidth
            />
            <TextField
                className={classes.textField}
                label="Address Detail"
                value={storeData.address_detail}
                variant="outlined"
                id="address_detail"
                fullWidth
                onChange={handleChange}
            />

            {mapData.visible &&
                <div className={classes.mapContainer}>
                    <div id="map" style={{ width: 300, height: 300, margin: 'auto' }} />
                </div>
            }


        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        margin: 'auto'
    },
    textField: {
        maxWidth: 360,
        margin: `${theme.spacing(1)}px 0px`
    },
    picRoot: {
        maxWidth: 360,
        margin: `${theme.spacing(1)}px auto`
    },
    picLabelRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tempPic: {
        width: '100%',
        height: 250,
        backgroundColor: 'grey',
        margin: `${theme.spacing(2)}px 0px`
    },
    img: {
        width: '100%',
        height: 250,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        objectFit: 'none'
    },
    imgLabel: {
        marginBottom: theme.spacing(2),
    },
    postalCode: {
        width: 150,
    },
    mapContainer: {
        width: '100%',
        marginTop: theme.spacing(2),
    }

}))
export default StoreInformation;