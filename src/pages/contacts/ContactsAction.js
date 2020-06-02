import { firestore } from "../../libs/config";
export const contactsActionType = {
    get: "GetContactsType",
}
export const getContacts = (sid) => async dispatch => {
    try {
        let contactsSnap = await firestore.collection(`contacts`).where("store_id", "==", sid).get();

        let data = [];
        for (let contact of contactsSnap.docs) {
            data.push({
                ...contact.data(),
                id: contact.id
            });


            dispatch({ type: contactsActionType.get, data })
        }
    } catch (err) {
        console.log(err);
    }
}