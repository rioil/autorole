export class Role {
  radio: HTMLInputElement;
  button: HTMLButtonElement;
  id: string;
  affiliation: string;
  status: string;

  constructor(
    radio: HTMLInputElement,
    button: HTMLButtonElement,
    id: string,
    affiliation: string,
    status: string
  ) {
    this.radio = radio;
    this.button = button;
    this.id = id;
    this.affiliation = affiliation;
    this.status = status;
  }
}
