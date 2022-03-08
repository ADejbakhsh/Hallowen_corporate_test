function add_str_at_nth_position_of_str(
  string: string,
  to_add: string,
  n: number,
): string {
  return string.substring(0, n) + to_add + string.substring(n);
}

export { add_str_at_nth_position_of_str };
