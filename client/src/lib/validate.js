import axios from "axios";

export async function userCheck(user) {
    return axios.get("http://localhost:5000/customer").then(response => {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].name === user){
                return true
            }
        }
        return false   
    })

}