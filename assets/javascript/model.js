function Item(id, name, price, image,quantity) {
    this.id = id;
    this.name = name;
    this.price = price*quantity;
    this.image = image;
    this.quantity = quantity;
    this.selected = false;
}

var obj = {
    itemList : [],

    addItem : function(id,name,price,image,quantity){
        var item = new Item(id,name,price,image,quantity);
        this.itemList.push(item);
        console.log(this.itemList);
    },

    deleteItem : function(id){
        // for(var i = 0; i < obj.itemList.length; i++){
        //     if(obj.itemList[i].id == id){
        //         obj.itemList[i].selected = true;
        //         console.log("Inside if",obj.itemList[i]);
        //     }
        // }
        // console.log("Element Selected...");
        // console.log(obj.itemList);

        toDelete = this.itemList.filter(function(product){
            return product.id == id;
        });
        console.log(toDelete);
        toDelete[0].selected = true;
        // console.log(toDelete);

        this.itemList = this.itemList.filter(function(obj){
            return obj.selected == false;
        })

    },

    cartCounter : function(){
        var counter = this.itemList.filter(function(obj){
            return obj.selected == false;
        }).length;
        return counter;
    },

    // searchSong : function(productName) {
    //     this.itemList = this.itemList.filter(function(obj){
    //         return obj.name.includes(productName);
    //     })
    // }

}