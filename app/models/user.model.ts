import { Column, Model, Table } from 'sequelize-typescript'

@Table
export default class User extends Model {
  @Column
  name!: string

  @Column
  code!: string

  @Column
  password!: string
}
