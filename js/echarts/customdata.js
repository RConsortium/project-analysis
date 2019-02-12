d3.csv("https://raw.githubusercontent.com/RConsortium/project-analysis/master/projects.csv").then(function(data) {
   var cleandata = data.map(function(d) {
    var cleanD = {};
    d3.keys(d).forEach(function(k) {
      cleanD[_.trim(k)] = _.trim(d[k]);
    });
    return cleanD;
  });
  //console.log(cleandata);
   
   var numberproj = d3.nest()
  .key(function(d) { return d.PrimaryInvestigator;  })
  .rollup(function(v) { return v.length  })
  .entries(cleandata);
    
   dat5 = JSON.stringify(numberproj.sort(function(x, y){
   return d3.descending(x.value, y.value);
}) ).replace(/key/g, 'name');
  var parsedData = JSON.parse(dat5);
  var topselected =  [parsedData[0], parsedData[1],parsedData[2], parsedData[3], parsedData[4]];
   //console.log(dat5)
  var pinv = [];
   //var countsw = [];
   
   for(let i = 0, l = parsedData.length; i < l; i++) {
     if(i <= 4) {
    pinv.push(parsedData[i].name);
    //countsw.push(parsedData[i].value); 
     
    }
   }  
   //console.log(pinv)
      
var pii =echarts.init(document.getElementById("echart_pinv"));
pii.setOption({title:{text:"Top 5",subtext:"Grouped By Number of Projects"},color:["#4ca0c6", '#4f5b66','#65737e','#a7adba', '#d0b783'],tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{x:"center",y:"bottom",data: pinv },toolbox:{show:!0,feature:{magicType:{show:!0,type:["pie","funnel"]},restore:{show:!0,title:"Restore"},saveAsImage:{show:!0,title:"Save Image"}}},calculable:!0,series:[{name:"Number of Projects",type:"pie",radius:[45,140],center:["50%",180],roseType:"area",x:"50%",max:40,sort:"ascending",data: topselected }]})



var projamt = d3.nest()
  .key(function(d) { return d.PrimaryInvestigator;  })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }) })
  .entries(cleandata);
    
   dat6 = JSON.stringify(projamt.sort(function(x, y){
   return d3.descending(x.value, y.value);
}) ).replace(/key/g, 'name');
  var parsedData2 = JSON.parse(dat6);
  var topselectedamt =  [parsedData2[0], parsedData2[1],parsedData2[2], parsedData2[3], parsedData2[4]];

var pinvamt = [];
for(let i = 0, l = parsedData2.length; i < l; i++) {
    if(i <= 4) {
    pinvamt.push(parsedData2[i].name);
    }
}
var pii2 =echarts.init(document.getElementById("echart_pinv2"));
pii2.setOption({title:{text:"Top 5", subtext:"Grouped By Amount of Funding in USD"},color:['#4ca0c6', '#e0a899','#65737e','#a7adba', '#8b8589'],tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{x:"center",y:"bottom",data: pinvamt },toolbox:{show:!0,feature:{magicType:{show:!0,type:["pie","funnel"]},restore:{show:!0,title:"Restore"},saveAsImage:{show:!0,title:"Save Image"}}},calculable:!0,series:[{name:"Amount",type:"pie",radius:[45,140],center:["50%",180],roseType:"area",x:"50%",max:40,sort:"ascending",data: topselectedamt }]})

});





//--------------------------------------------------------------
if(false){
var ic=echarts.init(document.getElementById("invchart_donut3"));
ic.setOption({  title : {
        text: 'Top Primary Investigators',
        subtext: 'By Number of Projects and Funds Received',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',

data:['Kirill Muller','Edzer Pebesma','Gabor Csardi','Jeroen Ooms']

    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel']
            },
            restore : {show: true, title: "Restore"},
            saveAsImage : {show: true, title: "Save"}
        }
    },
    calculable : true,
    series : [
        {
            name:'Number of Projects',
            type:'pie',
            radius : [20, 110],
            center : ['25%', 200],
            roseType : 'radius',
            width: '40%',       // for funnel
            max: 40,            // for funnel
            itemStyle : {
                normal : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                },
                emphasis : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                }
            },
            data:[
                {value:4, name:'Kirill Muller'},
                {value:3, name:'Edzer Pebesma'},
                {value:2, name:'Gabor Csardi'},
                {value:2, name:'Jeroen Ooms'}                
            ]

        },
        {
            name:'Total Funds Received, $',
            type:'pie',
            radius : [30, 110],
            center : ['75%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:89000, name:'Kirill Muller'},
                {value:25000, name:'Edzer Pebesma'},
                {value:169500, name:'Gabor Csardi'},
                {value:74400, name:'Jeroen Ooms'}                
            ]

        }
    ]
})

} //end-if false
