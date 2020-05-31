var svg = d3.select("svg");
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 100
}

var width = 700 - margin.left - margin.right;
var height = 500;

var xScale = d3.scaleLinear().range([0, 800]);
var yScale = d3.scaleLinear().range([height, 0]);
d3.csv("First.csv", function (data) {
    console.log(data)
    var datas = []
    var length = data.length
    for (var i = 0; i < data.length; i++) {
        var cpoints = { X2011: data[i].X2011, X2012: data[i].X2012, X2013: data[i].X2013 , Y2011: data[i].Y2011, Y2012: data[i].Y2012, Y2013: data[i].Y2013 ,R2011: data[i].R2011, R2012: data[i].R2012, R2013: data[i].R2013 };
        datas.push(cpoints)
        console.log(cpoints)

    }
    const render = fdatas => {
        xScale.domain([0, d3.max(fdatas, function (d) {
            var X = d.X;
            console.log(X)
            return (X);
        })]);

        yScale.domain([0, d3.max(fdatas, function (d) {
            var Y = d.Y;
            console.log(Y)
            return (Y);
        })]);
        d3.selectAll("svg > *").remove();
        var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");
        var xaxis = g.append("g").attr("transform", "translate(" +0 + "," + 500 + ")").call(d3.axisBottom().scale(xScale).tickFormat(function (d) {
            return d;
        }).ticks(15));
        xaxis.append("text")
        .text("GDP per Capita")
        .attr("x", 500)
        .attr("y", 50)
        .attr("stroke", "black")
        .attr("text-anchor", "end")
        .attr("class","axis");
        
        
        
        var yaxis = g.append("g").call(d3.axisLeft().scale(yScale).tickFormat(function (d) {
            return d;
        }).ticks(15));
        yaxis.append("text")
        .attr("y", 8)
        .text("Life expentency")
        .attr("dy", "-6.1em")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("stroke", "black")
        .attr("class","axis");

        xaxis.selectAll("text").style("stroke", "black");
        yaxis.selectAll("text").style("stroke", "black");
        xaxis.selectAll("line").style("stroke", "black");
        yaxis.selectAll("line").style("stroke", "black");
        var iud = 4
        g.selectAll(".cir")
            .data(fdatas)
            .enter().append("circle")
            .attr("class", "cir")
            .attr("cx", function (d) { return xScale(d.X); })
            .attr("cy", function (d) { return yScale(d.Y); })
            .attr("r", function (d) { return d.R*3; })

            .on("mouseover", function (d) {
                d3.select(this).style("fill","green")
                return tooltip.style("visibility", "visible").text("X:"+ d.X + "\n Y: " + d.Y+ "\n R:" + d.R).style("fill", "red");
            })
            .on("mousemove", function (d) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px").text("X:"+ d.X + "\n Y: " + d.Y+ "\n R:" + d.R);
            })
            .on("mouseout", function (d) {
                d3.select(this).style("fill","steelblue")
                return tooltip.style("visibility", "hidden");
            });

    }
    var flag = 0
    
    const loadpage = data =>{
        flag=1
        var fdatas = []


            for (var i = 0; i < data.length; i++) {
                fdatas.push({ X: data[i].X2011, Y:data[i].Y2011, R: data[i].R2011})
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
                fdatas.push({ X: data[i].X2011, Y:data[i].Y2011, R: data[i].R2011})
                console.log(fdatas)
            }

            render(fdatas)

        }
        if (selected == 'X2012') {
            
            for (var i = 0; i < data.length; i++) {
                fdatas.push({ X: data[i].X2012, Y:data[i].Y2012, R: data[i].R2012})
               
            }

            render(fdatas)
        }
        if (selected == 'X2013') {

            for (var i = 0; i < data.length; i++) {
                fdatas.push({ X: data[i].X2011, Y:data[i].Y2013, R: data[i].R2013})
            }

            render(fdatas)
        }
    });

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("visibility", "hidden");
});




