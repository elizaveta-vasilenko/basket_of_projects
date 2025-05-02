import { createProduct, getProducts } from './api.js';
import { SELECTORS } from './selectors.js';
import {addToCart} from './addToCart.js';
import { removeToCart } from './removeToCart.js';
// добавление товара в корзину
init();

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    getProducts();
    submitForm();
    initAddToCartButtons();
    initRemoveToCartButtons();
  });
}

function submitForm() {
  SELECTORS?.form?.addEventListener('submit', (event) => { // подписываемся на события
    event?.preventDefault(); // страница не обновляется

    const productData = {};
    Array?.from(SELECTORS?.form?.elements)?.forEach((element) => {
      if (element?.name) {
        productData[element.name] = element.value; // получаем заничение элемента
      }
    });

    createProduct(productData)
      .then(() => {
        getProducts();
      })
      .catch(error => {
        console.error(error);
      });
  });
}
function initAddToCartButtons() {
    const productList = SELECTORS?.productList; // Получаем ссылку на контейнер списка товаров
  
    const addToCartButtons = productList.querySelectorAll('item-card'); // получаем доступ к самой карточке
 
  addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => { //событие клик
      const productId = parseInt(button.dataset.productId);  // извлекаем id и преобразуем в целое число
    

      try { 
        const cart = await addToCart(productId); 

        if (cart) {
          console.log('Корзина успешно обновлена:', cart);
        } else {
          console.error('Не удалось добавить товар в корзину.');
        }
      } catch (error) {
        console.error(error); // ловим ошибку
      }
    });
  });
}

// удаление товара из корзины
function initRemoveToCartButtons() { 
    const removeToCartButtons = document.getElementById('item-card'); 

    removeToCartButtons.forEach(button => {
      button.addEventListener('click', async () => { // событие клик по кнопке
        const productId = parseInt(button.dataset.productId);
  
        try {
          const updatedCart = await removeToCart(productId); // Вызываем функцию удаления
  
          if (updatedCart) {
            console.log('Товар успешно удален из корзины. Обновленная корзина:', updatedCart);
            // Обновляем отображение корзины 
             updateCartDisplay(updatedCart); 
          } else {
            console.error('Не удалось удалить товар из корзины.');
          }
        } catch (error) {
          console.error('Ошибка при вызове removeFromCart:', error); // ловим ошибку
        }
      });
    });
}
  

