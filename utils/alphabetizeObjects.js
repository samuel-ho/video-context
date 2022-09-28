// Use this function in conjunction with Object.sort(alphabetizeObjects).
export default function alphabetizeObjects(first, second) {
  const nameA = first.name.toUpperCase();
  const nameB = second.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
