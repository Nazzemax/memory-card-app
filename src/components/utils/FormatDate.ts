export function changeDateFormat(date: string) {
    return new Date(date).toLocaleDateString("rus");
  }