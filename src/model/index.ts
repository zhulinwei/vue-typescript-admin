export interface IMemuConfig {
  name: string,
  path: string,
  icon: string,
  hidden: boolean,
  children?: Array<IMemuConfig>
}
