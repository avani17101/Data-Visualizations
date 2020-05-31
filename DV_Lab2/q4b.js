var margin = { top: 20, right: 160, bottom: 35, left: 30 };
var ent = []
var height = 500 - margin.top - margin.bottom;
var width = 960 - margin.left - margin.right;
d3.csv("First.csv", function(data) {
    var datas = []
    var length = data.length
    for (var i = 0; i < data.length; i++) {

        var entries = {Name: data[i].Name, X2011: data[i].X2011, X2012: data[i].X2012, X2013: data[i].X2013 , Y2011: data[i].Y2011, Y2012: data[i].Y2012, Y2013: data[i].Y2013 ,R2011: data[i].R2011, R2012: data[i].R2012, R2013: data[i].R2013 };
        datas.push(entries)
        console.log(entries)

    }
    const render = fdatas => {
        var sv = d3.selectAll('svg').remove()


    var svg = d3.select(".bar")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var stackset = d3.layout.stack()(["X", "Y", "R"].map(function (da) {
            return fdatas.map(function (d) {
                console.log()
                return { x: d.Name, y: +d[da] };
            });
        }));
    var colors = ["b33040", "#d25c4d", "#f2b447", "#fff"];
    var x = d3.scale.ordinal()
    .rangeRoundBands([10, width - 10], 0.02)
    .domain(stackset[0].map(function (d) { return d.x; }));
    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(stackset, function (d) { 
            return d3.max(d, function (d) {
                 return d.y0 + d.y + 20;
                 }); })]);

    var xAxis = d3.svg.axis()
    .orient("bottom")
    .scale(x);
   
    
    var yAxis = d3.svg.axis()
    .orient("left")
    .scale(y)
    .tickSize(-width, 0, 0)
    .ticks(10)
    .tickFormat(function (d) { return d });

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var groups = svg.selectAll("g.yet")
    .data(stackset)
    .enter().append("g")
    .style("fill", function (d, i) { return colors[i]; })
    .attr("class", "yet");

var rect = groups.selectAll("rect")
    .data(function (d) { return d; })
    .enter()
    .append("rect")
    .attr("width", x.rangeBand())
    .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("x", function (d) { return x(d.x); })
    .attr("y", function (d) { return y(d.y0 + d.y); })
    .on("mouseover", function () { tooltip.style("display", null); })
    .on("mousemove", function (d) {
        var xpos = d3.mouse(this)[0] - 15;
        var ypos = d3.mouse(this)[1] - 25;
        tooltip.select("text").text(d.y);
        tooltip.attr("transform", "translate(" + xpos + "," + ypos + ")");
        
    })
    .on("mouseout", function () { tooltip.style("display", "none"); });

var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; })
    .attr("class", "legend");

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("x", width - 18)
    .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

legend.append("text")
    .attr("y", 9)
    .attr("x", width + 5)
    .attr("dy", ".35em")
    .text(function (d, i) {
        if(i==1) return "R"
        if(i==2) return "Y"
        if(i==3) return "X"

    })
    .style("text-anchor", "start");

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


}
    var flag = 0
        
    const loadpage = data =>{
        flag=1
        var fdatas = []


            for (var i = 0; i < data.length; i++) {
                fdatas.push({ Name: data[i].Name, X: data[i].X2011, Y:data[i].Y2011, R: data[i].R2011 })
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
                fdatas.push({ Name: data[i].Name, X: data[i].X2011, Y:data[i].Y2011, R: data[i].R2011}) 
                console.log(fdatas)
            }
           
            render(fdatas)
            //console.log(fdatas)

        }
        if (selected == 'X2012') {


            
            for (var i = 0; i < data.length; i++) {
                fdatas.push({ Name: data[i].Name, X: data[i].X2012, Y:data[i].Y2012, R: data[i].R2012}) 
                console.log(fdatas)
            }
           
           
            render(fdatas)
            console.log(fdatas)
        
        }
        if (selected == 'X2013') {


            
            for (var i = 0; i < data.length; i++) {
                fdatas.push({ Name: data[i].Name, X: data[i].X2013, Y:data[i].Y2013, R: data[i].R2011}) 
                console.log(fdatas)
            }
           
           
            render(fdatas)
            console.log(fdatas)
        
        }
    });

});




