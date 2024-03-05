class ResourceNotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}
export default ResourceNotFoundError;
