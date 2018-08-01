import { myCollectionView } from "./mycollection_view";

export const myCollectionService = (id) =>{
    // console.log("Inside click function");
    // console.log(id);
    // console.log(document.getElementById(id) + document.getElementById(id).parentElement + document.getElementById(id).parentElement.parentElement);
    var div = document.getElementById(id).parentElement.parentElement.parentElement;
    var img = div.firstChild;
    var cardBody = img.nextSibling;
    var name = cardBody.firstChild;
    var jsonString = {
        "id" : id,
        "img" : img.src,
        "name" : name.innerHTML
    };
    let fetchData = { 
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
    };
    let addUrl = "http://localhost:3000/collections";
    
    fetch(addUrl, fetchData)
        .then(reload());        //Adding to json-server and calling reload function
    //console.log(div);
};

let reload = () =>{
    const myCollections = document.getElementById("collection");
    var getUrl = "http://localhost:3000/collections";
    myCollections.innerHTML = "";
    const heading = document.querySelector(".collection_Heading");
    heading.style.display = "block";

    fetch(getUrl)
        .then((resp)=>resp.json())
        .then((data) =>{
            myCollectionView(data);
        })
        .catch((error)=> {
            console.log(error);
        });
};

export const deleteCollectionService = (id) =>{
    let fetchData = { 
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    };
    let deleteUrl = "http://localhost:3000/collections/"+id;
    
    fetch(deleteUrl, fetchData)
        .then(reload());       
};
