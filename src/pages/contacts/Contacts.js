import React, { useEffect, useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getContacts } from "./ContactsAction";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "./ContactItem";

const Contacts = ({ match }) => {
    const dispatch = useDispatch();
    const { data, loaded } = useSelector(state => state.contacts);
    const [items, setItems] = useState([]);

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
        console.log(contact);
    }
    return (
        <div>
            {items.map(item => (
                <ContactItem key={item.id} onClick={handleClick} contact={item} />
            ))}
        </div>
    )
}

const useStyles = makeStyles(theme => ({

}))
export default Contacts;