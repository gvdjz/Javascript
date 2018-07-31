import { createTopCollections } from "./topCollection_view";

export let getTopCollection = () =>{
const url = "https://developers.zomato.com/api/v2.1/collections?city_id=4&count=15";

fetch(url, {
    headers: {
        "user-key": "0624929ecb5e570858307510efb7cf1f"
    }
})
    .then((resp) => resp.json())
    .then((data)=>{
        createTopCollections(data);
    })
    .catch((error)=> {
        console.log(error);
    });//create getTopCollection in view
}