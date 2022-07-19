import { startOfMonth, endOfMonth } from 'date-fns';
import { ILoadDataOnDemand } from 'src/app/features/shared/data-settings';

export const GetCurrentMonthStartAndEndDates = (currentDate: Date) => {
  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);

  return {
    startOfMonth: startOfMonthDate,
    endOfMonth: endOfMonthDate,
  };
};

export const TransformDataRequestPayloadToQueryParams = (
  data: ILoadDataOnDemand
): string => {
  const fromParam = data?.from ? data.from.toISOString() : null;
  const toParam = data?.to ? data.to.toISOString() : null;

  if (!fromParam || !toParam) {
    return `searchTerm=${data.search}`;
  }

  return `dateFrom=${fromParam}&dateTo=${toParam}&searchTerm=${data.search}`;
};
