import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Minimo de 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Apenas letras e hifens.' })
    .transform(username => username.toLowerCase()),
  name: z.string().min(3, { message: 'Minimo de 3 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.log(err)
    }
  }

  return (
    <>
      <NextSeo title="Crie sua conta | Ignite Call" />
      <Container>
        <Header>
          <Heading as="strong">
            <Text>
              Precisamos de algumas informações par criar o seu perfil! Ah, você
              pode editar essas informações depois.
            </Text>

            <MultiStep size={4} currentStep={1} />
          </Heading>
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuario"
              {...register('username')}
            />
            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            {' '}
            Proximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
