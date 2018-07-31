//import { addToCollection } from "../mycollection/mycollection_controller";
import { myCollectionService } from "../mycollection/mycollection_service";

export let createTopCollections = (data) => {
    const div = document.querySelector(".card-columns");
    
    let collections = data.collections; // Get the collections
        return collections.map(function (collections) { // Map through the results and for each run the code below
            let divCard = createNode('div'), //  Create the elements we need
                img = createNode('img'),
                divCardBody = createNode('div'),
                h5 = createNode('h5'),
                p = createNode('p'),
                imgplus = createNode('img');

            divCard.className = "card";
            img.className = "card-img-top";
            divCardBody.className = "card-body";
            h5.className = "card-title";
            p.className = "card-text";
            imgplus.setAttribute('src', '../../public/fonts/glyphicon-plus-sign.png');
            imgplus.setAttribute('title', 'Add to MyCollection');
            imgplus.className = "plus";

            img.src = collections.collection.image_url; 
            img.alt = collections.collection.title; // Add the source of the image to be the src of the img element
            imgplus.id = collections.collection.collection_id;
            h5.innerHTML = `${collections.collection.title}`; // Make the HTML of our span to be the first and last name of our author
            append(divCardBody, h5);
            append(p, imgplus);
            append(divCardBody, p); // Append all our elements
            append(divCard, img);
            append(divCard, divCardBody);
            append(div, divCard);
            imgplus.onclick = () =>{
                myCollectionService(imgplus.id);
            }
        })
    }

    
let createNode = (element) =>{
    return document.createElement(element); // Create the type of element you pass in the parameters
};

let append = (parent, el) =>{
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};