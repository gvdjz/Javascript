import {searchView} from "./search_view";

export let searchService = (event) => {

    event.preventDefault();

    const searchQuery = document.getElementById("search").value;
    if (searchQuery != "" || searchQuery != " ") {
        
        const searchurl = "https://developers.zomato.com/api/v2.1/search?q=" + searchQuery + "&count=5";

        const searchresult = document.querySelector(".searchresult");
        const h3search = document.querySelector(".h3search");

        if (h3search == null) {
            let h3 = createNode('h3');
            h3.className = "h3search";
            h3.innerHTML = "Search Results";
            append(searchresult, h3);
        }

        fetch(searchurl, {
            headers: {
                "user-key": "0624929ecb5e570858307510efb7cf1f"
            }
        })
            .then((resp) => resp.json())
            .then((data)=>{
                searchView(data);
            })
            .catch((error)=> {
                console.log(error);
            });
    }
}

let createNode = (element) => {
    return document.createElement(element); // Create the type of element you pass in the parameters
};

let append = (parent, el) =>{
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};

