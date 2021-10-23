import faker from 'faker';
faker.locale = 'es';

export default function generateProd() {
    return {
      nombre:faker.commerce.productName(),
      email: faker.commerce.price(),
      imagen:faker.image.imageUrl()
    }
  }