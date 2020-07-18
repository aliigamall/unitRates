import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { GSTCComponent } from "angular-gantt-schedule-timeline-calendar";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, GSTCComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  providers: [],
  entryComponents: []
})
export class AppModule {}
