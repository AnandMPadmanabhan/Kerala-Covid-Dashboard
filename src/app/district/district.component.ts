import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { CovidCountService } from '../covid-count.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  total_counts:any={}
  districts_count:any[]=[]
  district_chart:any[]=[]
  active_percent:any=0
  confirmed_percent:any=0
  death_percent:any=0
  recovered_percent:any=0
  dist:string=""


  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Others'],['Alappuzha']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#008080', '#AEEEEE']
 }];

  constructor(private _data:CovidCountService,private route: ActivatedRoute) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.dist=this.route.snapshot.paramMap.get('district')!
    this._data.getTotalCases()
    .subscribe((data:any)=>{
      var d= data['statewise']
      var d= d.filter((res:any)=> res.statecode=="KL")
      this.total_counts=d[0]
      console.log(this.total_counts)
      var retrievedData= localStorage.getItem('district_counts')
    this.districts_count=JSON.parse(retrievedData!)
    console.log(this.districts_count)
    var district_count=this.districts_count.filter((district)=>{
       return district.district==this.dist
    })
    console.log(district_count)
   // this.pieChartData.push(this.total_counts.active)
   // this.pieChartData.push(district_count[0].active)
    console.log(this.pieChartData)
    var active_chart={
      cases:"Active Cases",
      pieChartLabels:[['Others'],[this.dist]],
      pieChartData:[this.total_counts.active-district_count[0].active,district_count[0].active],
      pieChartType:this.pieChartType,
      pieChartLegend:this.pieChartLegend,
      pieChartPlugins:this.pieChartPlugins,
      pieChartColors:this.pieChartColors,
      percent: (district_count[0].active/this.total_counts.active*100).toFixed(2)
    }
    var confirmed_chart={
      cases:"Confirmed Cases",
      pieChartLabels:[['Others'],[this.dist]],
      pieChartData:[this.total_counts.confirmed-district_count[0].confirmed,district_count[0].confirmed],
      pieChartType:this.pieChartType,
      pieChartLegend:this.pieChartLegend,
      pieChartPlugins:this.pieChartPlugins,
      pieChartColors:this.pieChartColors,
      percent: (district_count[0].confirmed/this.total_counts.confirmed*100).toFixed(2)
    }
    var death_chart={
      cases:"Death Cases",
      pieChartLabels:[['Others'],[this.dist]],
      pieChartData:[this.total_counts.deaths-district_count[0].deceased,district_count[0].deceased],
      pieChartType:this.pieChartType,
      pieChartLegend:this.pieChartLegend,
      pieChartPlugins:this.pieChartPlugins,
      pieChartColors:this.pieChartColors,
      percent:(district_count[0].deceased/this.total_counts.deaths*100).toFixed(2)
    }
    var recovered_chart={
      cases:"Recovered Cases",
      pieChartLabels:[['Others'],[this.dist]],
      pieChartData:[this.total_counts.recovered-district_count[0].recovered,district_count[0].recovered],
      pieChartType:this.pieChartType,
      pieChartLegend:this.pieChartLegend,
      pieChartPlugins:this.pieChartPlugins,
      pieChartColors:this.pieChartColors,
      percent:(district_count[0].recovered/this.total_counts.recovered*100).toFixed(2)
    }
    this.district_chart.push(active_chart)
    this.district_chart.push(confirmed_chart)
    this.district_chart.push(death_chart)
    this.district_chart.push(recovered_chart)
    this.active_percent= (district_count[0].active/this.total_counts.active*100).toFixed(2)
    this.confirmed_percent= (district_count[0].confirmed/this.total_counts.confirmed*100).toFixed(2)
    this.recovered_percent= (district_count[0].recovered/this.total_counts.recovered*100).toFixed(2)
    this.death_percent= (district_count[0].deceased/this.total_counts.deaths*100).toFixed(2)
    })
    
  }

}
