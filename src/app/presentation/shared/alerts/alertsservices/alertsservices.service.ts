import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(public router: Router, private http: HttpClient) {
      }






  alertError(){
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your account has been deleted.',
            'success'
          ).then(() => resolve(true))
        } else {
          resolve(false)
        }
      })
    })
  }
  

 alertOk(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'success OK!',
    icon: 'success',
    confirmButtonColor: '#3085d6',

    confirmButtonText: 'Yeah! all went well!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {  
      this.router.navigate(['/user/profile']);

    }
      
    } 
    )
  } }