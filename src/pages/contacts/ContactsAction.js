import { firestore } from "../../libs/config";
export const contactsActionType = {
    get: "GetContactsType",
    update: "UpdateContactType"
}
export const getContacts = (sid) => async dispatch => {
    try {
        let contactsSnap = await firestore.collection(`contacts`).orderBy("created_at").where("store_id", "==", sid).get();

        let data = [];
        for (let contact of contactsSnap.docs) {
            data.push({
                ...contact.data(),
                id: contact.id
            });
        }
        dispatch({ type: contactsActionType.get, data })
    } catch (err) {
        console.log(err);
    }
}

export const checkContact = (contact) => async dispatch => {
    try {
        await firestore.doc(`contacts/${contact.id}`).update({
            checked: true
        });

        dispatch({
            type: contactsActionType.update,
            data: contact
        })
    } catch (err) {
        console.log(err);
    }
}