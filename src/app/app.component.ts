import { Component, OnInit } from "@angular/core";
import { EventComponent } from "./event/event.component";

@Component({
  selector: "app-root",
  template:
    '<div><gstc [config]="config" (onState)="onState($event)"></gstc></div>'
})
export class AppComponent implements OnInit {
  title = "ng-gstc-test";

  config: any;
  gstcState: any;

  ngOnInit() {
    const iterations = 10;

    // GENERATE SOME ROWS
    const bedIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="13.838" height="16" viewBox="0 0 13.838 16"><defs><style>.a{fill:#a2735e;}.b{fill:#916754;}.c{fill:#825c4b;}.d{fill:#f2f3f3;}.e{fill:#e8e9ea;}.f{fill:#6cb6de;}.g{fill:#61a3c7;}</style></defs><path class="a" d="M37.109,9.575H24.875V.971A.905.905,0,0,1,25.7,0H36.288a.905.905,0,0,1,.82.971Zm0,0" transform="translate(-24.073)"/><path class="b" d="M37.1,209.339a2.138,2.138,0,0,0-1.6-.757H26.47a2.138,2.138,0,0,0-1.6.757v1.638H37.1Zm0,0" transform="translate(-24.069 -202.168)"/><path class="c" d="M77.865,50.684a.238.238,0,0,1-.212-.258V44.5a.17.17,0,0,0-.151-.184H69.242a.17.17,0,0,0-.151.184v5.929a.216.216,0,1,1-.423,0V44.5a.647.647,0,0,1,.574-.7H77.5a.647.647,0,0,1,.574.7v5.929A.238.238,0,0,1,77.865,50.684Zm0,0" transform="translate(-66.453 -42.29)"/><path class="d" d="M122.745,103.229h-4.722a.914.914,0,0,1-.777-1.006V98.361a.914.914,0,0,1,.777-1.006h4.722a.914.914,0,0,1,.777,1.006v3.862A.914.914,0,0,1,122.745,103.229Zm0,0" transform="translate(-113.465 -94.467)"/><path class="e" d="M117.246,208.582v1.04a.914.914,0,0,0,.777,1.006h4.722a.914.914,0,0,0,.777-1.006v-1.04Zm0,0" transform="translate(-113.465 -202.151)"/><path class="f" d="M11.489,241.9H2.349a2.784,2.784,0,0,1,0-5.5h9.141a2.784,2.784,0,0,1,0,5.5Zm0,0" transform="translate(0 -229.35)"/><path class="g" d="M12.549,308.7H1.29a1.373,1.373,0,0,1-1.275-1.281c-.009.1-.015.2-.015.3a2.573,2.573,0,0,0,2.349,2.749h9.141a2.573,2.573,0,0,0,2.349-2.749c0-.1-.005-.2-.015-.3A1.373,1.373,0,0,1,12.549,308.7Zm0,0" transform="translate(0 -298.019)"/><path class="a" d="M0,365.846v4.113a.437.437,0,0,0,.4.467h.79a.437.437,0,0,0,.4-.467,1.793,1.793,0,0,1,1.637-1.917h7.389a1.793,1.793,0,0,1,1.637,1.917.437.437,0,0,0,.4.467h.789a.437.437,0,0,0,.4-.467v-4.113a.437.437,0,0,0-.4-.467H.4a.437.437,0,0,0-.4.467Zm0,0" transform="translate(-0.004 -354.426)"/></svg>';
    const rows = {
      "1": {
        id: "1",
        type: `${bedIcon} Single Room`,
        unit: "512",
        parentId: undefined,
        expanded: false
      }
    };
    const dayLen = 24 * 60 * 60 * 1000;

    // GENERATE SOME ROW -> ITEMS

    const items = {
      "0": {
        id: 1,
        label: "120",
        rateType: "normal - base",
        nights: "5",
        min: "80",
        time: {
          start: new Date().getTime(),
          end: new Date().getTime() + 5 * dayLen
        },
        style: { background: "#0E5E81" },
        rowId: "1"
      },
      "1": {
        id: 2,
        label: "100",
        rateType: "normal - base",
        nights: "5",
        min: "80",
        time: {
          start: new Date().getTime() + 5 * dayLen,
          end: new Date().getTime() + 10 * dayLen
        },
        style: { background: "#2EA3DC" },
        rowId: "1"
      },
      "2": {
        id: 3,
        label: "120",
        rateType: "normal - base",
        nights: "5",
        min: "80",
        time: {
          start: new Date().getTime() + 10 * dayLen,
          end: new Date().getTime() + 15 * dayLen
        },
        style: { background: "#38810E" },
        rowId: "1"
      },
      "3": {
        id: 4,
        label: "150",
        rateType: "normal - base",
        nights: "5",
        min: "80",
        time: {
          start: new Date().getTime() + 15 * dayLen,
          end: new Date().getTime() + 20 * dayLen
        },
        style: { background: "#77BD43" },
        rowId: "1"
      }
    };

    const columns = {
      data: {
        type: {
          id: "type",
          data: "type",
          width: 200,
          isHTML: true,
          expander: false,
          header: {
            content: "Type"
          }
        },
        unit: {
          id: "unit",
          data: "unit",
          expander: false,
          header: {
            content: "Unit"
          }
        }
      }
    };

    this.config = {
      toggle:{
        display: false
      },
      list: {
        rows,
        columns,
        resizer: {
          width: 0,
          dots: 0
        },
        toggle: {
          display: false
        }
      },
      chart: {
        items
      },

      actions: { "chart-timeline-items-row-item": [EventComponent] },
      components: {}
    };
  }

  // GET THE GANTT INTERNAL STATE

  onState(state) {
    this.gstcState = state;

    // YOU CAN SUBSCRIBE TO CHANGES
    this.gstcState.subscribe("config.list.rows", rows => {
      console.log("rows changed", rows);
    });

    this.gstcState.subscribe(
      "config.chart.items.:id",
      (bulk, eventInfo) => {
        if (eventInfo.type === "update" && eventInfo.params.id) {
          const itemId = eventInfo.params.id;
          console.log(
            `item ${itemId} changed`,
            this.gstcState.get("config.chart.items." + itemId)
          );
        }
      },
      { bulk: true }
    );
  }

  changeFrom() {
    const from = new Date().getTime() + 24 * 60 * 60 * 1000 * 4;
    this.gstcState.update("config.chart.time.from", from);
  }
}
