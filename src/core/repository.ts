export type Entity<T> = T & {
  id: number;
};

export class Repository<T> {
  protected data: Entity<T>[];
  private lastIndex: number;

  constructor() {
    this.data = [];
    this.lastIndex = 0;
  }

  // TODO: filters for find
  find() {
    return this.data;
  }

  findOne(id: number) {
    return this.data.find((item) => item.id === id);
  }

  insert(item: T): Entity<T> {
    this.lastIndex++;
    const _item: Entity<T> = Object.assign(item, { id: this.lastIndex });
    this.data.push(_item);
    return _item;
  }

  update(id: number, record: Partial<T>): Entity<T> {
    const item = this.findOne(id);
    return Object.assign(item, record);
  }

  remove(id: number): Entity<T> {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const [removed] = this.data.splice(index, 1);
    return removed;
  }
}
