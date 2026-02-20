import { toast } from "react-toastify"

const CatchError = (err, position = "top-center") => {
    console.log("Error caught:", err)

    if (err.response) {
        // Server responded with error
        return toast.error(err.response.data?.message || "Server error", { position })
    }

    if (err.request) {
        // Request made but no response
        return toast.error("Network error - server not responding", { position })
    }

    if (err.message) {
        // Something else
        return toast.error(err.message, { position })
    }

    return toast.error("An unknown error occurred", { position })
}

export default CatchError