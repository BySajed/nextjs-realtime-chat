import { LucideProps, UserPlus } from 'lucide-react'

export const Icons = {
  Logo: (props: LucideProps) => (
    <img style={{ width: 'auto', height: '4rem', marginTop: '2rem' }}
      src='/logo.png'
      alt='Logo'
      />
  ),
  UserPlus
}

export type Icon = keyof typeof Icons
