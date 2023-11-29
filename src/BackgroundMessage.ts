export interface BackgroundMessage {}

export class SetIdMessage implements BackgroundMessage {
  /**
   * ロールID
   */
  roleId: string = "";

  constructor(roleId: string) {
    this.roleId = roleId;
  }
}

export class GetIdMessage implements BackgroundMessage {}
