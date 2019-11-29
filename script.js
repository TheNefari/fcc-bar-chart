window.onload = updateSize();

function updateSize(){

const req = new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);
  const dataset = json.data;
  
  const w = 0.8*parseInt(d3.select("body").style("width"));
  const h = 500;
  const padding = 50;
  
    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
                  
const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([h-padding, padding]);
const xScale = d3.scaleLinear()
  .domain([0, dataset.length])
  .range([padding, w - padding]);
  
 const dateScale = d3.scaleTime()
    .domain([new Date(dataset[0][0]), new Date(dataset[274][0])])
    .range([padding, w - padding]);
  
  const tooltip = d3.select("#chart")
  .append("div")
  .attr("id","tooltip")
  .style("width",padding);
  
    svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d,i)=>xScale(i))
  .attr("y", (d)=>yScale(d[1]))
  .attr("width", w/dataset.length)
  .attr("height", (d)=>h-padding-yScale(d[1]))
  .attr("class","bar")
  .attr("data-date",(d)=>d[0])
  .attr("data-gdp",(d)=>d[1])
  
  .on("mouseover", (d, i) => tooltip
      .style("visibility", "visible")
      .attr("data-date",d[0])
      .html("<div>"+new Date(d[0]).getFullYear()+"</div><div>"+d[1]+" Billions</div>"))
      .on("mouseout", () => tooltip.style("visibility", "hidden"));
  
  
const xAxis = d3.axisBottom(dateScale);
svg.append("g")
  .attr("id","x-axis")
   .attr("transform", "translate(0, " + (h-padding) + ")")
   .call(xAxis)
  ;
  
const yAxis = d3.axisLeft(yScale);
svg.append("g")
  .attr("id","y-axis")
   .attr("transform", "translate(" + padding + ", 0)")
   .call(yAxis);  
};
}