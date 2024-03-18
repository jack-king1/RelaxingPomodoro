import { createClient } from "pexels";

const client = createClient(process.env.REACT_APP_PEXELS_KEY);

// All requests made with the client will be authenticated
const query = "Nature";
const layout = "landscape";

export function GetBackground(callback) {
    client.photos
        .search({ query, per_page: 1, orientation: layout })
        .then((photos) => {
            console.log("Photos: ", photos);
            callback(photos);
        });
}
