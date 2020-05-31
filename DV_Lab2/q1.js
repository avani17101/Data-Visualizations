var svg = d3.select("svg");
var margin = 200;
var height = svg.attr("height") - margin;
var width = svg.attr("width") - margin;
var yScale = d3.scaleLinear().range([height, 0]);
var xScale = d3.scaleBand().range([0, width]).padding(0.4);
d3.csv("First.csv", function (data) {
    var length = data.length
    var datas = []
    for (var i = 0; i < data.length; i++) {
        var country = { Name: data[i].Name, X2011: data[i].X2011, X2012: data[i].X2012, X2013: data[i].X2013 };
        datas.push(country)

    }
    const render = fdatas => {
        yScale.domain([0, d3.max(fdatas, function (d) {
            var X = d.X;
            return (d.X);
        })]);
        xScale.domain(fdatas.map(function (d) { return d.Name; }));
        d3.selectAll("svg > *").remove();
        var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");
        var xaxis = g.append("g").call(d3.axisBottom().scale(xScale)).attr("transform", "translate(0," + height + ")");
        xaxis.append("text")
            .text("Country")
            .attr("x", 500)
            .attr("y", 50)
            .attr("stroke", "black")
            .attr("text-anchor", "end")
            .text("Countries")
            .attr("class","axis");
            
            
        var yaxis = g.append("g").call(d3.axisLeft().scale(yScale).tickFormat(function (d) {
            return d;
        }).ticks(20));
        yaxis.append("text")
            .attr("y", 8)
            .text("Population")
            .attr("dy", "-6.1em")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("stroke", "black")
            .attr("class","axis");
        var iud = 4   
        xaxis.selectAll("text").style("stroke", "black");
        xaxis.selectAll("line").style("stroke", "black");
        yaxis.selectAll("text").style("stroke", "black");
        yaxis.selectAll("line").style("stroke", "black");
        
        g.selectAll(".bar")
            .data(fdatas)
            .enter().append("rect")
            .attr("y", function (d) { return yScale(d.X); })
            .attr("x", function (d) { return xScale(d.Name); })
            .attr("class", "bar")
            .attr("height", function (d) { return height - yScale(+d.X); })
            .attr("width", xScale.bandwidth())
            .attr("id",function(){
                return iud--

            })
            
            .on("mouseover", function (d) {
                var Elid = this.id
                curel = document.getElementById(Elid)
                console.log(curel)
                curel.style.fill = "green"
    
                for (var i = Elid - 1; i >= 0; i--) {
                    var El = document.getElementById(i)
                    El.style.fill = "red";
                }
                return tooltip.style("visibility", "visible").text(d.Name + ": " + d.X).style("fill", "red");
            })
            .on("mouseout", function (d) {
                for (var i = 4; i >= 0; i--) {
                    var El= document.getElementById(i)
                    El.style.fill = "steelBlue";
                }
                return tooltip.style("visibility", "hidden");
            })
            .on("mousemove", function (d) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px").text(d.X+ ": " + d.Name);
            });

    }
    var flag = 0
    
    const loadpage = datas =>{
        flag=1
        var fdatas = []
            datas.sort(function (a, b) {
                
                if (a.X2011 > b.X2011) return -1;
                if (a.X2011 < b.X2011) return 1;
                return 0;
            });

            for (var i = 0; i < 5; i++) {
                fdatas.push({ Name: datas[i].Name, X: datas[i].X2011})
                //console.log(datas[i].Name)
            }

            render(fdatas)

    }
    if(flag==0){
        loadpage(datas)
    } 
        

    const buttons = d3.selectAll('input');
    var selected;
    buttons.on('change', function (d) {
        var fdatas = []
        selected = this.value
        if (selected == 'X2011') {
            datas.sort(function (a, b) {
                
                if (a.X2011 > b.X2011) return -1;
                if (a.X2011 < b.X2011) return 1;
                return 0;
            });

            for (var i = 0; i < 5; i++) {
                fdatas.push({ Name: datas[i].Name, X: datas[i].X2011})
                //console.log(datas[i].Name)
            }

            render(fdatas)

        }
        if (selected == 'X2012') {
            datas.sort(function (a, b) {
                if (a.X2012 > b.X2012) return -1;
                if (a.X2012 < b.X2012) return 1;
                
                return 0;
            });
            fdatas = []
            for (var i = 0; i < 5; i++) {
                fdatas.push({ Name: datas[i].Name, X: datas[i].X2012 })
                console.log(fdatas)
                //console.log(datas[i].Name)
            }

            render(fdatas)
        }
        if (selected == 'X2013') {
            datas.sort(function (a, b) {
                if (a.X2013 > b.X2013) return -1;
                if (a.X2013 < b.X2013) return 1;
                
                return 0;
            });
            fadats = []

            for (var i = 0; i < 5; i++) {
                fdatas.push({ Name: datas[i].Name, X: datas[i].X2013 })
                console.log(fdatas)
                //console.log(datas[i].Name)
            }
            render(fdatas)
        }
    });

    var tooltip = d3.select("body")
        .append("div")
        .style("font-size", "14px")
        .style("z-index", "10")
        .style("position", "absolute")
        .style("visibility", "hidden");
});




