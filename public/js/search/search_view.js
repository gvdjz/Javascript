let createNode = (element) => {
    return document.createElement(element); // Create the type of element you pass in the parameters
};

let append = (parent, el) =>{
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};

export let searchView =(data) =>{
    const searchresult = document.querySelector(".searchresult");
    const cardDeck = document.querySelector(".card-deck");
    
    cardDeck.innerHTML="";
    let restaurants = data.restaurants; // Get the restaurants
    return restaurants.map(function (restaurants) { // Map through the results and for each run the code below
        let divCard = createNode('div'), //  Create the elements we need
            img = createNode('img'),
            divCardBody = createNode('div'),
            h5 = createNode('h5'),
            p = createNode('p'),
            imgplus = createNode('img');
        
        divCard.className = "card";
        img.className = "card-img-top";
        img.alt = restaurants.restaurant.name;
        divCardBody.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text";
        imgplus.className = "plus";
        imgplus.src = "../../public/fonts/glyphicon-plus-sign.png";
        imgplus.title = "Add to MyCollection";
                                                                  
        img.src = restaurants.restaurant.featured_image;  // Add the source of the image to be the src of the img element
        imgplus.id = restaurants.restaurant.R.res_id;

        h5.innerHTML = `${restaurants.restaurant.name}`; // Make the HTML of our span to be the first and last name of our author
        append(divCardBody, h5);
        append(p, imgplus);
        append(divCardBody, p); // Append all our elements
        append(divCard, img);
        append(divCard, divCardBody);
        append(cardDeck,divCard);
        append(searchresult, cardDeck);
        imgplus.onclick = () =>{
            addToCollection(imgplus.id);
        }
    })
}