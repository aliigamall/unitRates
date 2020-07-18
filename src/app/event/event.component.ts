import tippy from "tippy.js";
import * as moment from "moment";
export class EventComponent {
  data;
  element;
  tooltipContent: string;
  editContent: string;
  eventDays: any[];
  startDate;
  endDate;
  editTippy;
  tooltip;
  format: string = "DD MMM YYYY";

  constructor(element, data) {
    this.data = data;
    this.element = element;
    this.startDate = this.data.item.time.start;
    this.endDate = this.data.item.time.end;
    this.setDays();
  }
  editTooltipMount(instance) {
    let popElement = instance.popper;
    let fromSelect = popElement.getElementsByClassName("form-select")[0];
    let endSelect = popElement.getElementsByClassName("end-select")[0];
    let labelInput = popElement.getElementsByClassName("label-input")[0];
    let saveBtn = popElement.getElementsByClassName("save")[0];
    let cancelBtn = popElement.getElementsByClassName("cancel")[0];
    saveBtn.addEventListener("click", e => this.onEventSave(e));
    cancelBtn.addEventListener("click", e => this.onEventCancel(e));
    fromSelect.addEventListener("change", e => {
      this.data.item.time.start = moment(e.target.value).valueOf();
    });
    endSelect.addEventListener("change", e => {
      this.data.item.time.end = moment(e.target.value).valueOf();
    });
    labelInput.addEventListener("change", e => {
      this.data.item.label = labelInput.value;
    });
  }

  onEventCancel(e) {
    this.editTippy.hide();
  }
  onEventSave(e) {
    this.data.api.time
      .date(this.data.item.time.start)
      .startOf("day")
      .valueOf();
    this.editTippy.hide();
    this.data.state.update(
      `config.chart.items.item:${this.data.item.id}`,
      this.data.item
    );
  }
  getDaysOptions(type): string {
    let options = "";
    let selectedOption = (type == 'end') ? this.eventDays.length : 0;
    this.eventDays.map((day, index) => {
      if(index == selectedOption - 1)
        options += `<option selected value="${day}">${day}</option> `;
      else
        options += `<option value="${day}">${day}</option> `;
    });
    return options;
  }
  setDays() {
    var dates = [];
    var currDate = moment(this.startDate).startOf("day");
    var lastDate = moment(this.endDate).endOf("day");
    dates.push(moment(currDate).format(this.format));
    while (currDate.add(1, "days").diff(lastDate) < 1) {
      dates.push(currDate.clone().format(this.format));
    }

    this.eventDays = dates;
  }
  setTippy() {
    this.tooltipContent = `
    <div class=''>
      <div class='tooltip__row row'>
        <div class='tooltip__cell col'>
          <span class='tooltip__label'>from</span>
          <span> ${moment(this.startDate).format(this.format)}</span>
        </div>
        <div class='tooltip__cell col'>
          <span class='tooltip__label'>to</span>
          <span> ${moment(this.endDate).format(this.format)}</span>
        </div>
      </div>
      <div class='tooltip__row row'>
        <div class='tooltip__cell col'>
          <span class='tooltip__label'>rate type</span>
          <span class='color-primary'> ${this.data.item.rateType}</span>
        </div>
      </div>
      <div class='tooltip__row row'>
        <div class='tooltip__cell col'>
          <span class='tooltip__label'>Rate</span>
          <span> ${this.data.item.label}</span>
        </div>
        <div class='tooltip__cell col'>
          <span class='tooltip__label'>Nights</span>
          <span> ${this.data.item.nights}</span>
        </div>
      </div>
    </div>`;
    this.editContent = `
    <div class=''>
      <div class='tooltip__row row'>
        <div class='tooltip__cell col-5'>
          <span class='tooltip__label'>from</span>
          <select class="tooltip__input form-control form-select"> ${this.getDaysOptions('start')} </select>
        </div>
        <div class='tooltip__cell col-5'>
          <span class='tooltip__label'>to</span>
          <select class="tooltip__input form-control end-select"> ${this.getDaysOptions('end')}</select>
        </div>
        <div class='tooltip__cell col-2'>
          <span class='tooltip__label'>Nights</span>
          <span> ${this.data.item.nights}</span>
        </div>
      </div>
      <div class='tooltip__row row'>
        <div class='tooltip__cell col-5'>
          <span class='tooltip__label'>rate type</span>
          <span> ${this.data.item.rateType}</span>
        </div>
        <div class='tooltip__cell col-5'>
          <span class='tooltip__label'>Rate</span>
          <span> <input class='tooltip__input form-control label-input' value='${this.data.item.label}'/> </span>
        </div>
        <div class='tooltip__cell col-2'>
          <span class='tooltip__label'>Min.</span>
          <span> ${this.data.item.min}</span>
        </div>
      </div>
      <div class='tooltip__row row'>
        <div class='tooltip__cell col-5'>
          <button class="btn btn-danger cancel">cancel</button>
        </div>
        <div class='tooltip__cell col-7'>
          <button class="btn btn-primary save">save</button>
        </div>
      </div>
    </div>`;
    this.tooltip = tippy(this.element, {
      arrow: false,
      content: this.tooltipContent,
      placement: "bottom",
      allowHTML: true
    });
    this.editTippy = tippy(this.element, {
      arrow: true,
      placement: "bottom",
      trigger: "click",
      content: this.editContent,
      allowHTML: true,
      interactive: true,
      appendTo: document.body,
      onMount: instance => this.editTooltipMount(instance)
    });
  }
  update(element, data) {
    this.data = data;
    this.element = element;
    this.startDate = data.item.time.start;
    this.endDate = data.item.time.end;
    this.setDays();
    this.setTippy();
  }

  destroy(element, data) {}
}
