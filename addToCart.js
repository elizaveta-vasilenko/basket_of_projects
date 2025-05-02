/**
 * Функция добавления товара в корзину на сервере.
 * @param {number} productId - ID товара, который нужно добавить в корзину.
 * @param {number} quantity - Количество товара, которое нужно добавить 
 * @returns {Promise<object>} - Промис, возвращающий обновленный объект корзины или null в случае ошибки.
 */
export async function addToCart(productId, quantity = 1) {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ productId: productId, quantity: quantity }), // Отправляем ID товара и количество
      });
  
      if (!response.ok) {
        console.error(`Ошибка при добавлении товара в корзину`);
      }
  
      const updatedCart = await response.json(); // Получаем обновленный объект корзины
      return updatedCart;
  
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
    }
  }