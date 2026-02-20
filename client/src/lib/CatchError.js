import {toast} from "react-toastify"

const CatchError = (err, position = "top-center") => {
    console.log("Error caught", err)

    if(err.response){
        return toast.error(err.response.data.message || "Server error", {position})
    }

    if(err.request){
        return toast.error("Network error-server not responding", { position })
    }

    if(err.message){
        return toast.err(err.message, { position })
    }

    return toast.error("An unknown error occured", { position })
}

export default CatchError