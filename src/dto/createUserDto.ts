// This is not neccesary. Can be used to create a dto object in the
// controller which will be passed into interactor if needed.

class CreateUserDto {
  userName: string;
  email: string;

  constructor(userName: string, email: string) {
    this.userName = userName;
    this.email = email;
  }
}

export { CreateUserDto };
