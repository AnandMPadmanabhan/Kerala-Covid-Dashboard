import { Component, OnInit } from '@angular/core';
import { CovidCountService } from '../covid-count.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-state-wisedashboard',
  templateUrl: './state-wisedashboard.component.html',
  styleUrls: ['./state-wisedashboard.component.css']
})
export class StateWisedashboardComponent implements OnInit {
  district={
   district:""
  }
  value:Number=0
  districts_counts:any[]=[]

  constructor(private data:CovidCountService) { }

  ngOnInit(): void {
    this.data.getStateCases()
    .subscribe((states:any)=>{
      var districts= states.filter((res:any)=> res.statecode=="KL")
      districts[0].districtData.forEach((district:any) => {
        if(district["district"]!="Other State"){
          this.districts_counts.push(district)
        }
      });
      localStorage.setItem('district_counts',JSON.stringify(this.districts_counts))
      console.log(this.districts_counts)
    })
    var that=this;
    $(".progress").each(function() { 
     var value = 80
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');
  
      if (value > 0) {
        if (value <= 50) {
          right.css('transform', 'rotate(' + that.percentageToDegrees(value) + 'deg)')
        } else {
          right.css('transform', 'rotate(180deg)')
          left.css('transform', 'rotate(' + that.percentageToDegrees(value - 50) + 'deg)')
        }
      }
    });
  }
  percentageToDegrees(percentage:any) {

    return percentage / 100 * 360

  }

}
