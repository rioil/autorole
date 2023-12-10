export interface BackgroundMessage {
  /**
   * メッセージの種類
   */
  type: string;
}

/**
 * デフォルトのロールIDを設定するメッセージ
 */
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

/**
 * デフォルトのロールIDを取得するメッセージ
 */
export class GetIdMessage implements BackgroundMessage {
  type: string = "GetIdMessage";
}

/**
 * ロールID不一致/未設定時に最初のロールを選択するかどうかを設定するメッセージ
 */
export class GetIsSelectFirstMessage implements BackgroundMessage {
  type: string = "GetIsSelectFirstMessage";
}
