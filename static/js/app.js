d3.json("samples.json").then((data) => {
  var newSelect = document.getElementById("selDataset");
  for (index = 0; index < data.names.length; index++) {
    var opt = document.createElement("option");
    opt.text = data.names[index];
    //opt.innerHTML = element; // whatever property it has

    // then append it to the select element
    newSelect.appendChild(opt);
  };
});

// then append the select to an element in the dom
d3.selectAll("#selDataset").on("change", updatePlotly);
  
function updatePlotly() {
  var dropdownMenu = d3.select("#selDataset");
  var dataset = dropdownMenu.property("value");

  d3.json("samples.json").then((data) => {

    //  Create the Traces
    //console.log(data.names);
    var indiv = dataset;
    var indx = data.names.indexOf(indiv.toString());
    console.log(indiv);
    console.log(indx);
     console.log(data.samples[indx].otu_ids.slice(0,10));
     console.log(data.samples[indx].sample_values.slice(0,10));
     var trace1 = {
       y: data.samples[indx].otu_ids.slice(0,10).toString(),
       x: data.samples[indx].sample_values.slice(0,10),
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
      yaxis: { title: "sample_values" }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
  });
};