import type { Table } from 'apache-arrow';
import { registerTheme, use } from 'echarts/core';

export type JSONValue = string | number | boolean | { [x: string]: JSONValue };
export type EChartsData = Table | Table[] | JSONValue[] | null;
export type EChartsInitOpts = {
  locale?: string;
  renderer?: 'canvas' | 'svg';
  devicePixelRatio?: number;
  useDirtyRect?: boolean;
  useCoarsePointer?: boolean;
  pointerSize?: number;
  ssr?: boolean;
  width?: number | string;
  height?: number | string;
};
export type Extensions = Parameters<typeof use>[0];
export type ThemeOption = Parameters<typeof registerTheme>[1];
