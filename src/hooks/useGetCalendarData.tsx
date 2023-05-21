import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

export interface CalendarParams{
    start: string;
    end: string;
}

export interface CalendarItem{
    day: string;
    value: number;
}

/**
 * 
 * Gets the calendar data for the given period
 * @param start - String with format YYYY-MM-DD  - Starting date
 * @param end - String with format YYYY-MM-DD  - Ending date
 * @returns Array with [{date: YYY-MM-DD, value: number}, ...]
 */
const getCalendarData = async ({start, end}: CalendarParams): Promise<Array<CalendarItem>> => {
  const res = await axios.get(`/api/gest/reclamations/calendar?start=${start}&end=${end}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

/**
 * 
 * Gets the calendar data for the given period
 * @param start - String with format YYYY-MM-DD  - Starting date
 * @param end - String with format YYYY-MM-DD  - Ending date
 * @returns Array with {date: YYY-MM-DD, value: number}
 */

const useGetCalendarData = ({start, end}: CalendarParams) => {
  return useQuery({ queryKey: ["calendar", {start, end}], queryFn: ()=> getCalendarData({start , end}) });
}

export default useGetCalendarData;