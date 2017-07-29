"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.fadeInOutAnimation = core_1.trigger('fadeInOutAnimation', [
    core_1.state('*', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
    core_1.transition(':enter', [
        core_1.style({ opacity: 0 }),
        core_1.animate('300ms ease-in')
    ]),
    core_1.transition(':leave', [
        core_1.animate('50ms ease-out', core_1.style({ opacity: 0 }))
    ])
]);
//# sourceMappingURL=fade.in.out.animation.js.map