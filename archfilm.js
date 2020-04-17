// set the dimensions and margins of the graph
var margin = {top: 20, right: 140, bottom: 30, left: 40},
    width = 500 - margin.left + margin.right,
    height = 400 - margin.top - margin.bottom;


// append the svg object to the id of the page
var svG = d3.select("#Scatterplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// beep boop read data from csv
var data = d3.csv("https://raw.githubusercontent.com/Snacksnacks/snacksnacks.github.io/master/archfilm.csv", function(data){


// add tooltip
var tooltip = d3.select("#Scatterplot").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// tooltip mouseover event handler
var tipMouseover = function(d) {
var html  = "<span style='color:" + colorScale(d.archStyle) + ";'>" + d.archSite + "</span> built in " + d.yearBuilt + "<br/>" +
            "<span style='color:" + colorScale(d.filmGenre) + ";'>" + d.film + "</span> released in " + d.yearFilmed + " <br/>" +
            "<b>";

    tooltip.html(html)
    .transition()
    .duration(100)
    .style("opacity", .9)
};

// tooltip mouseout event handler
var tipMouseout = function(d) {
    tooltip.transition()
    .duration(300)
    .style("opacity", 0);
};

// X scale and Axis
var x = d3.scaleLinear()
  .domain([1900,d3.extent(data, d=> d.yearFilmed)[1]]) // Min and max values of the x axis is from dataset
  .range([0, width]); // Define the x range based on the dimensions of the chart
svG
  .append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));


// Y scale and Axis
var y = d3.scaleLinear()
  .domain([1900,d3.extent(data, d=> d.yearBuilt)[1]]) // Min and max values of the y axis is from dataset
  .range([height, 0]); // Define the y range based on the dimensions of the chart
svG
  .append('g')
  .call(d3.axisLeft(y));

// assign colors
const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);


// change legend and plotted points when you click either buttons  
var plot = (data, svG) =>{
// add points
var circle = svG.selectAll('circle')
    .data(data);
circle
    .enter()
    .append("circle")
    .attr("cx", function(d){ return x(d.yearFilmed) })
    .attr("cy", function(d){ return y(d.yearBuilt) })
    .attr("r", 10)
    .attr('fill', d => colorScale(d.filmGenre))
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);    
// add legend
var rekt = svG.selectAll("rect")
                .data(data)
                .attr("class", "legend");
// display filmGenre legend colorsfirst
rekt
    .enter()
    .append('rect')
    .attr("x", width+20)
    .attr("transform", function(d, i) { return "translate(0, " + i * 20 + ")"; })
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", d => colorScale(d.filmGenre));
//display filmGenre text first
svG.selectAll("text.legend")
rekt.enter()
    .append("text")
    .attr("class", "legend") // create a class for legend text. so when you make changes to it, other text on this pg won't be affected
    .attr("y", 15)
    .attr("x", width+45)
    .attr("transform", function(d, i) { return "translate(0, " + i * 20 + ")"; })
    .text(function(d) {return d.filmGenre;})
// redraw the legend everytime you click either button
rekt
    .exit()
    .remove()
};
// when you click archStyl button, change dots + legend
var archStyl = () => {
    d3.selectAll('rect')
    .attr("fill", d => colorScale(d.archStyle))
    d3.selectAll('text.legend')
    .text(function(d) {return d.archStyle;});
    d3.selectAll("circle")
    .transition()
    .attr('fill', d => colorScale(d.archStyle)); 
    plot(data, svG);
};
// when you click archStyl button, change dots + legend
var filmGenr = () => {
    d3.selectAll('rect')
    .attr("fill", d => colorScale(d.filmGenre))
    d3.selectAll('text.legend')
    .text(function(d) {return d.filmGenre;});
    d3.selectAll("circle")
    .transition()
    .attr('fill', d => colorScale(d.filmGenre)); 
    plot(data, svG);
};

document.getElementById('archStyl').addEventListener('click', archStyl);
document.getElementById('filmGenr').addEventListener('click', filmGenr);

plot(data, svG);

});