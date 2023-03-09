const iniState = {
    edit: {
        id: '',
        userId: '',
        title: ''
    }
}

const Edit = (state = iniState, action) => {
    switch (action.type) {
        case "EDITS":
            state.edit = action.paylode
            return {
                ...state
            }
        default:
            return { ...state }
    }
}
export default Edit;