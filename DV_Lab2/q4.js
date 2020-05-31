var margin = {top: 20, right: 20, bottom: 30, left: 40};
var height = 900 - margin.top - margin.bottom;
var width = 960 - margin.left - margin.right;
    
var x1 = d3.scale.ordinal();
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var color = d3.scale.ordinal()
    .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);
var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");


var svg = d3.select('body').append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("First.csv", function(data) {
    var datas = []
    var length = data.length
    for (var i = 0; i < data.length; i++) {

        var entries = {Name: data[i].Name, X2011: data[i].X2011, X2012: data[i].X2012, X2013: data[i].X2013 , Y2011: data[i].Y2011, Y2012: data[i].Y2012, Y2013: data[i].Y2013 ,R2011: data[i].R2011, R2012: data[i].R2012, R2013: data[i].R2013 };
        datas.push(entries)
        //console.log(entries)

    }
    var rateNames = ['X','Y','R'];
    var categoriesNames = data.map(function(d) { return d.Name; });
    //console.log(categoriesNames)
    //console.log(rateNames)
    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);


    
    //y domain is max of all X,Y,R values
   


    const render = fdatas => {
        y.domain([0, 90]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(xAxis);
      
        svg.append("g")
            .style('opacity','0')
            .attr("class", "y axis")
            .call(yAxis)
        .append("text")
            .attr("y", 6)
            .attr("transform", "rotate(-90)")
            .attr("dy", ".71em")
            .attr("transform", "rotate(-90)")
            .style('font-weight','bold')
            .style("text-anchor", "end")
            
        
      
        svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
      
        var slice = svg.selectAll(".slice")
            .data(fdatas)
            .enter().append("g")
            .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; })
            .attr("class", "g");
      
        slice.selectAll("rect")
            .data(function(d) { return d.values; })
             .enter().append("rect")
            .style("fill", function(d) { return color(d.rate) })
            .attr("width", x1.rangeBand())
            .attr("y", function(d) { return y(0); })
            .attr("height", function(d) { return height - y(0); })
            .attr("x", function(d) { return x1(d.rate); })
            
            
            .on("mouseover", function(d) {
                tooltip.style("display", null);
                d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));

            })
            .on("mousemove", function (d) {
                var xpos = 0;
                var ypos = d3.mouse(this)[1];
                //console.log(xpos, d.rate)
                tooltip.select("text").text(d.value)
                tooltip.attr("transform", "translate(" + xpos + "," + ypos + ")");
                
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");
                d3.select(this).style("fill", color(d.rate));
            });
      
        slice.selectAll("rect")
            .attr("y", function(d) { return y(d.value); })
            
            .transition()
            .duration(1000)
            .delay(function (d) {return Math.random()*1000;})
            .attr("height", function(d) { return height - y(d.value); });
      
        //Legend
        var legend = svg.selectAll(".legend")
            .data(fdatas[0].values.map(function(d) {console.log(d.rate)
                 return d.rate; }).reverse())
        .enter().append("g")
            .style("opacity","0")
            .attr("class", "legend")
            .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; });
      
        legend.append("rect")
            .attr("height", 18)
            .style("fill", function(d) { return color(d); })
            .attr("x", width - 18)
            .attr("width", 18);
      
        legend.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .attr("y", 9)
            .attr("x", width - 24)
            .text(function(d) {return d; });
      
        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
    }
    var flag = 0
    
    const loadpage = data =>{
        flag=1
        var fdatas = []


            for (var i = 0; i < data.length; i++) {
                fdatas.push({categorie:data[i].Name,values:[{value: data[i].X2011, rate:'X'}, {value:data[i].Y2011, rate:'Y'}, {value: data[i].R2011, rate:'R' }] })
                //console.log(datas[i].Name)
            }

            render(fdatas)

    }
    if(flag==0){
        loadpage(data)
    } 
    const buttons = d3.selectAll('input');
    var selected;
    buttons.on('change', function (d) {
        var fdatas = []
        selected = this.value
        if (selected == 'X2011') {


            for (var i = 0; i < data.length; i++) {
                fdatas.push({categorie:data[i].Name,values:[{value: data[i].X2011, rate:'X'}, {value:data[i].Y2011, rate:'Y'}, {value: data[i].R2011, rate:'R' }] } )
                //console.log(fdatas)
            }
           
            render(fdatas)
            //console.log(fdatas)

        }
        if (selected == 'X2012') {


            for (var i = 0; i < data.length; i++) {
                fdatas.push({categorie:data[i].Name,values:[{value: data[i].X2012, rate:'X'}, {value:data[i].Y2012, rate:'Y'}, {value: data[i].R2012, rate:'R' }] } )
                //console.log(fdatas)
            }
           
            render(fdatas)
            //console.log(fdatas)
        
        }
        if (selected == 'X2013') {


            for (var i = 0; i < data.length; i++) {
                fdatas.push({categorie:data[i].Name,values:[{value: data[i].X2013, rate:'X'}, {value:data[i].Y2013, rate:'Y'}, {value: data[i].R2013, rate:'R' }] } )
                //console.log(fdatas)
            }
           
            render(fdatas)
            //console.log(fdatas)
        
        }
    });


    var tooltip = svg.append("g")
    .style("display", "none")
    .attr("class", "tooltip");

    tooltip.append("text")
    .style("text-anchor", "middle")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
    
    tooltip.append("rect")
    .style("opacity", 0.5)
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    ;
});




