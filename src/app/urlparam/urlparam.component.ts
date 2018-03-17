import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { PostComponent } from '../post/post.component';
import { WordPress } from '../providers/wordpress';

@Component({
    selector: 'app-urlparam',
    templateUrl: './urlparam.component.html',
    styleUrls: ['./urlparam.component.scss'],
})
export class UrlparamComponent implements OnInit, OnDestroy {
    public singlePost;
    public title;
    public catId
    private id : number;
    private route$ : Subscription;
    constructor(private route : ActivatedRoute, private wordpress: WordPress, private router: Router, private dialog: MdDialog) {}

    ngOnInit() {

        this.route$ = this.route.params.subscribe(
            (params : Params) => {
                this.id = +params["id"]; // cast to number
            }
        );
        this.wordpress.sharedpost(this.id).subscribe(resData => this.singlePost = resData);

        setTimeout(() => {

            this.title = this.singlePost.title.rendered
            this.catId = this.singlePost.categories[0]

            this.openDialog(this.id, this.title, this.catId);


        }, 250)
        // console.log(this.singlePost[10]["title"].rendered)
        // this.openDialog(this.id);
        //
        // console.log(this.service.sharedPostId);

    }
    ngOnDestroy() {
        if(this.route$) this.route$.unsubscribe();

    }

    openDialog(id, title, catId){
        let dialogRef:MdDialogRef<PostComponent> = this.dialog.open(PostComponent, {disableClose:true});
        dialogRef.componentInstance.id = id;
        console.log(this.title)
        dialogRef.componentInstance.catId = catId;
        dialogRef.componentInstance.title = title;
        this.router.navigate(['']);

        // console.log(title)
        // console.log(title)
    }


}
