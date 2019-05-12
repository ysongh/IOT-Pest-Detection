var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    changeColor = false,
    list = ["green", "yellow", "orange", "red", "#9aea6b", "#deef5d", "#efcc5c", "#d8806a"];

var link123 = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";
d3.json(link123, function(error, nyc) {
  if (error) throw error;

  nycData = nyc;

  var path = d3.geoPath()
      .projection(d3.geoConicConformal()
      .parallels([33, 45])
      .rotate([96, -39])
      .fitSize([width, height], nyc));

  svg.selectAll("path")
      .data(nyc.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) {
        switch(d.properties.borough){
          case 'Queens':
            return 'pink';
          case 'Bronx':
            return "green";
          case 'Brooklyn':
            return "red";
          case 'Manhattan':
            return 'orange';
          default:
            return 'black';
        }
        return d.properties.borough === 'Queens' ? "blue": "black"
      })
      .on("mouseenter", function(d) {
        console.log(d);
      d3.select(this)
      .style("stroke-width", 1.5)
      .style("stroke-dasharray", 0)

      d3.select("#neighborhoodPopover")
      .transition()
      .style("opacity", 1)
      .style("color", (d.properties.borough === 'Queens' ? "blue": "black"))
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px")
      .text(d.properties.neighborhood + " "+ d.properties.boroughCode)
    })
    .on("mouseleave", function(d) { 
      d3.select(this)
      .style("stroke-width", .25)
      .style("stroke-dasharray", 1)

      d3.select("#cneighborhoodPopoverountyText")
      .transition()
      .style("opacity", 0);
    });

    console.log(nyc);
});

window.setInterval(function(){
  changeColor = !changeColor;
  svg.selectAll("path")
      .style("fill", function(d) {
        let num = Math.floor((Math.random() * 8));
        return list[num];
      })
}, 2000);