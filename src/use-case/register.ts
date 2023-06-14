import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExystsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersrepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersrepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExystsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersrepository.create({
      name,
      email,
      password_hash,
    })
  }
}
