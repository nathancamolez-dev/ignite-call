import { Heading, Text, styled } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160vw) / 2)',
  height: '100vh',
  marginLeft: 'auto',
  background: '$gray900',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 400,
  padding: '0 $10',

  [`${Heading}`]: {
    '@media(max-width: 600px)': {
      fonSize: '$6xl',
    },
  },
  [`${Text}`]: {
    marginTop: '$2',
    color: '$gray300',
  },
})

export const Preview = styled('div', {
  padding: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
