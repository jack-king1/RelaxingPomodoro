const apiURL = "http://localhost:3005";

//fetch all products
//fetch one product with a given id
export async function getTasks(googleId) {
    // const response = await fetch(apiURL + `/product/${id}`);

    const response = await fetch(apiURL + `/gettasks/${googleId}`).then(
        (response) => response.json()
    );
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

export async function setTask(googleId, tasktext) {
    console.log("@SetTask: ", googleId, tasktext);

    const response = await fetch("http://localhost:3005/newtask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleId, tasktext }), // Send googleId and task text in the request body
    });

    const responseData = await response.json(); // Parse response JSON
    console.log(responseData); // Log response data for debugging
    return responseData; // Return response data
}

export async function deleteTask(googleId, tasktext) {
    console.log("@deletetask: ", googleId, tasktext);

    const response = await fetch("http://localhost:3005/deletetask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleId, tasktext }), // Send googleId and task text in the request body
    });

    const responseData = await response.json(); // Parse response JSON
    console.log(responseData); // Log response data for debugging
    return responseData; // Return response data
}
