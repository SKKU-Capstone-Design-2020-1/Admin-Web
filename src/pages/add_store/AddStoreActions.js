import { storage, firestore } from "../../libs/config";

export const registerStore = data => async dispatch => {
    try {
        const temp_oid = "TEST_OWNER";
        const { storeData, maps, seatGroups } = data;         
        console.log(storeData, maps, seatGroups);
        
        const { img_file, ...storeInfo } = storeData;

        let num_seats = 0;

        let updatedSeats = seatGroups.map(group => {
            num_seats += group.seats.length;
            const { clicked, ...others } = group;
            return others;
        });

        let storeDoc = firestore.collection('stores').doc();
        
        //Add image to firebase storage
        const storageRef = storage.ref();
        const imgRef = storageRef.child(`stores/${temp_oid}/${storeDoc.id}/store_img`);
        
        await imgRef.put(img_file);
        let img_url = await imgRef.getDownloadURL();

        let batch = firestore.batch();
        batch.set(storeDoc, {
            open: false,
            num_seats,
            num_users: 0,
            img_url,
            maps, 
            owner_id: temp_oid, 
            ...storeInfo
        });
        for (let group of updatedSeats){
            batch.set(storeDoc.collection(`seatGroups`).doc(), group);
        }

        await batch.commit();
        console.log('completed');
    } catch (err){
        console.log(err);
    }
}