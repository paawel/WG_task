import { Component, OnInit } from '@angular/core';

const CONFIG = {
  ELEMENTS: 300
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  makeChoice;
  componentData;

  list = [];
  filteredList = [];
  selectedList = [];
  tempSelectedList = [];

  bufferObj: any = [];

  _createData(length) {
    let _arr = [];

    for (let i = 1; i <= length; i++) {
      _arr.push({
        name:`Элемент ${i}`,
        id: `el${i}`,
        value: i,
        selected: false,
        disabled: false
      });
    }

    return _arr;
  }

  _compareObjects(x, y) {
    let same = true;

    for(let prop in x) {
      if(x[prop].selected !== y[prop].selected) {
        same = false;
        break;
      }
    }

    return same;
  }

  _noRefObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  constructor() {
    this.componentData = {
      main: {
        button: {
          text: "Изменить мой выбор",
          action: this.showUpdateModal.bind(this),
          remove: "x"
        },
        selected: {
          text: "На данный момент элементов выбрано",
          makeChoice: "Сделайте свой выбор, нажмите кнопку ниже"
        },
        title: {
          text: "Выбор элементов"
        }
      },
      update: {
        container: {
          show: false
        },
        header: {
          text: "Диалог выбора элементов",
          button: {
            text: "X",
            action: this.cancelUpdate.bind(this)
          }
        },
        filter: {
          byName: "Поиск",
          select: {
            label: "Фильтр",
            options: [
              {name: "Без фильтра", val: 'noValue'},
              {name: "Номер > 10", val: '>10'},
              {name: "Номер > 100", val: '>100'},
              {name: "Номер > 200", val: '>200'}
            ]
          }
        },
        buttons: {
          save: {
            text: "Сохранить",
            action: this.saveUpdate.bind(this)
          },
          cancel: {
            text: "Отмена",
            action: this.cancelUpdate.bind(this)
          }
        },
        temporary: {
          text: "Выбранные элементы на данный момент:"
        }
      }
    }
  }

  ngOnInit() {
    this.list = this._createData(CONFIG.ELEMENTS);
    this.filteredList = this.list;
  }

  showUpdateModal() {
    this.filteredList = this.list;
    this.searchElement = '';
    this.componentData.update.container.show = true;
    this.tempSelectedList = this.getSelectedElements();
    this.bufferObj = this._noRefObject(this.list);
  }

  hideUpdateModal() {
    this.componentData.update.container.show = false;
  }

  saveUpdate() {
    this.selectedList = this.getSelectedElements();
    this.hideUpdateModal();
  }

  cancelUpdate() {
   if (!this._compareObjects(this.bufferObj, this.list)) {
     this.list = this._noRefObject(this.bufferObj);
   }
   this.hideUpdateModal();
  }

  selectElement(el) {
    el.selected = !el.selected;
    this.tempSelectedList = this.getSelectedElements();
    this.configDisabledFields();
  }

  getSelectedElements() {
    return this.list.filter(el => el.selected === true);
  }

  removeElementFromSelected(el, location) {
    el.selected = false;
    location === 'main' ? this.selectedList = this.getSelectedElements() : this.tempSelectedList = this.getSelectedElements();

    this.configDisabledFields();
  }

  configDisabledFields() {
    if (this.getSelectedElements().length == 3) {
      for(let i = 0; i < this.list.length; i++) {
        if (!this.list[i].selected) {
          this.list[i].disabled = true;
        }
      }
    } else {
      for(let i = 0; i < this.list.length; i++) {
        if (!this.list[i].selected) {
          this.list[i].disabled = false;
        }
      }
    }
  }

  //*** filter
  private _searchElement: string;
  selectedValue = 'noValue';

  get searchElement(): string {
    return this._searchElement;
  }

  set searchElement(value: string) {
    this._searchElement = value;
    this.filteredList = this.filterList(value);
  }

  filterList(search: string) {
    return this.list.filter(element => {
      return element.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    })
  }
  //filter ***
}
