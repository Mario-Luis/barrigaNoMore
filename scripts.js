const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressImput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];

cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
    updateCartModal();
})

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
            <div class="flex gap-1 justify-between mr-3">
                <div class="flex gap-1 mt-1">
                    <p>(${item.quantity})</p>
                    <p>${item.name}</p>
                    <p>R$${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <button class="bg-red-800/85 px-3 rounded-full absolute remove-btn" data-name="${item.name}">
                        -
                    </button>
                </div>
            </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style:"currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click",function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

addressImput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addressImput.classList.remove("border-red-800")
        addressWarn.classList.add("hidden")
    }


})

checkoutBtn.addEventListener("click", function(){
    // const isOpen = checkRestaurantIsOpen();
    // if(!isOpen)
    //     {
    //     alert("RESTAURANTE FECHADO NO MOMENTO!")
    //     return;
    // }
    if(cart.length === 0) return;
    if(addressImput.value === ""){
        addressWarn.classList.remove("hidden")
        addressImput.classList.add("border-red-800")
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Qtd: (${item.quantity})
|`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "+818087458456"

    window.open(`https://wa.me/${phone}?text=${message}Total:${cartTotal.textContent}___Endereço:${addressImput.value}`,"_blank")

    // cart = [];
    // updateCartModal();
})

// function checkRestaurantIsOpen(){
//     const data = new Date();
//     const hora = data.getHours();
//     return hora >= 18 && hora < 24;
// }

// const spanItem = document.getElementById("date-span")
// const isOpen = checkRestaurantIsOpen();


// if(isOpen){
//     spanItem.classList.remove("bg-red-800");
//     spanItem.classList.add("bg-green-800");
//     spanItem.classList.add("ABERTO");
// }else{
//     spanItem.classList.remove("bg-green-800")
//     spanItem.classList.add("bg-red-800")
//     spanItem.classList.add("FECHADO")
// }
