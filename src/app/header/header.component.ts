import { Component, OnInit } from '@angular/core';
import { CovidCountService } from '../covid-count.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _data:CovidCountService) { }
  districts:any[]=[]

  ngOnInit(): void {
    this._data.getStateCases()
    .subscribe((states:any)=>{
      var districts= states.filter((res:any)=> res.statecode=="KL")
      districts[0].districtData.forEach((district:any) => {
        if(district["district"]!="Other State"){
          this.districts.push(district.district)
        }
      });
    })
    console.log(this.districts)

 }
}
