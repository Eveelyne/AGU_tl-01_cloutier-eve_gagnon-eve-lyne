
//GRAPHIQUE 1
const beigneChart = () => {
    segmented = new RGraph.Segmented({
        id: 'cvs',
        max: 100,
        value: 15,
        options: {
            labelsCenterUnitsPost: '%',
            labelsCenterColor: '#6C733D',
            responsive: [
                {maxWidth: null, width: 350, height: 350, options: {width: 80, labelsCenterSize: 40}, parentCss: {'float': 'right', textAlign: 'none'}},
                {maxWidth: 700, width: 250, height: 250, options: {width: 50, labelsCenterSize: 25}, parentCss: {'float': 'none', textAlign: 'center'}}
            ]
        }
    }).roundRobin({frames: 40});

    segmented.canvas.addEventListener('click', function (e) {
        var value = segmented.getValue(e);
        /*if (value) {
            segmented.value = value;
            segmented.grow();
        }*/
    }, false);
}

//GRAPHIQUE 2
const svgHorChart = () => {
    data = [90, 42, 40, 31, 25];
    labels = ['Randonnée', 'Baignade/plage', 'Camping (tente)', 'Vélo', 'Camping (VR)'];

    bar_bg = new RGraph.SVG.HBar({
        id: 'chart-container',
        data: [1, 1, 1, 1, 1],
        options: {
            colors: ['#CCCCCC'],
            xaxisScale: false,
            backgroundGrid: false,
            marginInner: 5,
            yaxisLabels: labels,
            textColor: 'black',
            labelsAboveColor: 'black',
            labelsAboveSpecific: data,
            corner: {
                round: true,
                roundRadius: 10,
            },
            responsive: [
                {maxWidth: 1024, width: 500, height: 200, options: {textSize: 12}},
                {maxWidth: 768, width: 325, height: 200, options: {textSize: 10}},
                {maxWidth: 480, width: 300, height: 200, options: {textSize: 8}}
            ]
        }
    }).draw();

    bar_fg = new RGraph.SVG.HBar({
        id: 'chart-container',
        data: data,
        options: {
            colors: ['#9DA65D'],
            textColor: 'white',
            yaxisLabels: labels,
            xaxisScale: false,
            backgroundGrid: false,
            marginInner: 5,
            responsive: [
                {maxWidth: 1024, width: 500, height: 200, options: {textSize: 12}},
                {maxWidth: 768, width: 325, height: 200, options: {textSize: 10}},
                {maxWidth: 480, width: 300, height: 200, options: {textSize: 8}}
            ]
        }
    }).grow({
        callback: function () {
            bar_bg.set('labelsAbove', true);
            RGraph.SVG.redraw();
        }
    });
}

//GRAPHIQUE 3
const radarChart = () => {
    var radar = new RGraph.Radar({
        id: 'radar-chart',
        data: [40, 27, 33, 32, 32, 29],
        options: {
            labels: ['Amical', 'Sécuritaire', 'Dépaysant', 'Authentique', 'Unique', 'Familiale'],
            colors: ['rgba(252, 100, 113, 0.5)'],
            textSize: 12,
            textColor: 'black',
            backgroundGrid: true,
            labelsAbove: true,
            labelsAboveSpecific: [40, 27, 33, 32, 32, 29],
            responsive: [
                {maxWidth: null, width: 500, height: 250, options: {textSize: 12}, parentCss: {'float': 'right', textAlign: 'none'}},
                {maxWidth: 700, width: 400, height: 200, options: {textSize: 10}, parentCss: {'float': 'none', textAlign: 'center'}}
            ]
        }
    }).draw();
}


//GRAPHIQUE 4
const meterChart = () => {
    var meter = new RGraph.Meter({
        id: 'meter-chart',
        min: 0,
        max: 100,
        value: 46,
        options: {
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            anglesStart: RGraph.PI + 0.5,
            anglesEnd: RGraph.TWOPI - 0.5,
            linewidthSegments: 10,
            textSize: 14,
            colorsStroke: 'white',
            segmentsRadiusStart: 240,
            border: 0,
            tickmarksSmallCount: 0,
            tickmarksLargeCount: 0,
            adjustable: true,
            needleRadius: 200,
            needleHeadWidth: 0.05
        }
    }).on('draw', function (obj)
    {
        // Determine the color
        if (obj.value < 10) {
            var color = '#FC6471';
        } else if (obj.value < 35) {
            var color = '#cc0';
        } else {
            var color = 'green';
        }
    
        RGraph.text({
            object: obj,
            x:      obj.centerx + 10,
            y:      obj.centery - 50,
            text:   obj.value.toFixed(0) + '%',
            size:   40,
            halign: 'center',
            color:  color
        });
    }).draw();
}

// GRAPHIQUE 5
const bipolarChart = () => {

    // The Bipolar chart accepts two arrays of data - one for the left side and one for the right.
    left  = [[39],[38],[38], [38], [38]];
    right = [[34],[34],[34], [32], [30]];
    
    new RGraph.Bipolar({
        id: 'cvs-bipolar',
        left: left,
        right: right,
        options: {
            backgroundGridHlines: false,
            backgroundGridBorder: false,
            titleLeftBold: true,
            titleLeftSize: 16,
            titleRightBold: true,
            titleRightSize: 16,
            colors: ['#385644'],
            marginInner:15,
            yaxisLabels: ['Hôtellerie', 'Baignade', 'Randonnée', 'Chalet','Ornithologie' ],
            yaxisLabelsSize: 16,
            tooltips: '<b>Results:</b><br/>%{key}',
            tooltipsFormattedKeyLabels: ['8pm','9pm','10pm'],
            titleLeft: 'Plutôt attrayante',
            titleRight: 'Très attrayante',
            marginBottom: 30,
            xaxis: false,
            tooltipsCss: {
                fontSize: '16pt',
                textAlign: 'left'
            }
        }
    }).draw();
}

// GRAPHIQUE 6
const rotatingChart = () => {
    // This function is called when a tooltip is about to be shown
    // and removes linebreaks from the text
    function removeLinebreak (str)
    {
        return str.replace(/\r?\n/g, ': ');
    }

    // This adds the StarBurst effect to the background canvas. It uses either the
    // requestAnimationFrame() function or the setTimeout() function to animate itself.
    // You can of course turn the animation off if you choose.
    sb = new RGraph.StarBurst({
        id: 'cvs_background',
        options: {
        }
    }).draw();

    // Define the data and the labels
    data        = [3,13,47,58,67];
    labelsAbove = ['Québec', 'Ontario', 'É.-U.', 'Europe', 'Autre'];
    
    // Create the labels that go at the top of each bar
    labelsAbove.forEach(function (v, k, arr)
    {
        arr[k] = v + '\r\n%1 %'.format(data[k]);
    });

    // Create a Bar chart and add it to the foreground canvas tag. There are no
    // xaxisLabels defined, though the labelsAbove labels from above are present
    // and configured to appear at the top of each bar.
    bar = new RGraph.Bar({
        id: 'cvs_foreground',
        data: data,
        options: {
            marginTop: 22,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 0,
            xaxisLinewidth: 3,
            xaxisTickmarksCount: 0,
            yaxis: false,
            yaxisScale: false,
            colors: ['#385644'],
            backgroundGrid: false,
            shadow: false,
            tooltipsCss: {
                fontSize: '20pt',
                fontWeight: 'bold'
            },
            labelsAbove: true,
            tooltips: "<center>%{function:removeLinebreak('%{property:labelsAboveSpecific[%{dataset}]}')}</center>",
            labelsAboveSpecific: labelsAbove,
            labelsAboveColor: '#202426',
            labelsAboveBold: true,
            labelsAboveItalic: false,
            labelsAboveOffsetx: -2,
            labelsAboveOffsety: -10,
            labelsAboveSize: 16,
            labelsAboveFont: '"Lato", sans-serif',
                
            // The responsive configuration for this chart, because it
            // has the StarBurst behind it, is quite large
            responsive: [
                {maxWidth: null,width: 600,height: 230.77,options: {marginInner:25,labelsAboveSize: 10,labelsAboveOffsety: 0},callback: function (){sb.canvas.width = 600,sb.canvas.height = 230.77;sb.set('centerx', 200);sb.set('centery', 50);document.getElementById('cvs_foreground').parentNode.style.width = '600px';document.getElementById('cvs_foreground').parentNode.style.height = '230.77px';RGraph.redraw();}},
                {maxWidth: 900,width: 323,height: 121,options: {marginInner:10, labelsAboveSize:7, labelsAboveOffsety:0},callback: function (){sb.canvas.width = 323,sb.canvas.height = 121;sb.set('centerx', 121);sb.set('centery', 30);document.getElementById('cvs_foreground').parentNode.style.width = '323px';document.getElementById('cvs_foreground').parentNode.style.height = '121px';document.getElementById('cvs_foreground').__object__.draw();}}
            ]
        }
    // The responsive function for this chart, because it has the StarBurst behind it,
    // is quite large
    }).wave();
}

beigneChart();
svgHorChart();
radarChart();
meterChart();
bipolarChart();
rotatingChart();

