interface BackgroundMessage {}

class SetIdMessage implements BackgroundMessage {
  /**
   * ロールID
   */
  roleId: string = "";

  constructor(roleId: string) {
    this.roleId = roleId;
  }
}

class GetIdMessage implements BackgroundMessage {
  /**
   * ロールID
   */
  roleId: string = "";

  constructor(roleId: string) {
    this.roleId = roleId;
  }
}
