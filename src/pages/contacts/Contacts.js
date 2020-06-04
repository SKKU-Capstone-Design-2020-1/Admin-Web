import React, { useEffect, useState } from 'react';
import { getContacts, checkContact } from "./ContactsAction";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "./ContactItem";
import Pagination from '@material-ui/lab/Pagination';
import makeStyles from '@material-ui/core/styles/makeStyles';

const Contacts = ({ match }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { data, loaded } = useSelector(state => state.contacts);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(null);

    useEffect(() => {
        const { sid } = match.params;
        dispatch(getContacts(sid));
    }, [])

    useEffect(() => {
        if (loaded) {
            setItems(data);
        }
    }, [loaded, data])

    const handleClick = (contact) => {
        dispatch(checkContact(contact))
    }
    const handleChange = (e, value) => {
        setPage(value)
    }

    if (!items) return null;
    return (
        <div>
            {items.slice(5 * (page - 1), 5 * page).map(item => (
                <ContactItem key={item.id} onClick={handleClick} contact={item} />
            ))}


            <div className={classes.pagination}>
                {items.length > 5 &&
                    <Pagination onChange={handleChange} count={(Math.floor(data.length / 5))} color="primary" />
                }
            </div>
        </div>
    )
}


const useStyles = makeStyles(theme => ({
    pagination: {
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing(2)}px 0px`,
        width: '100%',
        justifyContent: 'center'
    }
}))
export default Contacts;