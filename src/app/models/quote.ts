export interface Quote {
  symbol: string;
  date: string;
  close: number;
}
export interface QuoteResults {
  [key: string]: {
    dates: string[]; // Assuming dates are strings
    closes: number[]; // Assuming closes are numbers
  };
}