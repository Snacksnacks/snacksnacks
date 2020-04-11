// set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom: 30, left: 40},
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


const colorValue = d => d.filmGenre;

// beep boop read data from csv
d3.csv("https://raw.githubusercontent.com/Snacksnacks/snacksnacks.github.io/master/archfilm.csv", function(data){

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
    .attr("r", 7)
    .attr('fill', d => colorScale(colorValue(d)))

  });