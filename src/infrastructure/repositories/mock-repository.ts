import type { Repository } from './repository.interface';

export class MockRepository<T extends { id: string }> implements Repository<T> {
  constructor(protected items: T[]) {}

  async list(): Promise<T[]> {
    await new Promise(r => setTimeout(r, 300));
    return [...this.items];
  }

  async getById(id: string): Promise<T | null> {
    await new Promise(r => setTimeout(r, 150));
    return this.items.find(item => item.id === id) ?? null;
  }

  async create(data: Partial<T>): Promise<T> {
    await new Promise(r => setTimeout(r, 300));
    const newItem = { ...data, id: String(Date.now()) } as T;
    this.items.push(newItem);
    return newItem;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await new Promise(r => setTimeout(r, 300));
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Item with id ${id} not found`);
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }

  async delete(id: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 200));
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}
