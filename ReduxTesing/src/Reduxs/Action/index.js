import axios from "axios"

export const error = (data) => {
    return {
        type: "ERROR",
        paylode: data
    }
}

export const apiRes = (data) => {
    return {
        type: "APIRES",
        paylode: data
    }
}

export const logintrue = (data) => {
    return {
        type: "LOGINTRUE",
        paylode: data
    }
}

export const callApi = () => {
    return async dispatch => {
        dispatch(logintrue(true))
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`);
            dispatch(apiRes(res.data))
            dispatch(logintrue(false))
        } catch (err) {
            console.log("Api Call Not")
            dispatch(error(err.message))
        }
    };
};

export const add = (data) => {
    return {
        type: "ADD",
        paylode: data
    }
}

export const deletes = (data) => {
    return {
        type: "DELETES",
        paylode: data
    }
}

export const edits = (data, index) => {
    return {
        type: "EDITS",
        paylode: data,
        pay: index
    }
}
