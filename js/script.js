document.addEventListener('click', (event) =>{
    const type = event.target.dataset.type;

    if(type === 'showAll'){
        getAllNotes();
    }
    if(type === 'showid'){
        let getId = prompt('Enter "ID" to search note');
        getToId(getId);
    }
    if(type === 'add'){
        let label = prompt('Enter note "Label"');
        let text = prompt('Enter Note "Text"');
        addNote(label, text)
    }
    if(type === 'remove'){
        let inputid = prompt('Enter User "ID"');
        deleteNote(inputid);     
    }
});

function getAllNotes(){
    deleteItems();
      
    $.get("http://bipihok184-001-site1.itempurl.com/Admin/GetAll")
     .done((data) =>{
        constructCart(data);                   
    })
     .fail(() =>{
        alert("ERROR");
        console.warn("GETALL REQUEST ERROR");
    });
};

function getToId(id){
    deleteItems();
    $.get("http://bipihok184-001-site1.itempurl.com/Admin/GetId?id=" + id)
     .done((data) =>{
        if(data != null){
            constructSingleCart(data);                   
        }
        else{
            alert('ID is not found');
        }
    })
     .fail(() =>{
        alert("ID ERROR");
        console.warn("GETID REQUEST ERROR");
    });
}

function addNote(label, text){
    $.post("http://bipihok184-001-site1.itempurl.com/Admin/Add Note",
    {
        label: label,
        text: text,       
    }).done(function(data){
        alert(`Successfully Added\nNew Note ID: ${data}`);
        console.log("Successfully Added!");
        getAllNotes();
    })
};

function deleteNote(id){
    $.ajax({
        url: "http://bipihok184-001-site1.itempurl.com/Admin/Delete Note?id=" + id,
        type: "DELETE",
        success: function(){
            alert("Delete successfully!");
            getAllNotes();
            console.log("Delete successfully!");
        },
        error: function(){
            alert("ERROR");
            console.warn("DELETE ERROR");
        }
    });
};

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
