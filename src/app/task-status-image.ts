import {
  Directive,
  Input,
  HostBinding,
  OnChanges
} from '@angular/core';

@Directive({
  selector: '[appTaskStatusImage]',
})
export class TaskStatusImage implements OnChanges {

  @Input() taskStatus: string = '';

  @HostBinding('attr.src')
  imageSource = 'assets/not-started.svg';

  ngOnChanges() {
    if (this.taskStatus === 'Completed') {
      this.imageSource = 'assets/completed.svg';
    } else if (this.taskStatus === 'In Progress') {
      this.imageSource = 'assets/in-progress.svg';
    } else {
      this.imageSource = 'assets/not-started.svg';
    }
  }
}
