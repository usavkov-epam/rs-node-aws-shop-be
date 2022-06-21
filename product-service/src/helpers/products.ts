import data from '../../tests/fixtures/products';

const mockDB = {
  getAll: async () => data,
  getById: async (id: string) => data.find(product => product.id === id),
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
    if (!id) throw new Error('No id provided');

    const product = await this.db.getById(id);

    if (!product) throw new Error(`Product not found`);

    return product;
  }
};
