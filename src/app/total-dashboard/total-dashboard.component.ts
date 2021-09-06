import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CovidCountService } from '../covid-count.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-total-dashboard',
  templateUrl: './total-dashboard.component.html',
  styleUrls: ['./total-dashboard.component.css']
})
export class TotalDashboardComponent implements AfterViewInit {
  totalConfirmedCases:number=0
  totalRecoveredCases:number=0
  totalReportedDeaths:number=0
  totalActiveCases:number=0;
  districts_counts:any[]=[]
  countryActiveCases:number=0
  totalActivePercent:number=0
  countryConfirmedCases:number=0
  totalConfirmedPercent:number=0
  table_counts:any[]=[]
  table_data:any[][]=[]
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  confirmed:any[]=[]
  recovered:any[]=[]
  deaths:any[]=[]
  public barChartData: ChartDataSets[] = [
    { data: this.confirmed , label: 'Confirmed' },
    { data: this.recovered, label: 'Recovered' }
  ];
  public barChartData_deaths: ChartDataSets[] = [
    { data: this.deaths , label: 'Deaths' }
  ];

  constructor(private _data:CovidCountService) { }
  @ViewChild('dataTable')
  table!: { nativeElement: any; };
  dataTable: any;
  dtOption: any = {};

  ngAfterViewInit(): void {
    this._data.getTotalCases()
    .subscribe((data:any)=>{
      var d= data['statewise']
      this.countryActiveCases=d[0].active
      this.countryConfirmedCases=d[0].confirmed
      console.log(d[0].active)
      var d= d.filter((res:any)=> res.statecode=="KL")
      this.totalActiveCases=d[0].active;
      this.totalConfirmedCases=d[0].confirmed;
      this.totalRecoveredCases=d[0].recovered;
      this.totalReportedDeaths=d[0].deaths;

      var that=this
    $(".progress").each(function() {
      that.totalActivePercent = Math.ceil(that.totalActiveCases/that.countryActiveCases*100);
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');
  
      if (that.totalActivePercent > 0) {
        if (that.totalActivePercent <= 50) {
          right.css('transform', 'rotate(' + that.percentageToDegrees(that.totalActivePercent) + 'deg)')
        } else {
          right.css('transform', 'rotate(180deg)')
          left.css('transform', 'rotate(' + that.percentageToDegrees(that.totalActivePercent - 50) + 'deg)')
        }
      }
  
    })
    $(".progress_confirmed").each(function() {
      that.totalConfirmedPercent = Math.ceil(that.totalConfirmedCases/that.countryConfirmedCases*100);
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');
  
      if (that.totalConfirmedPercent > 0) {
        if (that.totalConfirmedPercent <= 50) {
          right.css('transform', 'rotate(' + that.percentageToDegrees(that.totalConfirmedPercent) + 'deg)')
        } else {
          right.css('transform', 'rotate(180deg)')
          left.css('transform', 'rotate(' + that.percentageToDegrees(that.totalConfirmedPercent - 50) + 'deg)')
        }
      }
  
    })
    })

    this._data.getStateCases()
    .subscribe((states:any)=>{
      var districts= states.filter((res:any)=> res.statecode=="KL")
      districts[0].districtData.forEach((district:any) => {
        if(district["district"]!="Other State"){
          this.districts_counts.push(district)
        }
      });
      localStorage.setItem('district_counts',JSON.stringify(this.districts_counts))
      console.log(this.districts_counts)
      this.districts_counts.forEach((district)=>{
        this.barChartLabels.push(district.district)
        this.confirmed.push(district.confirmed)
        this.recovered.push(district.recovered)
        this.deaths.push(district.deceased)
        this.table_counts=[district.district,district.confirmed,district.recovered,district.deceased]
        this.table_data.push(this.table_counts)
        console.log(this.table_data)
      })
      this.dtOption = {
        "info":     true,
        "searching": true,
        "orderCellsTop": true,
        "fixedHeader": true,
        "dom": 'ltipr' ,
        "bPaginate" : false,
        "bInfo": false,
        //"colReorder": true,
        columnDefs: [
         { orderable: false, targets: 0 }
       ],
       data: this.table_data,
       columns: [
            { title: "District"},
            { title: "Confirmed" },
            { title: "Recovered" },
            { title: "Deaths" }
        ],
        
          "lengthChange": false
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOption);
    })
  }

  percentageToDegrees(percentage:any) {

    return percentage / 100 * 360

  }

}
