import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './styles'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform(username => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>
export function ClaimUsernameForm() {
  const { control, handleSubmit } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })
  const router = useRouter()

  async function handlePreRegister(data: ClaimUsernameFormData) {
    const { username } = data
    await router.push(`/register?username=${username}`)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextInput
            size="sm"
            prefix="ignite.com/"
            placeholder="seu-usuário"
            {...field}
          />
        )}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
