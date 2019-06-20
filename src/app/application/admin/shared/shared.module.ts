import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';

@NgModule({
  // declarations: [ AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
  // exports:      [ AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
  providers: 	[ MenuItems ]
})
export class SharedModule { }
