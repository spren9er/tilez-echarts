import type { Table } from 'apache-arrow';

type datasetColumns = { [key: string]: unknown[] };

class ArrowTableToJSON {
  constructor(private data: Table) {}

  public call() {
    const { schema } = this.data;
    const { fields } = schema;

    const dimensions = fields.map((field) => field.name);

    const source = dimensions.reduce(
      (obj: datasetColumns, column: string, idx: number) => {
        obj[column] = this.data.getChildAt(idx)?.toArray() || [];

        return obj;
      },
      {},
    );

    return { dimensions, source };
  }
}

export class ArrowDataToJSON {
  constructor(private data: Table | Table[]) {}

  public call() {
    if (Array.isArray(this.data)) {
      return this.data.map((table) => this.transform(table));
    }

    return this.transform(this.data);
  }

  private transform(table: Table) {
    return new ArrowTableToJSON(table).call();
  }
}
