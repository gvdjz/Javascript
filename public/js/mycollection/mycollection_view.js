//import { deleteCollection } from "./mycollection_controller";
import { deleteCollectionService } from "./mycollection_service";

export const myCollectionView = (data) =>{
    const myCollections = document.getElementById("collection");
    
    let collections = data; // Get the results
    return collections.map( (collection) =>{ // Map through the results and for each run the code below
        var div = document.createElement("div"), //  Create the elements we need
            img = document.createElement("img"),
            cardBody = document.createElement("div"),
            h5 = document.createElement("h5"),
            p = document.createElement("p"),
            imgplus = createNode("img");

        imgplus.className = "remove";
        imgplus.src = "../../public/fonts/glyphicon-remove-sign.png";
        imgplus.title = "Remove From Collection";
                           
        div.className = "collection card col-md-2";
        img.className = "card-img-top";
        img.alt = collection.name;
        cardBody.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text text-muted";
        img.src = collection.img;  // Add the source of the image to be the src of the img element
        h5.innerHTML = `${collection.name}`;
        imgplus.id = collection.id;
        append(cardBody,h5);
        append(cardBody,p);
        append(div,img);
        append(div,cardBody);
        append(cardBody,imgplus);
        myCollections.appendChild(div);
        const id = imgplus.id;
        imgplus.onclick = ()=>{
            deleteCollectionService(id);
        };
    });
};


let createNode = (element) =>{
    return document.createElement(element); // Create the type of element you pass in the parameters
};

let append = (parent, el) =>{
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};