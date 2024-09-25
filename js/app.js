const products = [
    {
      id: 1,
      name: "Choco Bliss",
      price: 1200,
      picture: "choco_bliss.jpg", // Link to the chocolate image
      description: "A smooth and creamy milk chocolate with a hint of vanilla. Perfect for chocolate lovers!",
    },
    {
      id: 2,
      name: "Candy Delight",
      price: 800,
      picture: "candy_delight.jpg", // Link to the candy image
      description: "Delicious fruity candies that melt in your mouth. Great for kids and adults alike!",
    },
    {
      id: 3,
      name: "Bonbon Royale",
      price: 3000,
      picture: "bonbon_royale.jpg", // Link to the bonbon image
      description: "Premium bonbons filled with exotic flavors. A luxurious treat for special occasions.",
    },
    {
      id: 4,
      name: "Hazel Dream",
      price: 1500,
      picture: "hazel_dream.jpg", // Link to the hazelnut chocolate image
      description: "Rich dark chocolate with crunchy hazelnut pieces. Perfect for those who enjoy a nutty flavor!",
    },
    {
      id: 5,
      name: "Lemon Chew",
      price: 500,
      picture: "lemon_chew.jpg", // Link to the lemon candy image
      description: "Tangy lemon chews that pack a punch of citrusy flavor. Refreshing and sweet!",
    },
    {
      id: 6,
      name: "Caramel Treat",
      price: 2000,
      picture: "caramel_treat.jpg", // Link to the caramel chocolate image
      description: "Smooth caramel covered in milk chocolate. A delightful combination of sweetness and richness.",
    },
    {
      id: 7,
      name: "Berry Blast",
      price: 1000,
      picture: "berry_blast.jpg", // Link to the berry candy image
      description: "Mixed berry-flavored candies that burst with juicy flavors in every bite. Great for snacking!",
    },
    {
      id: 8,
      name: "Truffle Heaven",
      price: 4000,
      picture: "truffle_heaven.jpg", // Link to the truffle image
      description: "Decadent chocolate truffles filled with smooth ganache. Perfect for gifting or indulging.",
    },
    {
      id: 9,
      name: "Minty Fresh",
      price: 700,
      picture: "minty_fresh.jpg", // Link to the mint candy image
      description: "Refreshing mint candies that leave a cool sensation in your mouth. Great after meals!",
    },
    {
      id: 10,
      name: "Crunchy Delight",
      price: 2500,
      picture: "crunchy_delight.jpg", // Link to the crunchy chocolate image
      description: "A delightful chocolate bar with crispy rice pieces for an extra crunch in every bite.",
    },
    {
      id: 11,
      name: "Vanilla Bonbon",
      price: 3500,
      picture: "vanilla_bonbon.jpg", // Link to the vanilla bonbon image
      description: "Soft and creamy vanilla bonbons with a touch of white chocolate. A delicate and delicious treat.",
    },
    {
      id: 12,
      name: "Orange Twist",
      price: 600,
      picture: "orange_twist.jpg", // Link to the orange candy image
      description: "Zesty orange-flavored candies that are sweet, tangy, and perfect for a citrus kick.",
    }
  ];
  
  // Kártyákat tartalmazó html-struktúra készítése (mellékhatás nélküli):
  const createProductCards = (data) => {
    // console.log(data)
    // Ne tedd zárójelbe '{}' a map callback-függvény blokkját, mert akkor kell a return is!!!
    const cards = data.map(({ id, name, price, picture, description }) => 
      `<div class="product-card" id="${id}">
          <img src="img/${picture}" alt="${name}" title="${name}">
          <h3>${name}</h3>
          <p>${description}</p>
          <p>Ár: ${price} Ft</p>
          <button class="add-to-cart-btn">Kosárba</button>
      </div>`
    )
    // console.log(cards)
    return cards.join('');
  };
  
  const cardsHTML = createProductCards(products);
  
  // A kártyák beillesztése a products-konténerbe (mellékhatás):
  const renderCards = (htmlDetail) => {
    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "";
    productsContainer.innerHTML = htmlDetail;
  };

// ******************A kosár kezelése*********************
const cart=[];
function HandleCart(data,cartContainer,event){
  let productId=null;
  /*****************************************************/
  const foundedProduct=getProduct(data,event);
  productId=event.target.dataset.plus?event.target.dataset.plus:event.target.dataset.minus?event.target.dataset.minus:foundedProduct.id;
  const productIndex_=cartContainer.findIndex(product=>product.id===Number(productId));
  /*****************************************************/
  
  if(event.target.dataset.plus){
    //productId=Number(event.target.dataset.plus)
    //const productIndex=cartContainer.findIndex(({id})=>id===productId)
    cartContainer[productIndex_].quantity++;
  }else if(event.target.dataset.minus){
    //productId=Number(event.target.dataset.minus)
    //const productIndex=cartContainer.findIndex(({id})=>id===productId)
    if(cartContainer[productIndex_].quantity<2){
      cartContainer.splice(productIndex_,1)
    }
    else{
      cartContainer[productIndex_].quantity--;
    }
  }else{
    //const found=getProduct(data,event)
    //const productIndex=cartContainer.findIndex(product=>product.id===found.id)
    if(productIndex_ <0){
      cartContainer.push({...foundedProduct,quantity:1})
    }else{
      //found.quantity+=1
      cartContainer[productIndex_].quantity+=1;
    }
  }
  console.log(cartContainer);
}

//a kosár htmljenek elkeszitese
const createHTML=(cartContainer)=>{
    const cartList=document.querySelector("#cart-list")
    cartList.innerHTML="";
    const totalItemsHTML=document.getElementById("total-items")
    const toltalPriceHTML=document.getElementById("total-price")
    const productsHTML=cartContainer.map(({id,name,price,quantity})=> `<li>
      <i data-plus="${id}" class="bi bi-plus-circle-fill"></i>
       ${name} - ${quantity}db - ${price*quantity}Ft
      <i data-minus="${id}" class="bi bi-dash-circle-fill"></i>
    </li>`)
    cartList.innerHTML=productsHTML.join('')
    const totalQuantitx=cartContainer.reduce((total,{quantity})=>total+quantity,0)
    const toltalPrice=cartContainer.reduce((total,{quantity,price})=>total+(price*quantity),0)
    totalItemsHTML.textContent=totalQuantitx
    toltalPriceHTML.textContent=toltalPrice
}

const plusMinusButtons=(data,cartContainer)=>{
  const cartUl=document.querySelector("#cart-list")
  cartUl.addEventListener("click",(event)=>{
    if(event.target.dataset.plus || event.target.dataset.minus){
      HandleCart(data,cartContainer,event)
      createHTML(cartContainer)
    }
  })
}
function getProduct(data, event) {
    const button = event.target.closest(".product-card");
    if(!button){
      return null;
    }
    else{
      const selectedProduct = data.find(product => product.id === Number(button.id));
      return selectedProduct;
    }
}

const addToCartButtonManager = (data,cartContainer) => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
          HandleCart(data,cartContainer,event)
          createHTML(cartContainer)
        })
    });
};

  
  // A kártyák megjelenítése, amikor az oldal betöltődik:
  document.addEventListener("DOMContentLoaded", () => {
    renderCards(cardsHTML);
    // Innentől vannak termékek a weboldalon!!!!
    addToCartButtonManager(products,cart);
    plusMinusButtons(products,cart)
  });

  // ********************Szűrés funkció*****************

// Hibaüzenet:
function sendErrorMessage(){
    alert("Érvénytelen értéket adott meg!");
}; 
function notFoundMessage() {
    alert("Nem található ilyen termék az áruházban.");
}; 
// Kinyerjük az inputok értékeit:
function getInputValues() {
    const minPriceValue = document.querySelector("#min-price").value;
    const maxPriceValue = document.querySelector("#max-price").value;
    return [minPriceValue, maxPriceValue];
};

// Érvényesek-e az értékek?
const isValidValues = (minValue, maxValue) => {
    if (!minValue || !maxValue) {
        sendErrorMessage();
        return [false, 0, 0];
    }
    if (isNaN(minValue) || isNaN(maxValue)) {
        sendErrorMessage();
        return [false, 0, 0];
    }
    let x = Number(minValue);
    let y = Number(maxValue);
    if (x > y) {
        [ x, y ] = [y, x];
    }
    return [true, x, y];
};

// Szűrés az input-értékek alapján:
const filteringValues = (data, minV, maxV, callback) => {
    const [ isValid, number1, number2 ] = callback(minV, maxV);
    if (!isValid) {
        return [];
    }
    const filteredProducts = data.filter(product => product.price >= number1 && product.price <= number2);
    if (filteredProducts.length === 0){
        notFoundMessage();
        return [];
    }
    return filteredProducts;
    
};

// A szűrés-gomb életre keltése:
const filterButton = document.querySelector("#filter-btn");
filterButton.addEventListener("click", () => {
    const [ minValue, maxValue ] = getInputValues();
    const filteredProductsList = filteringValues(products, minValue, maxValue, isValidValues);
    const newCardsHTML = createProductCards(filteredProductsList);
    renderCards(newCardsHTML);
    addToCartButtonManager()
});