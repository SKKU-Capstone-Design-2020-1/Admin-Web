export const LoadingActionType = {
    set: "SetLoadingBackdrop",
    complete: "CompleteBackdrop"
} 

export const setProgress = dispatch => {
    dispatch ({
        type: LoadingActionType.set
    })
}

export const completeProgress = dispatch => {
    dispatch({
        type: LoadingActionType.complete
    })
}