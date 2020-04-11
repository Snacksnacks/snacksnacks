// set the dimensions and margins of the graph
var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// append the svg object to the id of the page
var svG = d3.select("#Scatterplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

const colorValue = d => d.archStyle;



// beep boop read data from csv
d3.csv("https://raw.githubusercontent.com/Snacksnacks/snacksnacks.github.io/master/archfilm.csv", function(data){

// Add tooltip
// it's invisible and its position/contents are defined during mouseover
var tooltip = d3.select("#Scatterplot").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// tooltip mouseover event handler
var tipMouseover = function(d) {
var color = colorScale(d.archStyle);
var html  = "<span style='color:" + color + ";'>" + d.archSite + "</span> built in " + d.yearBuilt + "<br/>" +
            d.film + "</b> released in " + d.yearFilmed + "</span><br/>" +
            "<b>";

tooltip.html(html)
    .style("left", (d3.event.pageX + 15) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
    .transition()
    .duration(200) // ms
    .style("opacity", .9) // started as 0!

              };
// tooltip mouseout event handler
var tipMouseout = function(d) {
    tooltip.transition()
        .duration(300) // ms
        .style("opacity", 0); // don't care about position!
};

// X scale and Axis
var x = d3.scaleLinear()
  .domain([1900,d3.extent(data, d=> d.yearFilmed)[1]]) // Min and max values of the x axis is from dataset
  .range([0, width]); // Define the x range based on the dimensions of the chart
  // .format("04d");
  
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

  const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);

// Add dots
svG
  .selectAll("whatever")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return x(d.yearFilmed) })
    .attr("cy", function(d){ return y(d.yearBuilt) })
    .attr("r", 10)
    .attr('fill', d => colorScale(colorValue(d)))
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);

  });