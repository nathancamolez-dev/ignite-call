import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Calendar } from '../../../../components/Calendar'
import { api } from '../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}
interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectDate] = useState<Date | null>(null)
  const router = useRouter()

  const username = String(router.query.username)

  const hasSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const dateAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

  function handleSelectDateTime(hour: number) {
    const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour')

    onSelectDateTime(dateWithTime.toDate())
  }

  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectDate} />
      {hasSelectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{dateAndMonth}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map(hour => {
              return (
                <TimePickerItem
                  onClick={() => handleSelectDateTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                  key={hour}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
