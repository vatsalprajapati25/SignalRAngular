export interface dropdownModel {
  id: number;
  value: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
  TAID: number;
}

export type SortColumn = keyof any | '';

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

