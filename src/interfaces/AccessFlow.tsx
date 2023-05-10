import Role from './Role'
import Type from './Type'

export default interface AccessFlow {
  id: number,
  reclamationType: Type,
  approve: Role[],
  consult: Role[],
  create: Role[],
  notify: Role[],
  validate: Role[],
  dateCreation?: any
  dateModification?: any
}