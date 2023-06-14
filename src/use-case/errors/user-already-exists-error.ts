export class UserAlreadyExystsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
