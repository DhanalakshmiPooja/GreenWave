import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../shared/data.services';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-config',
  templateUrl: './task-config.component.html',
  styleUrls: ['./task-config.component.scss'],
})
export class TaskConfigComponent implements OnInit {
  form: FormGroup = new FormGroup({
    taskId: new FormControl(''),
    titlle: new FormControl(''),
    assignDate: new FormControl(''),
    dueDate: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(false),
  });
  submitted = false;
  action: any;
  taskDetails: any = [];
  taskId: any;
  title: any;
  description: any;
  assignDate: any;
  assignTo: any;
  dueDate: any;
  openTaskId: any;
  status: any;
  taskData = false;
  showMore: boolean[] = [false];
  today: any = new Date();
  searchText: any;
  tasksview: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');

    this.form = this.formBuilder.group({
      taskId: ['', Validators.required],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],

      assignDate: ['', Validators.required],
      description: ['', Validators.required],
      assignTo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      dueDate: ['', Validators.required],
      status: [''],
    });
    this.getTask();
  }

  onShow(i: any) {
    this.showMore[i] = !this.showMore[i];
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }

  search() {
    this.tasksview =
      this.searchText === ''
        ? this.taskDetails
        : this.taskDetails.filter((element: any) => {
            return element.title
              .toLowerCase()
              .includes(this.searchText.toLowerCase());
          });
  }

  getTask() {
    this.dataService.get('config/getTask').subscribe(
      (res: any) => {
        this.taskDetails = res['data'];
        this.tasksview = this.taskDetails;
      },
      (error: any) => {
        this.toastr.error(error.error['message']);
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  updateDueDateMin(selectedDate: any) {
    //To validate the Assigned date the Due date
    const today = new Date();
    const selectedDateObj = new Date(selectedDate.target.value);
    // If the selected date is in the past, set it to today
    if (selectedDateObj < today) {
      this.form
        .get('assignDate')
        ?.setValue(this.datePipe.transform(today, 'yyyy-MM-dd'));
    }
    // Set the minimum due date to the selected date
    this.form.get('dueDate')?.setValue(selectedDate);
  }

  pathValue(formGroup: FormGroup, data: any): void {
    const controls = formGroup.controls;
    for (const key in controls) {
      controls[key].patchValue(data[key]);
    }
  }
  openModal(template: any, data: any, id: any, act: any) {
    this.action = act;
    if (data) {
      this.pathValue(this.form, data);
    }

    this.openTaskId = id;
    this.modalService.open(template, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg',
    });
  }

  cancel() {
    this.submitted = false;
    this.form.reset();
    this.modalService.dismissAll();
  }

  delete(data: any) {
    // To delete the task

    this.dataService.delete('config/deleteTask/' + this.openTaskId).subscribe(
      (res: any) => {
        this.toastr.success('Task Successfully Deleted');
        this.getTask();
        this.modalService.dismissAll();
      },
      (error: any) => {
        this.toastr.error(error.error['message']);
      }
    );
  }

  statusData(data: any, $event: any) {
    //To Show the status of the task
    this.tasksview = [];
    let value = data.target.value;
    if (value == 'pending') {
      this.taskDetails.forEach((val: any) => {
        if (val.status == false) {
          this.tasksview.push(val);
        }
      });
      this.taskData = false;
    } else if (value == 'completed') {
      this.taskDetails.forEach((val: any) => {
        if (val.status == true) {
          this.tasksview.push(val);
        } else {
        }
      });
      this.taskData = true;
    } else {
      this.tasksview = this.taskDetails;
    }
  }

  onSubmit(): void {
    //To Submit the form
    this.submitted = true;
    if (this.action == 'add') {
      this.dataService.post('config/addTask', this.form.value).subscribe(
        (res: any) => {
          if (res) {
            this.getTask();
            this.cancel();
            this.toastr.success(res.message);
          }
        },
        (error: any) => {
          this.toastr.error(error.error['message']);
        }
      );
    } else {
      this.dataService
        .put('config/updateTask/' + this.openTaskId, this.form.value)
        .subscribe(
          (res: any) => {
            if (res) {
              this.cancel();
              this.getTask();
              this.toastr.success(res['data']);
            }
          },
          (error: any) => {
            this.toastr.error(error.error['message']);
          }
        );
    }
    if (this.form.invalid) {
      return;
    }
  }
}
