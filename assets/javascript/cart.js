window.addEventListener("load",initevents);
function initevents(){
    loadProducts();
}
function loadProducts(){
    if(localStorage.cartProducts){
        var data = JSON.parse(localStorage.cartProducts);
        obj.itemList = data;
        printItems();
        calculateTotal();
        cartCount();
    }
}
function cartCount(){
    count = obj.cartCounter();
    emp = document.getElementById("empt");
    if(count != 0){
        emp.style.display = 'none';
    }
    else if(count == 0){
        emp.style.display = 'initial';
    }
    document.getElementById("counter1").innerHTML = count;
    document.getElementById("counter").innerHTML = count;
}
function saveChanges(){
    if(window.localStorage){
        var json = JSON.stringify(obj.itemList);
        console.log(json);
        localStorage.setItem('cartProducts',json);
    }
    else {
        alert("Localstorage not supported...");
    }
}
function printItems() {
    var rupee=document.getElementById("rupee").innerHTML;
    var ul = document.getElementById("cartproduct");
    ul.innerHTML = "";
    obj.itemList.forEach(function(elem){
        var li = document.createElement("li");
        li.className = 'product';
        li.setAttribute('title', elem.id);
        // li.className = 'list-group-item product';
        var p_name = document.createElement("span");
        p_name.innerHTML = elem.name;
        p_name.className = 'name';
        var p_curr = document.createElement("span");
        p_curr.innerHTML = rupee;
        p_curr.className = 'curr';
        var p_price = document.createElement("span");
        p_price.innerHTML = elem.price;
        p_price.className = 'pprice';
        var p_image = document.createElement("img");
        p_image.className = 'productImage';
        p_image.setAttribute('src', elem.image);
        var delete_button = document.createElement("button");
        delete_button.innerHTML = "<i class='fas  fa-trash'/>  Remove";
        delete_button.className = 'delbtn';
        var plus_button = document.createElement("button");
        plus_button.innerHTML = "<i class='fas fa-plus'></i>";
        plus_button.className = 'plusbtn';
        var quan_button = document.createElement("span");
        quan_button.innerHTML = elem.quantity;
        quan_button.className = 'quanbtn';
        var minus_button = document.createElement("button");
        minus_button.innerHTML = "<i class='fas fa-minus'></i>";
        minus_button.className = 'minusbtn';
        var div6 = document.createElement("div");
        var div5 = document.createElement("div");
        var div4 = document.createElement("div");
        var div3 = document.createElement("div");
        var div2 = document.createElement("div");
        var div1 = document.createElement("div");
        div1.className = 'div-img';
        div2.className = 'div-text';
        div2.setAttribute('title', elem.id);
        div3.className = 'div-name';
        div4.className = 'div-price';
        div5.className = 'div-pm';
        div6.className = 'div-rem';
        div6.setAttribute('title', elem.id);
        div5.setAttribute('title', elem.id);
        div4.setAttribute('title', elem.id);
        div1.setAttribute('title', elem.id);
        div3.setAttribute('title', elem.id);
        div1.appendChild(p_image);
        div3.appendChild(p_name);
        div4.appendChild(p_curr);
        div4.appendChild(p_price);
        div5.appendChild(minus_button);
        div5.appendChild(quan_button);
        div5.appendChild(plus_button);
        div6.appendChild(delete_button);
        div2.appendChild(div3);
        div2.appendChild(div4);
        div2.appendChild(div5);
        div2.appendChild(div6);
        li.appendChild(div1);
        li.appendChild(div2);
        ul.appendChild(li);
        delete_button.addEventListener("click", deleteProduct);
        plus_button.addEventListener("click", plusProduct);
        for(var i = 0; i < obj.itemList.length; i++){
            if(obj.itemList[i].quantity > 1)
            minus_button.addEventListener("click", minusProduct);
            // else
            // window.alert("minimum quantity must be 1...");
        }
    })
}
function deleteProduct(){
    var elem = event.srcElement;
    elem = elem.parentElement;
    elem = elem.parentNode;
    console.log("Deleting", elem);
    var id = elem.title;
    obj.deleteItem(id);
    printItems();
    saveChanges();
    calculateTotal();
    cartCount();
}
function calculateTotal(){
    var price = 0;
    for(var i = 0; i < obj.itemList.length; i++){
        price += parseInt(obj.itemList[i].price);
    }
    document.getElementById("total").innerHTML = price;
}
function plusProduct(){
    var ele = event.srcElement;
    ele = ele.parentElement;
    ele = ele.parentElement;
    var id = ele.title;
    var com = 0;
    for(var i = 0; i < obj.itemList.length; i++){
        if( id == obj.itemList[i].id)
        com = i;
    }
    console.log(com);
    var n = obj.itemList[com].quantity;
    var pri = obj.itemList[com].price;
    pri = pri/n;
    var pr = obj.itemList[com].price;
    pr = pr+pri;
    obj.itemList[com].price = pr;
    n++; 
    obj.itemList[com].quantity = n;
    printItems();
    saveChanges();
    calculateTotal();
}
function minusProduct(){
    var ele = event.srcElement;
    ele = ele.parentElement;
    ele = ele.parentElement;
    var id = ele.title;
    console.log(ele);
    var com = 0;
    for(var i = 0; i < obj.itemList.length; i++){
        if( id == obj.itemList[i].id)
        com = i;
    }
    var n = obj.itemList[com].quantity;
    var pri = obj.itemList[com].price;
    pri = pri/n;
    var pr = obj.itemList[com].price;
    pr = pr-pri;
    obj.itemList[com].price = pr;
    n--; 
    obj.itemList[com].quantity = n;
    printItems();
    saveChanges();
    calculateTotal();
}