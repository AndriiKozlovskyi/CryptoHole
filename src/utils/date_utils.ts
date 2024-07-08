export default class DateUtils {
    public static converNumberToWeekDay(day: number) {
        switch(day) {
            case 0:
                return "Mon";
            case 1:
                return "Tue";
            case 2:
                return "Wed";
            case 3:
                return "Thu";
            case 4:
                return "Fri";
            case 5:
                return "Sat";    
            case 6:
                return "Sun";  
        }
    }

    public static converDateToString(date: Date) {
        return date.toISOString().split('T')[0];
    }
}