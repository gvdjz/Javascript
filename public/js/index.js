require("bootstrap")
require("../css/index.css");
require("../../node_modules/jquery/dist/jquery");
require("../../node_modules/popper.js/dist/popper");
require("../../node_modules/bootstrap/dist/js/bootstrap");

const div = document.querySelector(".card-columns");
const url = "https://developers.zomato.com/api/v2.1/collections?city_id=4&count=15";

fetch(url, {
    headers: {
        "user-key": "0624929ecb5e570858307510efb7cf1f"
    }
})
    .then((resp) => resp.json())
    .then(function (data) {

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

            img.src = collections.collection.image_url;  // Add the source of the image to be the src of the img element
            imgplus.id = collections.collection.collection_id;
            h5.innerHTML = `${collections.collection.title}`; // Make the HTML of our span to be the first and last name of our author
            append(divCardBody, h5);
            append(p, imgplus);
            append(divCardBody, p); // Append all our elements
            append(divCard, img);
            append(divCard, divCardBody);
            append(div, divCard);
            imgplus.onclick = function (){
                addToCollection(imgplus.id);
            }

        })
    })
    .catch(function (error) {
        console.log(error);
    });

document.querySelector(".form-inline").addEventListener('submit', submit);

function submit(event) {
     event.preventDefault();

    const searchQuery = document.getElementById("search").value;
    if (searchQuery != "" || searchQuery != " ") {


        const cardDeck = document.querySelector(".card-deck");
        const searchurl = "https://developers.zomato.com/api/v2.1/search?q=" + searchQuery + "&count=5";

        const searchresult=document.querySelector(".searchresult");
        const h3search = document.querySelector(".h3search");
                      
        if(h3search == null){
        let h3 = createNode('h3');
        h3.className = "h3search";
        h3.innerHTML = "Search Results";
        append(searchresult,h3);
        }

        fetch(searchurl, {
            headers: {
                "user-key": "0624929ecb5e570858307510efb7cf1f"
            }
        })
            .then((resp) => resp.json())
            .then(function (data) {
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
                    imgplus.onclick = function (){
                        addToCollection(imgplus.id);
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
            
    }

}

const myCollections = document.getElementById("collection");

function addToCollection(id){
    console.log("Inside click function");
    console.log(id);
    console.log(document.getElementById(id) + document.getElementById(id).parentElement + document.getElementById(id).parentElement.parentElement)
    var div = document.getElementById(id).parentElement.parentElement.parentElement;
    var img = div.firstChild;
    var cardBody = img.nextSibling;
    var name = cardBody.firstChild;
    var text = name.nextSibling;
    var jsonString = {
            "id" : id,
            "img" : img.src,
            "name" : name.innerHTML
    }
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
    }
    let addUrl = "http://localhost:3000/collections";
    
    fetch(addUrl, fetchData)
    .then(reload());        //Adding to json-server and calling reload function

    console.log(div);
}

function reload(){
    var getUrl = "http://localhost:3000/collections";
    myCollections.innerHTML = "";
    fetch(getUrl)
    .then((resp)=>resp.json())
    .then(function(data){
        let collections = data; // Get the results
        return collections.map(function (collection) { // Map through the results and for each run the code below
            var div = document.createElement('div'), //  Create the elements we need
                img = document.createElement('img'),
                cardBody = document.createElement('div'),
                h5 = document.createElement('h5'),
                p = document.createElement('p'),
                imgplus = createNode('img');

                imgplus.className = "plus";
                imgplus.src = "../../public/fonts/glyphicon-remove-sign.png";
                imgplus.title = "Remove From Collection";
                               
            div.className = "collection card col-md-2";
            img.className = "card-img-top";
            cardBody.className = "card-body";
            h5.className = "card-title";
            p.className = "card-text text-muted";
            img.src = collection.img;  // Add the source of the image to be the src of the img element
            h5.innerHTML = `${collection.name}`;
            imgplus.id = collection.id;
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            div.appendChild(img);
            div.appendChild(cardBody);
            cardBody.appendChild(imgplus);
            myCollections.appendChild(div);
            const id = imgplus.id;
            imgplus.onclick = function(){
                deleteCollection(id);
            }
        })
    })
}

function deleteCollection(id){
    let fetchData = { 
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }
    let deleteUrl = "http://localhost:3000/collections/"+id;
    
    fetch(deleteUrl, fetchData)
    .then(reload());       
}

function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
};

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};