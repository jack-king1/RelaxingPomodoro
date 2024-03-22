const apiURL = "http://localhost:3005";

//fetch all products
export async function getTasks(googleId) {
    const response = await fetch(
        `http://localhost:3005/tasks?Id=${googleId}`
    ).then((response) => response.json());
    return response;
}

//new user
export async function setDBUser(googleId) {
    console.log(googleId);

    const response = await fetch("http://localhost:3005/newuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleId }), // Send googleId in the request body
    });

    const responseData = await response.json(); // Parse response JSON
    console.log(responseData); // Log response data for debugging

    return responseData; // Return response data
}
