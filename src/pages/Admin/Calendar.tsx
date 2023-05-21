import React, { useState } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { Box, FormLabel, HStack, Input, Text, useBreakpointValue } from '@chakra-ui/react'
import useGetCalendarData from '../../hooks/useGetCalendarData';
import { useQueryClient } from '@tanstack/react-query';

function Calendar() {
  var dateOffset = (24*60*60*1000);
  const direction = useBreakpointValue({ base:"vertical", lg:"horizontal", xl:"horizontal", "2xl":"horizontal", md:"vertical", sm:"vertical"})
  const today = new Date();
  const yesterday = new Date(today.getTime() - dateOffset);
  const [from, setFrom] = useState<string>("2023-04-21");
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
      <Box w={{base: "xs", lg:"4xl", xl:"4xl", "2xl":"4xl", md:"2xl", sm:"xs"}} h="2xl" bgColor="red">
      {data ? <ResponsiveCalendar
        data={data}
        from={from}
        to={To}
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        //@ts-ignore
        direction={direction}
        dayBorderColor="#ffffff"
        tooltip={({day, value, color}: any)=>{
          return(
            <Box bgColor={color} p="1" rounded="lg">
              <Text>à {new Date(day).toDateString()}: {value} Nouvelles reclamations</Text>
            </Box>
          )
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />: <div>No data</div>}
    </Box>
    </Box>
  )
}

export default Calendar