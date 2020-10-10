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
    console.log(data.samples[indx].otu_ids.slice(0,10));
    console.log(data.samples[indx].sample_values.slice(0,10));
    console.log(data.samples[indx].otu_labels.slice(0,10));
    var yvalues = data.samples[indx].otu_ids.slice(0,10);
    var yvaluesf = yvalues.map(item => {
      return "OTU " + item.toString();
    });
    var trace1 = {
      y: yvaluesf.reverse(),
      x: data.samples[indx].sample_values.slice(0,10).reverse(),
      type: "bar",
      orientation: 'h'
    };

    console.log(trace1);

    // Create the data array for the plot
    var data_bar = [trace1];

    // Define the plot layout
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "otu_ids" },
      yaxis: { title: "sample_values" }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data_bar, layout);
    
    console.log(indiv);
    console.log(data.names.indexOf(indiv.toString())); // indx

    var trace2 = {
      x: data.samples[indx].otu_ids,
      y: data.samples[indx].sample_values,
      mode: 'markers',
      marker: {
        size: data.samples[indx].sample_values
        // color: data.samples[indx].otu_ids
      }
    };

    var data_bubble = [trace2];

    var layout = {
        title: 'Bubble chart',
    }

    Plotly.newPlot('bubble', data_bubble, layout);

    d3.selectAll('h6').remove();
    d3.select(".panel-body").insert("h6").text("id: " + data.metadata[indx].id);
    d3.select(".panel-body").insert("h6").text("ethnicity: " + data.metadata[indx].ethnicity);
    d3.select(".panel-body").insert("h6").text("gender: " + data.metadata[indx].gender);
    d3.select(".panel-body").insert("h6").text("age: " + data.metadata[indx].age);
    d3.select(".panel-body").insert("h6").text("location: " + data.metadata[indx].location);
    d3.select(".panel-body").insert("h6").text("bbtype: " + data.metadata[indx].bbtype);
    d3.select(".panel-body").insert("h6").text("wfreq: " + data.metadata[indx].wfreq);
  });
};