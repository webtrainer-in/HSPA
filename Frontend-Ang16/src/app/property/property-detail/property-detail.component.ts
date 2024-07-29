import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/app/model/property';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
    public propertyId?: number;
    public mainPhotoUrl: string | null = null;
    property = new Property();

    slides!: { image: string }[];

    itemsPerSlide!: number;
    singleSlideOffset = true;
    noWrap = false;

    slidesChangeMessage = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private housingService: HousingService) { }

    ngOnInit() {
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.data.subscribe({
            next: data => {
                this.property = data['prp'] as Property;
            }
        }      
        );

        this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn as string);

        this.route.params.subscribe(
            (params) => {
              this.propertyId = +params['id'];
              this.housingService.getProperty(this.propertyId).subscribe({
                  next: data => {
                      this.property = data as Property;
                    },              
                error: error => this.router.navigate(['/'])
                  });
            }
          );

          this.slides = this.getPropertyPhotos();  
    }

    changePrimaryPhoto(mainPhotoUrl: string) {
        this.mainPhotoUrl = mainPhotoUrl;
    }

    onPhotosChange() {
      this.slides = this.getPropertyPhotos();
    }

    getPropertyPhotos(): { image: string }[] {
        const photoUrls: { image: string }[] = [];
        for (const photo of this.property.photos!) {
          if (photo.isPrimary) {
            this.mainPhotoUrl = photo.imageUrl;
          } else {
            photoUrls.push({ image: photo.imageUrl });
          }
        }
        return photoUrls;
      }
}
