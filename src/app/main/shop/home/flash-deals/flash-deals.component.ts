import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'flash-deals',
  templateUrl: './flash-deals.component.html',
  styleUrls: ['./flash-deals.component.scss']
})
export class FlashDealsComponent implements OnInit, OnDestroy {
  @Input() products;
  @Input() carousel;
  @Input() searching = false;
  @Input() error = '';
  @ViewChild('owlFlashDeals') owlElement: OwlCarousel;
  @Input('eventDate')
  eventDate;

  countdown: any;

  private _unsubscribeAll: Subject<any>;

  constructor() {
    this.countdown = {
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    };

    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    const currDate = moment();
    const eventDate = moment(this.eventDate);

    let diff = eventDate.diff(currDate, 'seconds');

    const countDown = interval(1000)
      .pipe(
        map(value => {
          return diff = diff - 1;
        }),
        map(value => {
          const timeLeft = moment.duration(value, 'seconds');

          return {
            days: timeLeft.asDays().toFixed(0),
            hours: timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
          };
        })
      );

    // Subscribe to the countdown interval
    countDown
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.countdown = value;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onPrevClick(event) {
    this.owlElement.trigger('prev.owl.carousel');
  }

  onNextClick(event) {
    this.owlElement.trigger('next.owl.carousel');
  }

  public productSlideConfig: any = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
    ]
  };
}
