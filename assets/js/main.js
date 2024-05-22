const beigneChart = () => {

    segmented = new RGraph.Segmented({
        id: 'cvs', //référencie le canvas dans lequel le graphique sera présenté
        max: 100,
        value: 70,
        options: {
            labelsCenterUnitsPost: '%',
            labelsCenterColor: '#aaa',
            responsive: [
                {maxWidth: null,width: 350,height: 350,options:{width: 55,labelsCenterSize: 60},parentCss:{'float':'right', textAlign:'none'}},
                {maxWidth: 700,width: 250,height: 250,options:{width: 40,labelsCenterSize: 45},parentCss:{'float':'none', textAlign:'center'}}
            ]
        }
    }).roundRobin({frames: 60});



    //
    // If the chart is clicked then adjust the value
    //
    segmented.canvas.addEventListener('click', function (e)
    {
        var value = segmented.getValue(e);
        
        if (value) {
            segmented.value = value;
            segmented.grow();
        }
    }, false);
}

const svgHorChart = () => {
    // The data for the chart
    data   = [70,80,60,50,40,80];
    
    // The labels for the chart. These labels are positioned on the
    // left-hand-side as normal and the data is also given as the
    // labelsAbove labels.
    labels = ['JavaScript','HTML','CSS','React','Ruby','Python'];

    // Create the HBar chart that becomes the gray backgrounds to
    // the bars. Note that all of the bits of data are set to one.
    // This means that all of the gray bars on the chart will be
    // as far right as it goes.
    bar_bg = new RGraph.SVG.HBar({
        id: 'chart-container',
        data: [1,1,1,1,1,1],
        options: {
            colors: ['gray'],
            xaxisScale: false,
            backgroundGrid: false,
            marginInner: 5,
            
            // If these aren't given then the marginLeftAuto will make
            // the left margin 0 when it actually needs to match the
            // other chart.
            yaxisLabels: labels, 
            
            // Don't want to see any text on the background chart.
            textColor: 'rgba(0,0,0,0)',

            // Add the labels that you can see on the right of the
            // chart.
            labelsAboveColor: 'white',
            labelsAboveSpecific: data,
            responsive: [
                {maxWidth: null, width: 500, height: 300, options: {textSize: 12},parentCss:{'float':'right', textAlign:'none'}},
                {maxWidth: 800, width: 400,  height: 250, options: {textSize: 10},parentCss:{'float':'none', textAlign:'center'}}
            ]
        }
    }).draw();


    // This is the orange HBar chart that you can see and which
    // represents the actual values.
    bar_fg = new RGraph.SVG.HBar({
        id: 'chart-container',
        data: data,
        options: {
            colors: ['orange'],
            textColor: 'white',
            yaxisLabels: labels,
            xaxisScale: false,
            backgroundGrid: false,
            marginInner: 5,
            responsive: [
                {maxWidth: null, width: 500, height: 300, options: {textSize: 12}},
                {maxWidth: 800, width: 400,  height: 250, options: {textSize: 10}}
            ]
        }
    
    // The orange chart uses the wave() effect.
    }).grow({callback: function ()
    {
        bar_bg.set('labelsAbove', true);
        RGraph.SVG.redraw();
    }});
}

beigneChart();
svgHorChart();