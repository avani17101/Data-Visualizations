const svbr = d3.select('.bc')
const yscaleb = d3.scaleBand()
const widthb = +svbr.attr('width')
const xscaleb = d3.scaleLinear()
const heightb = +svbr.attr('height')
const margin = { top: 20, right: 20, bottom: 20, left: 100 }
var divb = d3.select("body").append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")


const renderR = data => {
    svbr.selectAll('text')
        .remove();
    svbr.selectAll('g').data(data)
        .exit()
        .remove();



    const valY = d => d.Name;
    const valX = d => d.datavals;
    const rectHeight = heightb - margin.top - margin.bottom - 4;
    const rectwidth = widthb - margin.left - margin.right;
    yscaleb.domain(data.map(valY)).range(
        [0, rectHeight]
    ).padding(0.2);
    xscaleb.domain([0, d3.max(data, valX)])
        .range([0, rectwidth])

    const g = svbr.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    yscaleb.domain(data.map(valY)).range(
        [0, rectHeight]
    ).padding(0.2);
    xscaleb.domain([0, d3.max(data, valX)])
        .range([0, rectwidth])

    const yAxis = d3.axisLeft(yscaleb)
    g.append('g').call(yAxis)
    const xAxis = d3.axisBottom(xscaleb)
    var num = 4
    g.append('g').call(xAxis).attr
        ('transform', `translate(${0},${rectHeight})`)


    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('id', function () {
            return num--
        })
        .attr('width', d => xscaleb(d.datavals))
        .attr('y', d => yscaleb(d.Name))
        .attr('height', yscaleb.bandwidth()).on("mouseover", function (d) {
            document.getElementById(d.Name).style.fill = "pink";
            document.getElementById(this.id).style.fill = "slateblue"
            divb.html("X:   " + d.Name + " <br/> " + "Y:   " + d.datavals)
                .style("top", (d3.event.pageY - 40) + "px")
                .style("left", (d3.event.pageX) + "px")
                ;
            divb.transition()
                .style("opacity", .9)
                .duration(200);

        })
        .on("mouseout", function (d) {
            document.getElementById(this.id).style.fill = "purple"
            document.getElementById(d.Name).style.fill = "black";
            divb.transition()
                .style("opacity", 0)
                .duration(500);
        });
}
var slectedb = 2011;
var top;
var entriesTop = [];
var topCountries = []
loadCircleData = (selected, data) => {
    var fdatas = []
    if (selected == 2011) {

        data.forEach(d => {
            d.YY = d.Y2011
            d.XX = d.X2011
            d.RR = d.R2011

        })

    }
    if (selected == 2012) {

        data.forEach(d => {
            d.YY = d.Y2012
            d.XX = d.X2012
            d.RR = d.R2012


        })

    }

    if (selected == 2013) {

        data.forEach(d => {
            d.YY = d.Y2013
            d.XX = d.X2013
            d.RR = d.R2013
        })

    }
    render(data)
}
loadRectData = (slectedb, data) => {
    topCountries = []
    entriesTop = []
    var fdatas = []
    //console.log(data)
    if (slectedb == 2011) {
        data = data.sort(function(a, b){
            if (a.X2011 > b.X2011) return -1;
            if (a.X2011 < b.X2011) return 1;
            return 0;
        });
        data = data.slice(0,5)
        

        data.forEach(d => {
            d.datavals = +d.X2011
        })
    
        //console.log(data)
        for (i = 0; i < 5; i++) {
            console.log(data[i])
            topCountries.push(data[i].Name)
            entriesTop.push(data[i].datavals)


        }
    }
    else if (slectedb == 2012) {

        data = data.sort(function(a, b){
            if (a.X2012 > b.X2012) return -1;
            if (a.X2012 < b.X2012) return 1;
            return 0;
        });
        data = data.slice(0,5)



        data.forEach(d => {
            d.datavals = d.X2012
        })


        topCountries = []
        for (i = 0; i < 5; i++) {
            console.log(data[i])
            topCountries.push(data[i].Name)
            entriesTop.push(data[i].datavals)


        }
    }
    else if (slectedb == 2013) {


        data = data.sort(function(a, b){
    
            if (a.X2013 > b.X2013) return -1;
            if (a.X2013 < b.X2013) return 1;
            return 0;
        });
        data = data.slice(0,5)
    
        data.forEach(d => {
            d.datavals = d.X2013
        })

        for (i = 0; i < 5; i++) {
            console.log(data[i])
            topCountries.push(data[i].Name)
            entriesTop.push(data[i].datavals)
        }
    }
    renderR(data)
}

const svg = d3.select('.sp')
var selected = 2011;
const height = svg.attr('height')
const width = svg.attr('width')

var div = d3.select("body").append("div")
    .style("opacity", 0)
    .attr("class", "tooltip");

const yscale = d3.scaleBand()
const xscale = d3.scaleLinear()
const yscale2 = d3.scaleLinear()
const render = data => {
    svg.selectAll('text')
        .remove();
    var tick = svg.selectAll('line').remove()
    svg.selectAll('g').data(data)
        .exit()
        .remove();
    const valY = d => d.Name;
    var valX = d => d.XX;

    const innerHeight = height - margin.top - margin.bottom - 4;
    const innerwidth = width - margin.left - margin.right;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    yscale2.domain([0, d3.max(data, d => d.YY)])
        .range([innerHeight, 0])
    const yAxis = d3.axisLeft(yscale2)
    xscale.domain([0, d3.max(data, valX)])
        .range([0, innerwidth])
    const xAxis = d3.axisBottom(xscale)
    yscale.domain(data.map(valY)).range(
        [0, innerHeight]
    ).padding(0.2);
    
    
    g.append('g').call(xAxis).attr
        ('transform', `translate(${0},${innerHeight})`)
    g.append('g').call(yAxis)

    var num = 20
    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('id', function () {
            return num--
        })
        .attr('r', d => d.RR * 2).on("mouseover", function (d) {
            var no = 0
            document.getElementById(this.id).style.fill = "slateblue"
            for (i in entriesTop) {
                var ton = 1
                if (entriesTop[4 - i] == d.XX && topCountries[4 - i] == d.Name) {
                    document.getElementById(i).style.fill = "slateblue"
                    break;
                }
                    no++
            }
            if (no == 5) {
                no = 0
                var ton = 0
                for (i = 0; i < 5; i++) {
                    document.getElementById(i).style.fill = "gold"
                }
            }

            div.html("X: " + d.XX + " <br/> " + "Y: " + d.YY + " <br/> " + "Name: " + d.Name)
                .style("top", (d3.event.pageY - 40) + "px")
                .style("left", (d3.event.pageX) + "px");
            div.transition()
                .style("opacity", .9)
                .style("fill", 'pink')
                .duration(200);

        })
        .attr('cx', d => xscale(d.XX))
        .attr('id', d => d.Name)
        .attr('cy', d => yscale2(d.YY))
        .on("mouseout", function (d) {
            document.getElementById(this.id).style.fill = "black"
            for (i = 0; i < 5; i++) {
                document.getElementById(i).style.fill = "purple"
            }
            div.transition()
                .style("opacity", 0)
                .duration(500);
        });
}


d3.csv('./First.csv').then((data) => {


    loadCircleData(2011, data)
    var slider = d3.select('#yearb');
    loadRectData(2011, data)

    slider.on('change', function name() {
        selected = this.value;
        svg.selectAll('circle').data(data).remove()
        loadCircleData(selected, data)
        svbr.selectAll('rect').data(data).remove()
        slectedb = this.value;
        loadRectData(slectedb, data)

    });



});




