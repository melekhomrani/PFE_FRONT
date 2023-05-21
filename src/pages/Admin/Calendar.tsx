import React, { useState } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { Box, FormLabel, HStack, Input } from '@chakra-ui/react'
import useGetCalendarData from '../../hooks/useGetCalendarData';
import { useQueryClient } from '@tanstack/react-query';

function Calendar() {
  var dateOffset = (24*60*60*1000)
  const today = new Date();
  const yesterday = new Date(today.getTime() - dateOffset);
  const [from, setFrom] = useState<string>(yesterday.toISOString().slice(0, 10));
  const [To, setTo] = useState<string>(today.toISOString().slice(0, 10));
  const {isLoading, isError, data} = useGetCalendarData({start: from, end: To});
  const queryClient = useQueryClient();
  const handleStartDateChange = (e: any) => {
    setFrom(e.target.value);
    queryClient.invalidateQueries({ queryKey: ['calendar'] })
  }
  const handleEndDateChange = (e: any) => {
    setTo(e.target.value);
    queryClient.invalidateQueries({ queryKey: ['calendar'] })
  }
  console.log("from", from);
  console.log("to", To);
  console.log("data", data)
  return (
    <Box>
      <HStack>
      <FormLabel>From
        <Input type="date" onChange={handleStartDateChange} defaultValue={yesterday.toISOString().slice(0, 10)}/>
      </FormLabel>
      <FormLabel>To
        <Input type="date" onChange={handleEndDateChange} defaultValue={today.toISOString().slice(0, 10)} />
      </FormLabel>
      </HStack>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && data.length > 0 ? <ResponsiveCalendar
      data={data!}
      from={new Date(from)}
      to={new Date(To)}
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      yearLegendOffset={10}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 10,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />: <div>No data</div>}
    </Box>
  )
}

export default Calendar