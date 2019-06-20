var Chart = (function (Chart) {
    var chart = {
        id: '',
        width: 0,
        height: 0,
        midHeight: 0,
        canvasEle: '',
        ctx: '',
        aniation: true,
        duration: 0,
        /**
         * Render canvas html element
         */
        renderCanvas(id = '', w = 300, h = 150) {
            var container = document.getElementById(id);
            container.innerHTML = '';
            if (container) {
                var canvasChart = document.createElement("CANVAS");
                // Create id for canvas
                var idAttr = document.createAttribute("id");
                idAttr.value = chart.id;
                canvasChart.setAttributeNode(idAttr);
                // Create width for canvas
                var width = document.createAttribute("width");
                width.value = chart.width + "px";
                canvasChart.setAttributeNode(width);
                // Create height for canvas
                var height = document.createAttribute("height");
                height.value = chart.height + "px";
                canvasChart.setAttributeNode(height);
                container.appendChild(canvasChart);
                //
                chart.canvasEle = document.getElementById(chart.id);
                chart.ctx = chart.canvasEle.getContext("2d");
                if (chart.aniation) {
                    chart.duration = 2;
                    chart.renderStyle();
                }
            }
        },

        renderStyle() {
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.getElementById(chart.id + '-style') || document.createElement("style");
            style.innerHTML = '';
            var idAttr = document.createAttribute("id");
            idAttr.value = chart.id + '-style';
            style.setAttributeNode(idAttr);
            style.type = 'text/css';
            var css = '#' + chart.id + '{' +
                'width:' + chart.width + 'px;' +
                'height:' + chart.height + 'px;' +
                '-webkit-animation-name: expand;' +
                '-webkit-animation-duration: ' + chart.duration + 's;' +
                'animation-name: expand;' +
                'animation-duration: ' + chart.duration + 's;' +
                '}' +
                '@-webkit-keyframes expand {' +
                'from{width: 0}' +
                'to{width: ' + chart.width + 'px}' +
                '}' +
                '@keyframes expand {' +
                'from{width: 0}' +
                'to{width: ' + chart.width + 'px}' +
                '}'
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        },

        /**
         * Draw detail each element in chart
         */
        drawChartItem(x = [0, 0], y = [0, 0, 0, 0], stroke = true, fill = true, fillColor = false, text = '', item = { 'label': 'item', 'value': 0 }) {
            chart.ctx.beginPath();
            chart.ctx.moveTo(x[0], y[0]);
            chart.ctx.lineTo(x[0], y[1]);
            chart.ctx.lineTo(x[1], y[2]);
            chart.ctx.lineTo(x[1], y[3]);
            chart.ctx.closePath();
            if (stroke) {
                chart.ctx.stroke();
            }
            if (fill && fillColor) {
                chart.ctx.fillStyle = fillColor;
                chart.ctx.fill();
            }
            chart.ctx.font = "20px Roboto";
            chart.ctx.textAlign = "center";
            chart.ctx.fillStyle = "#ffffff";
            var midX = x[0] + (x[1] - x[0]) / 2;
            chart.ctx.fillText(text, midX, chart.midHeight + 8);
            chart.ctx.font = "14px Roboto";
            chart.ctx.fillStyle = "#6b7784";
            var label = item["label"];
            chart.ctx.textAlign = "left";
            chart.ctx.fillText(label, x[0] + 5, chart.midHeight * 2 + 30);
            var label = item["value"].toString();
            chart.ctx.textAlign = "left";
            chart.ctx.fillText(label, x[0] + 5, chart.midHeight * 2 + 50);
        },

        /**
         * Draw circle note value
         * @param {*} x : position of center
         * @param {*} r 
         * @param {*} value : value to note
         */
        drawValueNote(x = 0, r = 0, value = '') {
            chart.ctx.beginPath();
            chart.ctx.arc(x + r, chart.midHeight, r, 0, 2 * Math.PI);
            chart.ctx.fillStyle = "#3cb66f";
            chart.ctx.fill();
            chart.ctx.font = "20px Roboto";
            chart.ctx.textAlign = "center";
            chart.ctx.fillStyle = "#ffffff";
            chart.ctx.fillText(value, x + r, chart.midHeight + 8);
        },

        /**
         * Convert value to suitable y coordinate
         * @param {*} value : value to convert
         */
        convertValueToYOrdinate(value = 0) {
            if (isNaN(value)) {
                return [];
            }
            var unit = value * chart.midHeight;
            if (10 > unit) {
                unit = 10;
            }
            var y1 = chart.midHeight - unit,
                y2 = chart.midHeight + unit;
            return [y1, y2];
        },

        /**
         * Draw chart from list data value
         * @param {*} listValue : list value with item index 0 is total
         */
        drawChart(listValue = []) {
            total = listValue[0];
            var len = listValue.length;
            var fy = [], ly = [], x1 = 0, x2;
            var width = Math.floor(chart.width / (len + 1));
            chart.drawChartItem([0, width], [0, chart.midHeight * 2, chart.midHeight * 2, 0], true, true, "#2c3e50", "100%", listValue[0]);
            var colors = ['#ebb808', '#0eade1', '#3cb66f'];
            var session;
            for (var i = 0; i < len - 1; i++) {
                fy = chart.convertValueToYOrdinate(listValue[i]['value'] / total['value']);
                ly = chart.convertValueToYOrdinate(listValue[i + 1]['value'] / total['value']).reverse();
                x1 = (i + 1) * width;
                x2 = x1 + width;
                chart.drawChartItem([x1, x2], fy.concat(ly), false, true, colors[i] || "#6b7784", (Math.round(listValue[i + 1]['value'] / total['value'] * 100)) + '%', listValue[i + 1])
            }
            var r = 30;
            var vl = listValue[len - 1]['value'].toString();
            if (vl.length > 4) {
                r = 50;
            } else if (vl.length > 6) {
                r = 60;
            }
            chart.drawValueNote(x2, r, vl);
        },

        /**
         * init canvas to draw chart
         * @param {*} id : container canvas id
         * @param {*} w : width of container
         * @param {*} h : height of container
         * @param {*} hLabel : height of label
         */
        initChart(id = '', w = 300, h = 150, hLabel = 50) {
            chart.id = id + "-chart";
            chart.width = w;
            chart.height = h + hLabel;
            chart.midHeight = h / 2;
            chart.renderCanvas(id, w, h);
        }
    };
    Chart = chart;
    return Chart;
})(Chart);
