/**
 * Group array in subarrays of size `n`
 * @param arr
 * @param n
 */
export function pack<T>(arr: T[], n: number): T[][] {
  const initialValue: T[][] = []
  return arr.reduce((prev, cur) => {
    const last = prev[prev.length - 1]
    if (!last || last.length === n) {
      prev.push([cur])
    } else {
      last.push(cur)
    }
    return prev
  }, initialValue)
}
