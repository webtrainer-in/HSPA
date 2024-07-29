import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/model/Photo';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
    @Input() property: Property;
    @Output() mainPhotoChangedEvent = new EventEmitter<string>();
    @Output() photosChangedEvent = new EventEmitter();

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean;
    baseUrl = environment.baseUrl;
    maxAllowedFileSize=1*1024*1024;

    uploaderProgressBarPercentage=0;
    filesCounter: number;

    response: string;

    constructor(private housingService: HousingService, private alertify: AlertifyService) {

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    initializeFileUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl +'/property/add/photo/'+ String(this.property.id),
            authToken: 'Bearer '+ localStorage.getItem('token'),
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: true,
            maxFileSize:this.maxAllowedFileSize
        });

        this.uploader.onAfterAddingFile = (file) => {
            this.filesCounter++;
            file.withCredentials = false;
        };

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const photo = JSON.parse(response);
                this.property.photos.push(photo);
                this.photosChangedEmitterEvent();
            }
            this.uploaderProgressBarPercentage = Math.floor((this.filesCounter - this.uploader.getReadyItems().length)/(this.filesCounter)*100);
        };

        this.uploader.onErrorItem = (item, response, status, headers) => {
            let errorMessage = 'Some unknown error occured';
            if (status===401) {
                errorMessage ='Your session has expired, login again';
            }

            if (response) {
                errorMessage = response;
            }

            this.alertify.error(errorMessage);
        };

        this.uploader.onCompleteAll = () => {
            this.uploaderProgressBarPercentage, this.filesCounter = 0;
        };
    }

    mainPhotoChanged(url: string){
        this.mainPhotoChangedEvent.emit(url);
    }

    photosChangedEmitterEvent() {
        this.photosChangedEvent.emit();
    }

    ngOnInit(): void {
        this.initializeFileUploader();
        this.uploaderProgressBarPercentage, this.filesCounter = 0;
    }

    setPrimaryPhoto(propertyId: number, photo: Photo) {
        this.housingService.setPrimaryPhoto(propertyId,photo.publicId).subscribe(()=>{
            this.mainPhotoChanged(photo.imageUrl);
            this.property.photos.forEach(p => {
                if (p.isPrimary) {p.isPrimary = false;}
                if (p.publicId === photo.publicId) {p.isPrimary = true;}
            });
        });
    }

    deletePhoto(propertyId: number, photo: Photo) {
        this.housingService.deletePhoto(propertyId,photo.publicId).subscribe(()=>{
            this.property.photos = this.property.photos.filter(p =>
                p.publicId !== photo.publicId);
            this.photosChangedEmitterEvent();
        });
    }

}
