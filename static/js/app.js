d3.json("samples.json").then((data) => {
  //  Create the Traces
  var trace1 = {
    x: data.names,
    y: data.metadata.map(val => Math.sqrt(val)),
    type: "box",
    name: "Cancer Survival",
    boxpoints: "all"
  };

  console.log(trace1);
  // Create the data array for the plot
  var data = [trace1];
  console.log(data);

  // Define the plot layout
  var layout = {
    title: "Square Root of Cancer Survival by Organ",
    xaxis: { title: "Organ" },
    yaxis: { title: "Square Root of Survival" },
    plot_bgcolor: "#000"
  };
  
  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
});
