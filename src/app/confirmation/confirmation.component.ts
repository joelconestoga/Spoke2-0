import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  public title: string;
  public message: string;
  public okLabel: string = "Ok";

  constructor(public dialogRef: MdDialogRef<ConfirmationComponent>) { }

}
