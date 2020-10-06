d3.json("samples.json").then((data) => {
  //  Create the Traces
  console.log(data.names);
  var indiv = 953;
  console.log(data.names.indexOf(indiv.toString()));
  console.log(data.samples[0].otu_ids.slice(0,10));
  console.log(data.samples[0].sample_values.slice(0,10));
  var trace1 = {
    y: data.samples[0].otu_ids.slice(0,10).toString(),
    x: data.samples[0].sample_values.slice(0,10),
    type: "bar",
    orientation: 'h'
  };

  console.log(trace1);

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "otu_ids" },
    yaxis: { title: "sample_values" },
  };
  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
});
