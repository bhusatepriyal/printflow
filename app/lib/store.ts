export type PrintJobStatus =
  | "PENDING"
  | "PRINTING"
  | "COMPLETED"
  | "FAILED";

export interface PrintJob {
  id: string;
  designName: string;
  sellerName: string;
  material: "PLA" | "PETG" | "ABS";
  estimatedTime: number; // hours
  actualTime?: number;
  filamentUsed?: number; // grams
  printer: string;
  status: PrintJobStatus;
  cost?: number;
}

export const printJobs: any[] = [];

