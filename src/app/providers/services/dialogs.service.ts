import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

/**
 * Provides a service for asking the user any confirmation, by opening a Dialog.
 */
@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string, okLabel: string = null): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmationComponent>;

        dialogRef = this.dialog.open(ConfirmationComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        
        if (okLabel) {
            dialogRef.componentInstance.okLabel = okLabel;
        }

        return dialogRef.afterClosed();
    }
}