const productGrid = document.getElementById("products");

document.addEventListener("DOMContentLoaded", function () {

    function addToCart(coffeeData){
        fetch(`http://127.0.0.1:3000/cart`, {
            method: 'POST',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify(coffeeData),
        })
        .then (response =>{
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then (updatedProduct =>{
            console.log('Cart updated: ',updatedProduct);
        })    
        .catch(error => console.error('Error: ', error));
        }

function createProductCard(Coffee) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("product-card");

    const image = document.createElement("img");
    image.src = Coffee.c_img;

    const title = document.createElement("h3");
    title.textContent =  Coffee.c_name;

    const price = document.createElement("p");
    price.textContent = "Price: $" +  Coffee.c_price;
    
    const descr = document.createElement("p");
    descr.textContent="Description: " + Coffee.c_description;

    const nut = document.createElement('button');
    const addCart = document.createElement('button');

    nut.setAttribute("class","button1");
    addCart.setAttribute("class","button2");


    nut.textContent="Nutrition Facts";
    addCart.textContent="Add to Cart";


    nut.addEventListener("click",function(e){
alert(Coffee.c_name + ":\n Cals: " + Coffee.cal + "\n Sugar: "+ Coffee.sugar + "\n Caffeine: "+ Coffee.caffeine + "\n Fat: "+ Coffee.fat);
    });


addCart.addEventListener("click", function (e) {
    const coffeeName = Coffee.c_name;
    const coffeePrice = Coffee.c_price;
    const coffeeData = {coffeeName: coffeeName, coffeePrice: coffeePrice};
    addToCart(coffeeData);
    alert(Coffee.c_name+" has been added to cart")
});
    

    cardDiv.appendChild(image);
    cardDiv.appendChild(title);
    cardDiv.appendChild(price);
    cardDiv.appendChild(descr);
    cardDiv.appendChild(nut);
    cardDiv.appendChild(addCart);

    return cardDiv;
}
    // Fetch data from the server-side API endpoint
    fetch('http://127.0.0.1:3000/Coffee') 
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
        .then(Coffees => {
            Coffees.forEach((Coffee) => {
                const productCard = createProductCard(Coffee);
                productGrid.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error:', error));
}); 