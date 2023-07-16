// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function uniq(arr: any[]) {
  return [...new Set(arr)]
}
