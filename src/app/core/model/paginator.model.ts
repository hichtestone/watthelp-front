export class Paginator<T> {
  page = 1;
  perPage = 25;
  count: number;
  data: T[] = [];
}
