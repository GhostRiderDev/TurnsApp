class UserNotFoundError extends Error {
  constructor(message: string = "User not found") {
    super(message);
  }
}

export default UserNotFoundError;
