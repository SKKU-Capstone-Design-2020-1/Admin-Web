export const storeActionType = {
    setStore: "setStore"
}

export const setStore = uid => dispatch => {
    dispatch({ type: storeActionType.setStore, data: uid })
}