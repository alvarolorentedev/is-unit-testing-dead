export function cost(distance: number, isHome: boolean): number {
  return distance * 0.03 * (isHome ? 0.2 : 1);
}
