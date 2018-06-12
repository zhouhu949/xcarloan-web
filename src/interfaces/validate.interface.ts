export interface ValidateInterface {
  validate(): Promise<boolean>;
  reset()
  update()
}