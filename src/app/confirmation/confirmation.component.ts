import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

/**
 * This class is just a template used by the class DialogsService.
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  /** Simple title for the Dialog. */
  public title: string;
  /** Message to be confirmed. */
  public message: string;
  /** A custom label for confirmation. */
  public okLabel: string = "Ok";

  constructor(public dialogRef: MdDialogRef<ConfirmationComponent>) { }

}
