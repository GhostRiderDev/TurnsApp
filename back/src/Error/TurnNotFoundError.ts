class TurnNotFoundError extends Error {
  constructor(message: string = "Turn not found") {
    super(message);
  }
}
export default TurnNotFoundError;
