import { CreateUserDto } from './dto/create-user.dto'
import { createUser } from './user.service'

declare module '~/types/apis' {
  interface Post {
    '/api/user/register': {
      body: CreateUserDto
      response: GetApiResponse<typeof createUser>
    }
  }
}
