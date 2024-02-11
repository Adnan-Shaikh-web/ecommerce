
const postRequest = async (user) => {
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                // Headers
                'Content-Type': 'application/json', // Indicate the content type
            },
            body: JSON.stringify({
                // Body
                name: user.name,
                email: user.email,
                password: user.password
            })
        })

        const data = await response.json();
        // console.log(data)
        return data
    }
    catch (error) {
        console.log(error)
    }
}

export default postRequest;
