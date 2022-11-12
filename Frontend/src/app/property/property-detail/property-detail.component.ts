import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
    public propertyId: number;
    public mainPhotoUrl: string = null;
    property = new Property();
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private housingService: HousingService) { }

    ngOnInit() {
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.data.subscribe(
            (data: Property) => {
                this.property = data['prp'];
                console.log(this.property.photos);
            }
        );

        this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);

        // this.route.params.subscribe(
        //   (params) => {
        //     this.propertyId = +params['id'];
        //     this.housingService.getProperty(this.propertyId).subscribe(
        //       (data: Property) => {
        //         this.property = data;
        //       }, error => this.router.navigate(['/'])
        //     );
        //   }
        // );

        this.galleryOptions = [
            {
                width: '100%',
                height: '465px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: true
            }
        ];

        this.galleryImages = this.getPropertyPhotos();
    }

    changePrimaryPhoto(mainPhotoUrl: string) {
        this.mainPhotoUrl = mainPhotoUrl;
    }

    getPropertyPhotos(): NgxGalleryImage[] {
        const photoUrls: NgxGalleryImage[] = [];
        for (const photo of this.property.photos) {
            if(photo.isPrimary)
            {
                this.mainPhotoUrl = photo.imageUrl;
            }
            else{
                photoUrls.push(
                    {
                        small: photo.imageUrl,
                        medium: photo.imageUrl,
                        big: photo.imageUrl
                    }
                );}
        }
        return photoUrls;
    }
}
