import { format } from "date-fns";

const formatDateForDisplay = (date) => format(date, 'd MMMM y, H:mm');

export { formatDateForDisplay };

