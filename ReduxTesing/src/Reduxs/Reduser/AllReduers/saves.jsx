const iniState = {
    loginStates: false,
    data: [],
    error: '',
    wcount: 0,
    wcount1: 10,
}

const login = (state = iniState, action) => {
    let id = 10
    switch (action.type) {
        case "LOGINTRUE":
            state.loginStates = action.paylode
            return {
                ...state
            }
        case "APIRES":
            if (state.wcount === 0) {
                state.data = action.paylode
                state.wcount = 1
            }
            return {
                ...state
            }
        case "ERROR":
            state.error = action.paylode
            return {
                ...state
            }
        case "ADD":
            state.wcount1++;
            action.paylode.id = state.wcount1;
            state.data.push(action.paylode)
            return {
                ...state
            }
        case "DELETES":
            state.data.splice(action.paylode, 1)
            return {
                ...state
            }
        case "EDITS":
            // console.log(action.pay)
            state.data.splice(action.pay, 1, action.paylode)
            return {
                ...state
            }
        default:
            return { ...state }
    }
}
export default login;