import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      age?: number
      level?: number
      points?: number
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    age?: number
    level?: number
    points?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    age?: number
    level?: number
    points?: number
  }
}