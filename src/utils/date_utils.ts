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
}