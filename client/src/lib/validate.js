export async function userCheck(user) {
    const info = {username: user.toLowerCase()}
    const JSONdata = JSON.stringify(info)
    const endpoint = 'http://localhost:4000/customer/'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    console.log(result.data)

    if (result.data == "Username Found") {
        return true
    }
    return false
}