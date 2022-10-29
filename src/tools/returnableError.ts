/** Generate a returnable error type with a prefix.
 * @example
 * const MyError = ReturnableError("my-module.ts")
 * return MyError("Failed something, whoops")
 * */
export const ReturnableError = (prefix?: string) => (message: string) => {
    throw Error(`${prefix || "Error"} - ${message}`)
}
