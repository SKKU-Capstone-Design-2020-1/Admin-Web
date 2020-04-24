import React, { useState } from 'react'
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

        }
    })
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
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
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
    }

}))
export default StoreInformation;