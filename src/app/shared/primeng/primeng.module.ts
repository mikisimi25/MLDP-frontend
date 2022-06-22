import { NgModule } from '@angular/core';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import {MenubarModule} from 'primeng/menubar';

import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import {TabViewModule} from 'primeng/tabview';
import {PasswordModule} from 'primeng/password';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {PaginatorModule} from 'primeng/paginator';
import {ScrollTopModule} from 'primeng/scrolltop';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InplaceModule} from 'primeng/inplace';

@NgModule({
  exports: [
    CardModule,
    ImageModule,
    ButtonModule,
    ImageModule,
    ListboxModule,
    OverlayPanelModule,
    SplitButtonModule,
    ToastModule,
    MenubarModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ChipModule,
    TabViewModule,
    PasswordModule,
    InputSwitchModule,
    TooltipModule,
    PaginatorModule,
    ScrollTopModule,
    MessagesModule,
    MessageModule,
    InplaceModule
  ],
  providers: [ MessageService, ConfirmationService]
})
export class PrimengModule { }
