export class ItemsListResponseUtility<T> {
  success: boolean;
  items: T[];

  constructor(partial: Partial<ItemsListResponseUtility<T>>) {
    this.success = partial.success;
    this.items = partial.items;
  }
}
