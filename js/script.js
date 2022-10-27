
function deleteItems() { 
    const deleteElement = document.querySelector('.carts__container');
    deleteElement.innerHTML = '';  
};

function constructCart(data){
    let container = document.querySelector('.carts__container');

    let cartBlock = document.createElement('div');
    cartBlock.setAttribute('class', 'carts__block');
    for (const iterator of data) {

        let cart = document.createElement('div');
        cart.setAttribute('class', 'cart');

        let h2 = document.createElement('h2');
        h2.innerText = `ID: ${iterator.id}`;

        let cartLabel = document.createElement('div');
        cartLabel.setAttribute('class', 'cart__label');
        cartLabel.innerText = `${iterator.label}`;

        let cartText = document.createElement('div');
        cartText.setAttribute('class', 'cart__text');
        cartText.innerText = `${iterator.text}`;

        cart.append(h2);
        cart.append(cartLabel);
        cart.append(cartText);
        cartBlock.prepend(cart);
        container.append(cartBlock);


    };
};
