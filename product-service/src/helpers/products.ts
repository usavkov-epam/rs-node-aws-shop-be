import data from '../products.js';

const mockDB = {
  getAll: () => data,
  getById: (id: string) => data.find(product => product.id === id),
};

export class Products {
  db: any;

  constructor(db = mockDB) {
    this.db = db;
  }

  async getAll() {
    return this.db.getAll() || [];
  }

  async getById(id: string) {
    if (!id) return new Error('No id provided');

    return this.db.getById(id) || new Error("Product not found");
  }
};
