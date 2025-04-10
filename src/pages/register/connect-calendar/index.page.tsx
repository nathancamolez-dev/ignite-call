import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function connectCalendar() {
  const { setValue } = useForm()

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Conect sua agenda!</Heading>
        <Text>
          Precisamos de algumas informações par criar o seu perfil! Ah, você
          pdoe editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Proximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
