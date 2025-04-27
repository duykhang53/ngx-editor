import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { BubbleComponent } from './components/bubble/bubble.component';
import { NgxEditorComponent } from './editor.component';
import {
  NgxEditorService,
  NgxEditorServiceConfig,
  provideMyServiceOptions,
} from './editor.service';
import { MenuComponent } from './modules/menu/menu.component';
import { MenuModule } from './modules/menu/menu.module';
import { MenuService } from './modules/menu/menu.service';
import { NgxEditorConfig } from './types';

const NGX_EDITOR_CONFIG_TOKEN = new InjectionToken<NgxEditorConfig>('NgxEditorConfig');

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
  ],
  providers: [],
  declarations: [
    NgxEditorComponent,
    BubbleComponent,
  ],
  exports: [
    NgxEditorComponent,
    MenuComponent
  ]
})

export class NgxEditorModule {
  static forRoot(config: NgxEditorConfig): ModuleWithProviders<NgxEditorModule> {

    return {
      ngModule: NgxEditorModule,
      providers: [
        {
          provide: NGX_EDITOR_CONFIG_TOKEN,
          useValue: config
        },
        {
          provide: NgxEditorServiceConfig,
          useFactory: provideMyServiceOptions,
          deps: [NGX_EDITOR_CONFIG_TOKEN]
        }
      ]
    };
  }

  static forChild(config: NgxEditorConfig): ModuleWithProviders<NgxEditorModule> {
    return {
      ngModule: NgxEditorModule,
      providers: [
        {
          provide: NGX_EDITOR_CONFIG_TOKEN,
          useValue: config
        },
        {
          provide: NgxEditorServiceConfig,
          useFactory: provideMyServiceOptions,
          deps: [NGX_EDITOR_CONFIG_TOKEN]
        },
        MenuService,
        NgxEditorService,
      ]
    };
  }
}
