class InvalidOperatioError extends Error {
  constructor(message = "Invalid Operation") {
    super(message);
    this.name = "InvalidOperatioError";
  }
}

export default InvalidOperatioError;
