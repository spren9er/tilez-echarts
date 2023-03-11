import type { EChartsData, JSONValue } from '$lib/echarts/eChartsTypes';
import { Table } from 'apache-arrow';

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

export class DataToJSON {
  constructor(private data: EChartsData) {}

  public call() {
    if (!this.data) return { source: [] };

    if (Array.isArray(this.data)) {
      return this.data.length > 0 && this.data[0] instanceof Table
        ? this.data.map((table) => this.transform(table))
        : this.ArrayToJSON(this.data as JSONValue[]);
    }

    return this.transform(this.data);
  }

  private transform(data: Table | JSONValue) {
    return data instanceof Table
      ? new ArrowTableToJSON(data).call()
      : { source: data };
  }

  private ArrayToJSON(data: JSONValue[]) {
    if (data.length > 0) {
      const dimensions = Object.keys(data[0]);
      return { dimensions, source: data };
    }

    return { source: data };
  }
}
