import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PAcsService } from '../../../Services/PAcs/pacs.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {

  // Observable to listen changes on the documetns list
  public stateChange$ = new EventEmitter<any[]>();

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];

  // Creates the form to upload and valdiate input type file
  form: FormGroup;

  // manage variables aboy files to upload
  fileToUpload: File = null;
  fileName;

  // Save all the available documents to download
  public documentlist: any[];

  constructor(
    private httpService: HttpClient,
    private fb: FormBuilder,
    private pac: PAcsService
  ) {
    this.createForm();
  }

  ngOnInit() {
    //Observable subscribet to changes
    this.stateChange$.subscribe(() => {
      this.listDocuments();
    });

    // Gets all the documents available to download
    this.listDocuments();
  }
  // Creates the form and his validators
  createForm() {
    this.form = this.fb.group({
      document: ['', [Validators.required]],
    });
  }

  //Manage the file to be upload
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileName = this.fileToUpload.name;
  }

  // List the available documents to download
  public listDocuments() {
    this.pac.documentList().subscribe((result: any[]) => {
      this.documentlist = result;
    });
  }

  // Upload the actual document that the handleFileInput managed
  public uploadDocument() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor',
      });
      Swal.showLoading();
      this.pac
        .uploadDocuments(
          this.fileName,
          this.fileToUpload,
          this.fileName,
          localStorage.getItem('project_name'),
          localStorage.getItem('project_id')
        )
        .subscribe(
          (result) => {
            this.stateChange$.emit();
            Swal.close();
            Swal.fire(
              'Documento Subido',
              'El documento se subio con exito',
              'success'
            );
            this.form.reset();
          },
          (error) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              text: error,
              title: 'Error al subir el documento',
            });
          }
        );
    }
  }

  // Download the selected file
  public DownloadFile(url, name): void {
    this.pac.downloadDocuments(url).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
