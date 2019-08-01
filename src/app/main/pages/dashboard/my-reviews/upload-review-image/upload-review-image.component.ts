import {
  Component,
  OnInit,
  Input,
  NgZone,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Subscription } from 'rxjs/Subscription';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { CloudinaryService } from './cloudinary.service';

@Component({
  selector: 'upload-review-image',
  templateUrl: './upload-review-image.component.html',
  styleUrls: ['./upload-review-image.component.scss']
})
export class UploadReviewImageComponent implements OnInit, OnDestroy {
  @Input() responses: Array<any>;
  @Input() reviewPhoto: any;
  @Input() review: any;
  @Output() uploadCompleted: EventEmitter<any> = new EventEmitter();
  @Output() deleteReviewPhoto: EventEmitter<any> = new EventEmitter();

  uploadProgress;
  expandedElement: any;
  onResponseChangedSubscription: Subscription;
  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;

  constructor(
    private cloudinary: Cloudinary,
    private cloudinaryService: CloudinaryService,
    private zone: NgZone,
    private http: HttpClient
  ) {
    this.responses = [];
    this.cloudinaryService.onResponseChanged.next(this.responses);
  }

  ngOnInit(): void {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
      // additionalParameter:{
      //     return_delete_token: true
      // }
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // let tags = this.product.id.toString();
      // if (this.product.productName) {
      //     form.append('context', `photo=${this.product.id}:${this.product.productName}`);
      //     tags = `${this.product.id},${this.product.productName}`;
      // }
      form.append('folder', 'bieebox');
      // form.append('tags', tags);
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {
      this.uploadProgress = fileItem.progress;
      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          this.responses.push(fileItem);
        }
      });
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response)
      });
      this.cloudinaryService.onResponseChanged.next(this.responses);
      this.uploadCompleted.emit(this.responses);
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse({
        file: fileItem.file,
        progress,
        data: {}
      });
  }

  deleteImage = function (data: any, index: number) {
    const delete_token = data.deleteToken;
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers: headers };
    const body = {
      token: delete_token
    };
    this.http.post(url, body, options).subscribe(response => {
      // console.log(`Deleted image - ${data.public_id} ${response.result}`);
      console.log(`Deleted image -${response.result}`);
      this.responses.splice(index, 1);
      this.cloudinaryService.onResponseChanged.next(this.responses);
      this.loadProductImages();
    });
  };

  onDeleteReviewPhoto(event) {
    this.deleteReviewPhoto.emit(event);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties).map(key => ({ key: key, value: fileProperties[key] }));
  }

  onDeleteSelected(event) { }

  removeResponse(index) {
    this.responses.splice(index, 1);
    this.cloudinaryService.onResponseChanged.next(this.responses);
  }

  clearResponses() {
    this.cloudinaryService.onResponseChanged.next(false);
  }

  ngOnDestroy() {
    if (this.onResponseChangedSubscription) this.onResponseChangedSubscription.unsubscribe();
  }
}
