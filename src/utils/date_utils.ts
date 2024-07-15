export default class DateUtils {
  public static converNumberToWeekDay(day: number) {
    switch (day) {
      case 1:
        return 'Mon'
      case 2:
        return 'Tue'
      case 3:
        return 'Wed'
      case 4:
        return 'Thu'
      case 5:
        return 'Fri'
      case 6:
        return 'Sat'
      case 0:
        return 'Sun'
    }
  }

  public static stringToDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  public static formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const offset = -date.getTimezoneOffset();
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
  };
}
