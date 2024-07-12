export default class LocalStorageManager {
  public static getItem(key: string): any {
    return localStorage.getItem(key)
  }

  public static setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }
}
