class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ReferenceError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}