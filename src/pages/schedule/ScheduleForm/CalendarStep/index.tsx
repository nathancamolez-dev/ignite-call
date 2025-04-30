import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

export function CalendarStep() {
  const [selectedDate, setSelectDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>({
    possibleTimes: [],
    availableTimes: [],
  })
  const router = useRouter()

  const username = String(router.query.username)

  const hasSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const dateAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) {
      setAvailability({ possibleTimes: [], availableTimes: [] })
      return
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then(response => {
        console.log(response.data)
        setAvailability(response.data)
      })
  }, [selectedDate, username])

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
