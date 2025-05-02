/**
 * Функция для удаления товара из корзины на сервере.
 * @param {number} productId - ID товара, который нужно удалить.
 * @returns {Promise<object>} - Промис, возвращающий обновленный объект корзины
 *                                  
 */
export async function removeToCart(productId) {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'DELETE', // Используем метод DELETE
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!response.ok) {
        console.error(`Ошибка при удалении товара из корзины`);
      }
  
      const updatedCart = await response.json(); // Получаем обновленный объект корзины
      return updatedCart;
  
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
    }
  }