/** Given an array, returns a numbered map starting at index 1
 * Handy for nicely printed console outputs
 *
 * @example
 * NumberedMap(["a", "b", "c"]);
 * // Map(3) {
 * //   1 => 'a',
 * //   2 => 'b',
 * //   3 => 'c',
 * // }
 * */
export const NumberedMap = (arr: any[]) => {
    const map = new Map<number, typeof arr[number]>()
    arr.forEach((val, index) => {
        map.set(index + 1, val);
    })
    return map
}