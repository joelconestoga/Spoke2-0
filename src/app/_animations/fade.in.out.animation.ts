import { trigger, state, animate, style, transition, AnimationEntryMetadata } from '@angular/core';

export const fadeInOutAnimation: AnimationEntryMetadata =
  trigger('fadeInOutAnimation', [
    state('*',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in')
    ]),
    transition(':leave', [
      animate('50ms ease-out', style({ opacity: 0 }))
    ])
  ]);