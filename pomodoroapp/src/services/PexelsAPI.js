import { createClient } from "pexels";

const client = createClient(process.env.REACT_APP_PEXELS_KEY);

// All requests made with the client will be authenticated
const query = "amazing nature wow";
const layout = "landscape";

export function GetBackground(callback) {
    let randomNumber = Math.random();
    let min = Math.ceil(0);
    let max = Math.floor(50);

    let photoIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    client.photos
        .search({ query, per_page: 50, orientation: layout })
        .then((photos) => {
            console.log("Photos: ", photos.photos[photoIndex]);
            callback(photos.photos[photoIndex]);
        });
}
