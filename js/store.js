var DbProduct=[
    {id:1,productName:'Beauty Oil',price:3,src:'Images/Album 1.jpg',count:5},
    {id:2,productName:'Colored Powder',price:10,src:'Images/Album 2.jpg',count:5},
    {id:3,productName:'Golden Pineapple Elixir',price:8,src:'Images/Album 3.jpg',count:5},
    {id:4,productName:'Tropical Glow Spray',price:5,src:'Images/Album 4.jpg',count:5},
]


var shopItemsTag=document.querySelector('.shop-items')
let ftagMenDoc= document.createDocumentFragment() //  FRAGMENT

function LoadProduct(){
    DbProduct.forEach(function(product){
        var productTag=document.createElement('div')
        productTag.classList.add('shop-item')
        var productTittleTag=document.createElement('span')

        productTittleTag.classList.add('shop-item-title')
        productTittleTag.innerHTML=product.productName

        var imgProduct=document.createElement('img')
        imgProduct.classList.add('shop-item-image')
        imgProduct.src=product.src

        var productDetailTag=document.createElement('div')
        productDetailTag.classList.add('shop-item-details')


        var productPriceTag=document.createElement('span')
        productPriceTag.classList.add('shop-item-price')
        productPriceTag.innerHTML='$'+' '+product.price

        var btnAddToCart=document.createElement('button')
        btnAddToCart.classList.add('btn','btn-primary','shop-item-button')
        btnAddToCart.innerHTML='ADD TO CART'
       
        productTag.append(productTittleTag,imgProduct)
    
        productDetailTag.append(productPriceTag,btnAddToCart)

        productTag.append(productDetailTag)
        shopItemsTag.append(productTag)

        btnAddToCart.addEventListener('click',function(){
            addToBasket(product)
        })
    })
}
LoadProduct()

function addToBasket(product){
var cartItemTag=document.querySelector('.cart-items')

const existingItem = cartItemTag.querySelector(`.cart-row[data-id='${product.id}']`);

if (existingItem) {
    alert('This product is already in the cart!');
    return; 
}


var cartItemRowTag=document.createElement('div')

/*cartItemTag.insertAdjacentHTML('afterbegin',`<div class="cart-row">
<div class="cart-item cart-column">
    <img class="cart-item-image" src="${product.src}" width="100" height="100">
    <span class="cart-item-title">${product.productName}</span>
</div>
<span class="cart-price cart-column">$${product.price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>
</div>`)*/


cartItemRowTag.classList.add('cart-row')
cartItemRowTag.setAttribute('data-id', product.id);

var cartItemColumTag=document.createElement('div')
cartItemColumTag.classList.add('cart-item','cart-column')

var imgItem=document.createElement('img')
imgItem.classList.add('cart-item-image')
imgItem.style.width='100'
imgItem.style.height='100'
imgItem.src=product.src

var itemTitleTag=document.createElement('span')
itemTitleTag.classList.add('cart-item-title')
itemTitleTag.innerHTML=product.productName

cartItemColumTag.append(imgItem,itemTitleTag)
cartItemRowTag.append(cartItemColumTag)

var cartPriceItem=document.createElement('span')
cartPriceItem.classList.add('cart-price','cart-column')
cartPriceItem.innerHTML='$'+product.price
cartItemRowTag.append(cartPriceItem)

var quantityItem=document.createElement('div')
quantityItem.classList.add('cart-quantity','cart-column')
var cartQuantityInput=document.createElement('input')
cartQuantityInput.classList.add('cart-quantity-input')
cartQuantityInput.type='number'
cartQuantityInput.value=1
var btnRemove=document.createElement('button')
btnRemove.classList.add('btn','btn-danger')
btnRemove.innerHTML='Remove'
quantityItem.append(cartQuantityInput,btnRemove)
cartItemRowTag.append(quantityItem)
cartItemTag.append(cartItemRowTag)

btnRemove.addEventListener('click',function(){
    cartItemRowTag.remove()
    CalculatetotalPrice()
})
cartQuantityInput.addEventListener('input',function(event){
    calculateItem(event,product,cartPriceItem,cartItemRowTag)
  
})
CalculatetotalPrice()
    
  

}

function calculateItem(event,product,cartPriceItem){
   let quantity=+(event.target.value)
    const countProduct=product.count
    
    if(quantity >countProduct){
        alert('More than available stock ! ')
        quantity =countProduct
        event.target.value=countProduct
       
    }if(quantity <= 0  || isNaN(quantity)){
        quantity = 1;
        event.target.value=1
       
    }
    cartPriceItem.innerHTML='$'+(product.price)
    CalculatetotalPrice()
    }




    function CalculatetotalPrice(){
      var containerItems=document.querySelector('.cart-items')
      var rowPerItem=containerItems.querySelectorAll('.cart-row')
      var finalTotalPriceTag=document.querySelector('.cart-total-price')
      var totalPrice=0
      rowPerItem.forEach(function(row){
            priceTag=row.querySelector('.cart-price')
            quantityInput=row.querySelector('.cart-quantity-input')

         
            var price = parseFloat( priceTag.innerText.replace('$', ''));
            var quantity=quantityInput.value
            totalPrice +=price*quantity
            console.log(totalPrice )
      })
      finalTotalPriceTag.innerHTML='$'+totalPrice

     
    }

  

   

 
    


