import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs implements AfterViewInit {
  ngAfterViewInit() {
    this.initContactForm();
  }

  private initContactForm() {
    const form = $('#contactForm');
    if (!form.length) return;

    form.validate({
      submitHandler: (formEl: any) => {
        const $form = $(formEl);
        const name = $form.find('#name').val();
        const email = $form.find('#email').val();
        const subject = $form.find('#subject').val();
        const message = $form.find('#message').val();

        $.ajax({
          type: 'POST',
          url: '/php/form-process.php',
          data: { name, email, msg_subject: subject, message },
          success: (text: string) => {
            if (text === 'success') {
              $form[0].reset();
              $('#msgSubmit').removeClass().addClass('h3 text-center tada animated text-success').text('Message Submitted!');
            } else {
              $('#msgSubmit').removeClass().addClass('h3 text-center text-danger').text(text);
              $(formEl).removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => { $(formEl).removeClass(); });
            }
          }
        });
      }
    });
  }
}
