import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
declare const convertir:any;
@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css'],
})
export class ExcelsheetComponent implements OnInit {
  nro_hoja:number=0;
  arrayBuffer:any
  file:File=null
  filelist:any[];
products=["Arroz", "Huevo"]
  data: [][];
  data2:any[][]=new Array()
  @ViewChild('dt') table: Table;
  displayBasic: boolean;

  corte:any;
 
  showBasicDialog(corte) {
    this.corte=corte
  
    this.displayBasic = true;
  }
  guardar(){
    console.log(this.corte);
    
    this.displayBasic = false;
  }

  constructor() {
    this.corte={
      NOMBRE:'',
      HORA:'',
      LECTURA:''
    }
   }

  ngOnInit(): void {
  }
  fileToUpload: File = null;
  
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  console.log(file.item.length)
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      console.log(event.target.result);
      
    }
    reader.readAsDataURL(this.fileToUpload);
    
    console.log(this.fileToUpload.name)
  }

  onPhotoSelected(event: HtmlInputEvent): void {
  
    if (event.target.files && event.target.files[0]) {//verificando si por lomenos esta subiendouna foto
      this.file = <File>event.target.files[0];//archivo de excel guardado en file
      // image preview
      const reader = new FileReader();//lee un archivo
      reader.onload = e =>
      {
      let data = e.target.result;
      console.log(data);
      
       console.log(reader.result);

     convertir()
      }
       //console.log(reader.result);
       //llena photoselect con el resultado que esta leendo

      reader.readAsDataURL(this.file);
      console.log(this.file.name)


      var url = this.file.name
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  console.log(worksheet);
  
  console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));

    
    
    }
  }

  addfile(event)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[this.nro_hoja];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = XLSX.utils.sheet_to_json(worksheet,{raw:true});        
            console.log(this.filelist)    
    
  }    
} 
  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      let x = this.data.slice(1);
      this.data2=x
      console.log(x);
      var edades = ["uno", "  dos ", "tres "];



var mayores = edades.filter((edad)=> {
  return edad.includes("s");
});
console.log(mayores);
// mayores = [18, 19];
var cadena = "  hola mundo   ";

console.log(
  cadena.includes("mundo")
);

console.log(
  cadena.indexOf("no esta") > -1
);
    };

    reader.readAsBinaryString(target.files[0]);

  }
  mayorEdad(edad) {
    return edad >= 18;
 }
 cadena:string=" bb "
 filroGlobal(e){
  var incognita = " Hola como estas "
  console.log(incognita.length);
  incognita=incognita.replace(/ /g, "")
  console.log(incognita.replace(/ /g, ""));
  console.log(incognita.length);
   console.log(this.data2[0][6])
   let c=0;
   for(let i=0;i<this.data2.length;i++)
   {
     for(let j=0;j<7;j++){
       if(j==6)
       {
      let cadena=this.data2[i][j]
      console.log( typeof cadena === "number")


       if(cadena==e){
      c++

       }
      }
     }

   }
console.log(c);


 }
 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.filelist);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "cortes");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
}
