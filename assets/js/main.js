const beigneChart = () => {
    segmented = new RGraph.Segmented({
        id: 'cvs',
        max: 100,
        value: 15,
        options: {
            labelsCenterUnitsPost: '%',
            labelsCenterColor: '#aaa',
            responsive: [
                {maxWidth: null, width: 350, height: 350, options: {width: 55, labelsCenterSize: 60}, parentCss: {'float': 'right', textAlign: 'none'}},
                {maxWidth: 700, width: 250, height: 250, options: {width: 40, labelsCenterSize: 45}, parentCss: {'float': 'none', textAlign: 'center'}}
            ]
        }
    }).roundRobin({frames: 60});

    segmented.canvas.addEventListener('click', function (e) {
        var value = segmented.getValue(e);
        if (value) {
            segmented.value = value;
            segmented.grow();
        }
    }, false);
}

const svgHorChart = () => {
    data = [90, 42, 40, 31, 25];
    labels = ['Randonnée pédestre', 'Baignade/plage', 'Camping (tente)', 'Vélo', 'Camping (VR)'];

    bar_bg = new RGraph.SVG.HBar({
        id: 'chart-container',
        data: [1, 1, 1, 1, 1],
        options: {
            colors: ['gray'],
            xaxisScale: false,
            backgroundGrid: false,
            marginInner: 5,
            yaxisLabels: labels,
            textColor: 'rgba(0,0,0,0)',
            labelsAboveColor: 'white',
            labelsAboveSpecific: data,
            responsive: [
                {maxWidth: null, width: 500, height: 300, options: {textSize: 12}, parentCss: {'float': 'right', textAlign: 'none'}},
                {maxWidth: 800, width: 400, height: 250, options: {textSize: 10}, parentCss: {'float': 'none', textAlign: 'center'}}
            ]
        }
    }).draw();

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
                {maxWidth: 700, width: 300, height: 250, options: {textSize: 10}}
            ]
        }
    }).grow({
        callback: function () {
            bar_bg.set('labelsAbove', true);
            RGraph.SVG.redraw();
        }
    });
}

const radarChart = () => {
    var radar = new RGraph.Radar({
        id: 'radar-chart',
        data: [40, 27, 33, 32, 32, 29],
        options: {
            labels: ['Amical', 'Sécuritaire', 'Dépaysant', 'Authentique', 'Unique', 'Familiale'],
            colors: ['#385644'],
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

const meterChart = () => {
    var meter = new RGraph.Meter({
        id: 'meter-chart',
        min: 0,
        max: 100,
        value: 46,
        options: {
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            anglesStart: RGraph.PI + 0.2,
            anglesEnd: RGraph.TWOPI - 0.2,
            linewidthSegments: 10,
            textSize: 14,
            colorsStroke: 'white',
            segmentsRadiusStart: 210,
            border: 0,
            tickmarksSmallCount: 0,
            tickmarksLargeCount: 0,
            adjustable: true,
            needleRadius: 190,
            needleHeadWidth: 0.05
        }
    }).on('draw', function (obj)
    {
        // Determine the color
        if (obj.value < 10) {
            var color = 'red';
        } else if (obj.value < 35) {
            var color = '#cc0';
        } else {
            var color = 'green';
        }
    
        RGraph.text({
            object: obj,
            x:      obj.centerx,
            y:      obj.centery - 25,
            text:   obj.value.toFixed(0) + '%',
            size:   75,
            halign: 'center',
            color:  color
        
        });
    }).draw();
}

beigneChart();
svgHorChart();
radarChart();
meterChart();
