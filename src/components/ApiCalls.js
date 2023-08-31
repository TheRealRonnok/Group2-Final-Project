const APIURL = "http://localhost:4000/api/users"
const token = localStorage.getItem("token");

export const loginUser = async (username, password) =>  {
    try {
        const response = await fetch(`${APIURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user: {
                    username,
                    password,
                }
             }),
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${APIURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user: {
                    username,
                    password,
                }
             }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
