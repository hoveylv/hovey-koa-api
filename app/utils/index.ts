export function randomStr(length: number): string {
  /**
   * 默认去除容易混淆的字符 Oo,Ll,9gq,Vv,Uu,Ii
   */
  const seeder = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let random = ''
  for (let i = 0; i < length; i++) {
    random += seeder.charAt(Math.floor(Math.random() * seeder.length))
  }
  return random
}
