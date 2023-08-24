const APIURL = `http://localhost:4000/api`;
const token = localStorage.getItem("token");

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${APIURL}users/login`, {
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
        return result.user;
    } catch (error) {
        console.log(error);
    }
}

export async function registerUser(username, password) {
    try {
        const response = await fetch(`${APIURL}/users/register`, {
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
        return result.user;
    } catch (error) {
        console.log(error);
    }
}
