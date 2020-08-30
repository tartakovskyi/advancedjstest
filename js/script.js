//Filters
document.addEventListener('change', function(e) {
	if (e.target.id == 'categoryFilter' || e.target.id == 'priceFilter') {
		const category = document.getElementById('categoryFilter').value;
		const price = Number(document.getElementById('priceFilter').value);
		const products = document.getElementsByClassName('product-box__item');

		for (var i = 0; i < products.length; i++) {
			if (category != '0' && category !== products[i].dataset.category || (price > 0) && (price < Number(products[i].dataset.price))) {
				products[i].style.display = 'none';
			} else {
				products[i].style.display = 'flex';
			}
		} 
	}
});


//Add product to cart
document.addEventListener('click', function(e) {
	if (e.target.className == 'product-box__btn') {
		const parent = e.target.parentElement;
		const quantity = Number(parent.getElementsByClassName('qty__item')[0].value);
		const price = Number(e.target.closest('.product-box__item').dataset.price);
		
		if (quantity < 1) {
			alert('Укажите количество товара');
		} else {
			const cartQuantity = document.getElementById('cartQuantity');
			cartQuantity.innerText = Number(cartQuantity.innerText) + quantity;
			
			const cartSum = document.getElementById('cartSum');
			cartSum.innerText = Number(cartSum.innerText) + price * quantity;
		}
	}
})


//Open/close modal form
const btnCheck = document.getElementById('btnCheck');
btnCheck.addEventListener('click', function() {
	if (Number(document.getElementById('cartQuantity').innerText) > 0) {
		document.getElementById('modalCart').classList.add("active");
	} else {
		alert('Ваша корзина пуста!');
	}
	
});

document.addEventListener('click', function(e) {
	if (e.target.classList.contains('jsClose')) {
		document.getElementById('modalCart').classList.remove("active");
	}
});


//Form submit
const modalCartForm = document.getElementById('modalCartForm');
modalCartForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const fields = modalCartForm.getElementsByTagName('input');
	console.dir(modalCartForm)
	let errors = '';
	for (var i = 0; i < fields.length; i++) {
		if (fields[i].value === '') errors += 'Не заполнено поле ' + fields[i].name + '\r';
	}
	if (errors.length) {
		alert(errors);
	} else {
		document.getElementById('modalCart').classList.remove("active");
		document.getElementById('cartQuantity').innerText = '0';
		document.getElementById('cartSum').innerText = '0';
		for (var i = 0; i < fields.length; i++) {
			fields[i].value = '';
		}
		alert('Заказ успешно оформлен');
	}
}); 
