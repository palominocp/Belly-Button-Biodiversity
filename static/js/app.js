d3.json("samples.json").then((data) => {

    // Populate the DOM select element
    var select = document.getElementById("selDataset");
    for (i = 0; i < data.names.length; i++) {
        var option = document.createElement("option");
        option.text = data.names[i];
        select.appendChild(option);
    };

    // Show sample for first individual (index = 0)
    var index = 0;
    var topOtuids = data.samples[index].otu_ids.slice(0,10);
    var yvalues = topOtuids.map(item => {
        return "OTU " + item.toString();
    });

    // Bar chart
    var trace1 = {
        y: yvalues.reverse(),
        x: data.samples[index].sample_values.slice(0,10).reverse(),
        type: "bar",
        orientation: 'h'
    };

    var data_bar = [trace1];

    // Define the plot layout
    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "otu_ids" },
        yaxis: { title: "sample_values" }
    };

    // Plot the chart to "bar" div
    Plotly.newPlot("bar", data_bar, layout);
    
    // Bubble chart
    var trace2 = {
        x: data.samples[index].otu_ids,
        y: data.samples[index].sample_values,
        mode: 'markers',
        marker: {
            size: data.samples[index].sample_values,
            color: data.samples[index].otu_ids
        }
    };

    var data_bubble = [trace2];

    var layout = {
        title: 'Bubble chart',
    }

    // Plot the chart to "bubble" div
    Plotly.newPlot('bubble', data_bubble, layout);

    d3.selectAll('h6').remove();
    d3.select(".panel-body").insert("h6").text("id: " + data.metadata[index].id);
    d3.select(".panel-body").insert("h6").text("ethnicity: " + data.metadata[index].ethnicity);
    d3.select(".panel-body").insert("h6").text("gender: " + data.metadata[index].gender);
    d3.select(".panel-body").insert("h6").text("age: " + data.metadata[index].age);
    d3.select(".panel-body").insert("h6").text("location: " + data.metadata[index].location);
    d3.select(".panel-body").insert("h6").text("bbtype: " + data.metadata[index].bbtype);
    d3.select(".panel-body").insert("h6").text("wfreq: " + data.metadata[index].wfreq);

});

// Run updatePlotly function whenever there is a new selection
d3.selectAll("#selDataset").on("change", updatePlotly);
  
function updatePlotly() {

    // Get the selected value
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

    d3.json("samples.json").then((data) => {

        // Get the index of selected sample
        var index = data.names.indexOf(dataset.toString());
        var topOtuids = data.samples[index].otu_ids.slice(0,10);
        var yvalues = topOtuids.map(item => {
            return "OTU " + item.toString();
        });
        
        // Bar chart
        var trace1 = {
            y: yvalues.reverse(),
            x: data.samples[index].sample_values.slice(0,10).reverse(),
            type: "bar",
            orientation: 'h'
        };

        // Create the data array for the plot
        var data_bar = [trace1];

        // Define the plot layout
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "otu_ids" },
            yaxis: { title: "sample_values" }
        };

        // Plot the chart to "bar" div
        Plotly.newPlot("bar", data_bar, layout);
    
        // Bubble chart
        var trace2 = {
            x: data.samples[index].otu_ids,
            y: data.samples[index].sample_values,
            mode: 'markers',
            marker: {
                size: data.samples[index].sample_values,
                color: data.samples[index].otu_ids
            }
        };

        var data_bubble = [trace2];

        var layout = {
            title: 'Bubble chart',
        }

        // Plot the chart to "bubble" div
        Plotly.newPlot('bubble', data_bubble, layout);

    d3.selectAll('h6').remove();
    d3.select(".panel-body").insert("h6").text("id: " + data.metadata[index].id);
    d3.select(".panel-body").insert("h6").text("ethnicity: " + data.metadata[index].ethnicity);
    d3.select(".panel-body").insert("h6").text("gender: " + data.metadata[index].gender);
    d3.select(".panel-body").insert("h6").text("age: " + data.metadata[index].age);
    d3.select(".panel-body").insert("h6").text("location: " + data.metadata[index].location);
    d3.select(".panel-body").insert("h6").text("bbtype: " + data.metadata[index].bbtype);
    d3.select(".panel-body").insert("h6").text("wfreq: " + data.metadata[index].wfreq);
  });
};
