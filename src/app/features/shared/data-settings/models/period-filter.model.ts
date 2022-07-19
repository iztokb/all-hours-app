export interface ILoadDataOnDemand {
  from: Date | null;
  search: string;
  to: Date | null;
}

export interface IProvidedPeriodChooser {
  from: Date | null;
  to: Date | null;
}
