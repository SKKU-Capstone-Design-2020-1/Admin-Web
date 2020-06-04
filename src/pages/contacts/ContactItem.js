import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grey from "@material-ui/core/colors/grey";
import classNames from "classnames";
import moment from "moment";

const ContactItem = ({ contact, onClick }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classNames(classes.contentRoot, classes.textRoot)}>
                <Typography className={classes.title} variant="body1">
                    {contact.user_id}
                </Typography>
                <Typography className={classes.subTitle} variant="body1">
                    {moment(contact.created_at.toDate()).calendar()}
                </Typography>
                {!contact.checked ?
                    <Button
                        onClick={() => onClick(contact)}
                        className={classes.btn}
                        variant="contained"
                        color="primary">
                        Check
                    </Button>
                    :
                    <Button
                        onClick={() => onClick(contact)}
                        className={classes.btn}
                        variant="contained"
                    >
                        Uncheck
                    </Button>
                }

            </div>

            <div className={classes.contentRoot}>
                <div className={classes.textRoot}>
                    <Typography variant="body1" className={classes.text}>
                        {contact.contents}
                    </Typography>
                </div>


            </div>

        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    contentRoot: {
        display: 'flex',
        marginTop: theme.spacing(1),

    },
    textRoot: {
        flex: 1,
    },
    btn: {
        marginLeft: 'auto'
    },
    root: {
        padding: theme.spacing(1),
        margin: `${theme.spacing(1)}px 0px`
    },
    title: {
        fontWeight: 600,
        fontSize: '1.1rem'
    },
    subTitle: {
        color: Grey['500'],
        marginLeft: theme.spacing(1),
        fontSize: '1.1rem'
    },
    titleRoot: {
        alignContent: 'center',
    }
}))
export default ContactItem;