export interface BackgroundMessage {
  /**
   * メッセージの種類
   */
  type: string;
}

export class SetIdMessage implements BackgroundMessage {
  type: string = "SetIdMessage";

  /**
   * ロールID
   */
  roleId: string = "";

  constructor(roleId: string) {
    this.roleId = roleId;
  }
}

export class GetIdMessage implements BackgroundMessage {
  type: string = "GetIdMessage";
}
