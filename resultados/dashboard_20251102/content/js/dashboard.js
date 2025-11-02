/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 88.27484421121679, "KoPercent": 11.725155788783207};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7606538711776187, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Prueba_Davivienda-72"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-71"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-74"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-73"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-76"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-75"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-78"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-77"], "isController": false}, {"data": [0.03, 500, 1500, "Prueba_Davivienda-79"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda"], "isController": true}, {"data": [0.98, 500, 1500, "Prueba_Davivienda-70"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-61"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-60"], "isController": false}, {"data": [0.01, 500, 1500, "Prueba_Davivienda-63"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-62"], "isController": false}, {"data": [0.05, 500, 1500, "Prueba_Davivienda-65"], "isController": false}, {"data": [0.99, 500, 1500, "Prueba_Davivienda-67"], "isController": false}, {"data": [0.98, 500, 1500, "Prueba_Davivienda-66"], "isController": false}, {"data": [0.99, 500, 1500, "Prueba_Davivienda-69"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-68"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-93"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-10"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-12"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-11"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-14"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-13"], "isController": false}, {"data": [0.9949494949494949, 500, 1500, "Prueba_Davivienda-16"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-15"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-18"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-17"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-19"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-90"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-92"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-91"], "isController": false}, {"data": [0.36, 500, 1500, "Prueba_Davivienda-83"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-85"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-84"], "isController": false}, {"data": [0.28, 500, 1500, "Prueba_Davivienda-81-0"], "isController": false}, {"data": [0.98, 500, 1500, "Prueba_Davivienda-87"], "isController": false}, {"data": [0.27, 500, 1500, "Prueba_Davivienda-81-1"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-86"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-89"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-88"], "isController": false}, {"data": [0.22, 500, 1500, "Prueba_Davivienda-81"], "isController": false}, {"data": [0.96, 500, 1500, "Prueba_Davivienda-80"], "isController": false}, {"data": [0.97, 500, 1500, "Prueba_Davivienda-4"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-5"], "isController": false}, {"data": [0.03, 500, 1500, "Prueba_Davivienda-71-1"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-2"], "isController": false}, {"data": [0.46078431372549017, 500, 1500, "Prueba_Davivienda-30"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-3"], "isController": false}, {"data": [0.9907407407407407, 500, 1500, "Prueba_Davivienda-32"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-1"], "isController": false}, {"data": [0.8365384615384616, 500, 1500, "Prueba_Davivienda-31"], "isController": false}, {"data": [0.89, 500, 1500, "Prueba_Davivienda-34"], "isController": false}, {"data": [0.05, 500, 1500, "Prueba_Davivienda-71-0"], "isController": false}, {"data": [0.9811320754716981, 500, 1500, "Prueba_Davivienda-33"], "isController": false}, {"data": [0.68, 500, 1500, "Prueba_Davivienda-36"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-35"], "isController": false}, {"data": [0.12, 500, 1500, "Prueba_Davivienda-79-1"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-38"], "isController": false}, {"data": [0.97, 500, 1500, "Prueba_Davivienda-37"], "isController": false}, {"data": [0.82, 500, 1500, "Prueba_Davivienda-39"], "isController": false}, {"data": [0.08, 500, 1500, "Prueba_Davivienda-79-0"], "isController": false}, {"data": [0.11, 500, 1500, "Prueba_Davivienda-63-1"], "isController": false}, {"data": [0.09, 500, 1500, "Prueba_Davivienda-63-0"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-21"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-20"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-23"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-22"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-25"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-24"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-27"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-26"], "isController": false}, {"data": [0.8220338983050848, 500, 1500, "Prueba_Davivienda-29"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-28"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-8"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-9"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-6"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-7"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-50"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-52"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-51"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-54"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-53"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-56"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-55"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-58"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-57"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-59"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-41"], "isController": false}, {"data": [0.99, 500, 1500, "Prueba_Davivienda-40"], "isController": false}, {"data": [0.99, 500, 1500, "Prueba_Davivienda-43"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-42"], "isController": false}, {"data": [0.0, 500, 1500, "Prueba_Davivienda-45"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-44"], "isController": false}, {"data": [0.99, 500, 1500, "Prueba_Davivienda-47"], "isController": false}, {"data": [0.99, 500, 1500, "Prueba_Davivienda-46"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-49"], "isController": false}, {"data": [1.0, 500, 1500, "Prueba_Davivienda-48"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 6098, 715, 11.725155788783207, 623.7348310921626, 9, 8808, 173.0, 2476.7000000000025, 3292.0, 5844.100000000002, 20.244944573737346, 376.90650654254824, 33.30466498671197], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Prueba_Davivienda-72", 50, 50, 100.0, 2260.5799999999995, 514, 3540, 2195.5, 3287.5, 3508.6499999999996, 3540.0, 1.0507071258957277, 0.40427598398722336, 0.857803864500809], "isController": false}, {"data": ["Prueba_Davivienda-71", 50, 0, 0.0, 5482.620000000001, 3132, 7715, 5563.5, 6884.0, 7275.5999999999985, 7715.0, 0.9732360097323601, 4.351011253041363, 1.4227874087591241], "isController": false}, {"data": ["Prueba_Davivienda-74", 50, 50, 100.0, 2180.58, 341, 3626, 2180.0, 3153.9, 3345.4999999999995, 3626.0, 1.0393065746533914, 0.39988944376312124, 0.7733902440291837], "isController": false}, {"data": ["Prueba_Davivienda-73", 50, 50, 100.0, 2308.86, 291, 4012, 2341.0, 3248.1, 3696.95, 4012.0, 1.0485477613505294, 0.40344513473838733, 0.795626572821642], "isController": false}, {"data": ["Prueba_Davivienda-76", 50, 50, 100.0, 2408.3399999999992, 406, 4588, 2389.0, 3417.5, 4029.299999999997, 4588.0, 0.9980637563127533, 0.3840206249875242, 0.7651172350639759], "isController": false}, {"data": ["Prueba_Davivienda-75", 50, 50, 100.0, 2337.920000000001, 461, 3917, 2488.5, 3307.7, 3664.4499999999985, 3917.0, 1.0222022324896758, 0.3933082808602854, 0.7496815201169399], "isController": false}, {"data": ["Prueba_Davivienda-78", 50, 50, 100.0, 2472.2600000000007, 434, 4850, 2445.5, 3483.8, 4275.699999999999, 4850.0, 1.010366358841716, 0.38875424353870713, 0.7617215127205125], "isController": false}, {"data": ["Prueba_Davivienda-77", 50, 50, 100.0, 2306.6600000000008, 528, 3746, 2391.0, 3012.3, 3377.2999999999997, 3746.0, 0.987205812667825, 0.3798428615147686, 0.7423324958537355], "isController": false}, {"data": ["Prueba_Davivienda-79", 50, 0, 0.0, 4965.400000000001, 560, 8808, 5130.0, 7011.4, 7431.8499999999985, 8808.0, 1.0262304503099218, 4.590557300859981, 1.3078425172406716], "isController": false}, {"data": ["Prueba_Davivienda", 50, 50, 100.0, 53096.49999999999, 45508, 60287, 53323.5, 57706.3, 58165.95, 60287.0, 0.5959262481675268, 1229.042472687955, 86.31270075265485], "isController": true}, {"data": ["Prueba_Davivienda-70", 50, 0, 0.0, 124.68000000000002, 79, 645, 90.0, 146.0, 534.3999999999996, 645.0, 1.056278519520027, 4.225114078080108, 0.7860197576897077], "isController": false}, {"data": ["Prueba_Davivienda-61", 50, 50, 100.0, 115.89999999999999, 95, 409, 109.0, 121.9, 131.24999999999997, 409.0, 1.2969495746005395, 0.5927464852666529, 0.9689125239935671], "isController": false}, {"data": ["Prueba_Davivienda-60", 50, 0, 0.0, 56.06000000000001, 25, 135, 46.0, 111.8, 128.45, 135.0, 1.274794758043955, 0.867209012161542, 0.8502781442812707], "isController": false}, {"data": ["Prueba_Davivienda-63", 50, 0, 0.0, 4640.339999999999, 749, 7089, 4564.5, 6288.0, 6592.65, 7089.0, 1.1377340887887684, 5.157868604512253, 1.9332590961840397], "isController": false}, {"data": ["Prueba_Davivienda-62", 50, 0, 0.0, 169.12, 153, 210, 166.0, 181.9, 193.04999999999995, 210.0, 1.3493091537132988, 0.4862256618361399, 0.7365857587165372], "isController": false}, {"data": ["Prueba_Davivienda-65", 50, 0, 0.0, 2552.1599999999994, 820, 4121, 2597.5, 3711.5, 3812.0499999999997, 4121.0, 1.0674409171452361, 107.07875112081297, 0.735950476078649], "isController": false}, {"data": ["Prueba_Davivienda-67", 50, 0, 0.0, 218.72000000000003, 155, 655, 182.5, 305.0, 355.3499999999998, 655.0, 1.0687642947224418, 28.943264313425818, 0.7817426335420986], "isController": false}, {"data": ["Prueba_Davivienda-66", 50, 0, 0.0, 213.68000000000004, 156, 710, 174.0, 296.79999999999995, 476.3999999999992, 710.0, 1.0552085092014183, 18.524886103431538, 0.7769797030643255], "isController": false}, {"data": ["Prueba_Davivienda-69", 50, 0, 0.0, 210.17999999999998, 155, 589, 176.0, 302.7, 433.15, 589.0, 1.0984424086645137, 28.974636621520684, 0.803450550868868], "isController": false}, {"data": ["Prueba_Davivienda-68", 50, 0, 0.0, 196.44000000000003, 160, 419, 173.5, 267.9, 321.8999999999998, 419.0, 1.1337097249620207, 31.24233860224928, 0.8325680792689839], "isController": false}, {"data": ["Prueba_Davivienda-93", 50, 0, 0.0, 181.54000000000002, 144, 218, 187.5, 199.0, 203.89999999999998, 218.0, 1.1910149829684857, 1.080892621066673, 4.622161662418713], "isController": false}, {"data": ["Prueba_Davivienda-10", 100, 0, 0.0, 15.239999999999998, 10, 34, 15.0, 19.0, 21.0, 33.87999999999994, 0.37214841278701943, 0.07850005582226192, 0.20351866324290127], "isController": false}, {"data": ["Prueba_Davivienda-12", 100, 0, 0.0, 205.69, 149, 259, 207.5, 246.70000000000002, 251.95, 258.99, 0.3705268150256034, 0.33486360907938906, 3.7468800484278546], "isController": false}, {"data": ["Prueba_Davivienda-11", 100, 0, 0.0, 87.93, 68, 157, 84.0, 111.0, 123.94999999999999, 156.92999999999995, 0.372438091478244, 53.154640834671014, 0.26950842361853405], "isController": false}, {"data": ["Prueba_Davivienda-14", 100, 0, 0.0, 179.81000000000006, 136, 228, 185.0, 198.0, 204.74999999999994, 227.90999999999997, 0.36907450876182885, 0.3299071973681297, 0.5373926685194207], "isController": false}, {"data": ["Prueba_Davivienda-13", 100, 0, 0.0, 179.53, 143, 231, 182.0, 196.0, 199.95, 230.95999999999998, 0.3692571285088659, 0.33074836996056334, 1.4355592076111279], "isController": false}, {"data": ["Prueba_Davivienda-16", 99, 0, 0.0, 216.1717171717172, 156, 1218, 217.0, 245.0, 279.0, 1218.0, 0.36645493714742594, 0.0967323046684138, 0.23583379255874384], "isController": false}, {"data": ["Prueba_Davivienda-15", 100, 0, 0.0, 178.14999999999992, 136, 222, 180.5, 199.0, 206.95, 221.92999999999995, 0.3677471076689982, 0.3323837700789921, 0.6503808710825739], "isController": false}, {"data": ["Prueba_Davivienda-18", 94, 0, 0.0, 182.90425531914897, 142, 241, 188.0, 205.0, 211.5, 241.0, 0.3576510695288898, 0.32131227028528375, 1.4906784812004898], "isController": false}, {"data": ["Prueba_Davivienda-17", 96, 96, 100.0, 231.28125, 154, 1242, 230.5, 245.3, 254.09999999999988, 1242.0, 0.3608167990288014, 0.1923886447946539, 0.5613097273953913], "isController": false}, {"data": ["Prueba_Davivienda-19", 90, 0, 0.0, 179.33333333333337, 139, 227, 183.5, 202.0, 208.0, 227.0, 0.34478531367801646, 0.31217362119395325, 1.850864130164118], "isController": false}, {"data": ["Prueba_Davivienda-90", 50, 0, 0.0, 178.85999999999993, 143, 205, 184.0, 198.9, 203.35, 205.0, 1.203224642040669, 1.0993995157020815, 2.1655693508603058], "isController": false}, {"data": ["Prueba_Davivienda-92", 50, 0, 0.0, 176.68000000000004, 139, 207, 178.5, 194.0, 199.35, 207.0, 1.1861270579304455, 1.081391112053423, 4.191986154931916], "isController": false}, {"data": ["Prueba_Davivienda-91", 50, 0, 0.0, 185.54000000000008, 147, 223, 189.5, 206.5, 216.0, 223.0, 1.1996736887566581, 1.0787690748116514, 9.3373040033111], "isController": false}, {"data": ["Prueba_Davivienda-83", 50, 0, 0.0, 1784.3599999999992, 397, 4833, 1611.0, 3462.7, 4100.5499999999965, 4833.0, 1.281328481369484, 128.5340140657834, 0.877159438906258], "isController": false}, {"data": ["Prueba_Davivienda-85", 50, 0, 0.0, 17.820000000000007, 9, 63, 15.5, 27.599999999999994, 38.34999999999999, 63.0, 1.2303755106058367, 0.2595323342684187, 0.6728616073625671], "isController": false}, {"data": ["Prueba_Davivienda-84", 50, 0, 0.0, 39.5, 23, 341, 31.5, 44.0, 56.899999999999906, 341.0, 1.2717792191275594, 0.3701076243164187, 0.6743907382678368], "isController": false}, {"data": ["Prueba_Davivienda-81-0", 50, 0, 0.0, 1994.619999999999, 168, 4051, 2396.0, 3474.0, 3659.3999999999996, 4051.0, 1.1451080982044706, 2.2130555921353974, 0.8834330054507146], "isController": false}, {"data": ["Prueba_Davivienda-87", 50, 0, 0.0, 292.6, 229, 565, 284.0, 326.09999999999997, 424.6499999999993, 565.0, 1.17932872608911, 1.053587407422695, 4.900433329598792], "isController": false}, {"data": ["Prueba_Davivienda-81-1", 50, 0, 0.0, 2241.8399999999997, 178, 4612, 2636.5, 3811.4, 4436.049999999999, 4612.0, 1.2173150898378535, 3.0906251141232897, 0.9379507869942056], "isController": false}, {"data": ["Prueba_Davivienda-86", 50, 0, 0.0, 20.12, 12, 67, 17.0, 33.699999999999996, 40.699999999999974, 67.0, 1.2533213014488394, 0.2643724620243646, 0.6854100867298341], "isController": false}, {"data": ["Prueba_Davivienda-89", 50, 0, 0.0, 190.72, 146, 224, 193.5, 213.6, 216.79999999999998, 224.0, 1.214565064250492, 1.108954836398086, 7.7594576663346855], "isController": false}, {"data": ["Prueba_Davivienda-88", 50, 0, 0.0, 184.96000000000004, 143, 226, 184.0, 207.8, 213.0, 226.0, 1.185592677779622, 1.085604607805942, 8.134740384843383], "isController": false}, {"data": ["Prueba_Davivienda-81", 50, 0, 0.0, 4236.700000000003, 359, 7415, 5023.5, 6666.8, 7166.15, 7415.0, 1.1402508551881414, 5.098636153078677, 1.7582579104903078], "isController": false}, {"data": ["Prueba_Davivienda-80", 50, 0, 0.0, 293.56000000000006, 162, 864, 188.5, 450.4, 571.8999999999999, 864.0, 1.1843570125778715, 50.116575890636476, 0.8836413648530214], "isController": false}, {"data": ["Prueba_Davivienda-4", 100, 0, 0.0, 255.56, 215, 603, 234.0, 255.0, 578.3999999999999, 602.8399999999999, 0.3721719583316276, 0.11557683862251715, 0.27367723107784725], "isController": false}, {"data": ["Prueba_Davivienda-5", 100, 0, 0.0, 50.04, 37, 111, 47.0, 63.0, 65.94999999999999, 110.74999999999987, 0.37265043898221717, 0.48240763858869823, 0.18632521949110856], "isController": false}, {"data": ["Prueba_Davivienda-71-1", 50, 0, 0.0, 2990.059999999999, 1159, 4412, 3182.5, 3857.9, 4211.15, 4412.0, 1.019077123756726, 2.5864655093347464, 0.7374376452184901], "isController": false}, {"data": ["Prueba_Davivienda-2", 100, 0, 0.0, 88.40999999999998, 44, 408, 97.0, 123.9, 144.4999999999999, 405.95999999999896, 0.373877898955759, 2.1252658330279997, 0.21687839060519618], "isController": false}, {"data": ["Prueba_Davivienda-30", 51, 0, 0.0, 919.764705882353, 465, 5163, 523.0, 1639.4, 2856.5999999999967, 5163.0, 0.21860734263486142, 107.09010453503076, 0.14687680833279754], "isController": false}, {"data": ["Prueba_Davivienda-3", 100, 0, 0.0, 24.099999999999998, 11, 50, 23.0, 34.0, 37.94999999999999, 49.91999999999996, 0.37305220119451316, 0.10856401948824698, 0.19781967309435608], "isController": false}, {"data": ["Prueba_Davivienda-32", 54, 0, 0.0, 198.537037037037, 156, 1204, 167.0, 232.5, 368.0, 1204.0, 0.22716373457179637, 4.884463972462707, 0.1539566716726823], "isController": false}, {"data": ["Prueba_Davivienda-1", 100, 0, 0.0, 17.480000000000004, 11, 50, 16.0, 21.0, 28.0, 49.85999999999993, 0.3732150987900366, 2.121396170859738, 0.21649391472781424], "isController": false}, {"data": ["Prueba_Davivienda-31", 52, 0, 0.0, 639.0769230769231, 334, 2963, 362.5, 1430.3000000000004, 2105.7499999999964, 2963.0, 0.2227257346736854, 46.7792975358824, 0.14746879698120965], "isController": false}, {"data": ["Prueba_Davivienda-34", 50, 0, 0.0, 505.26, 379, 2070, 418.0, 695.9999999999998, 1213.7999999999984, 2070.0, 1.3003562976255494, 130.46393461808535, 0.8901853170268653], "isController": false}, {"data": ["Prueba_Davivienda-71-0", 50, 0, 0.0, 2492.359999999999, 914, 4069, 2584.5, 3258.7999999999997, 3784.5499999999984, 4069.0, 1.0423181154888472, 2.014401904836356, 0.7695239212007505], "isController": false}, {"data": ["Prueba_Davivienda-33", 53, 0, 0.0, 215.5471698113207, 161, 1070, 172.0, 263.4, 518.2999999999993, 1070.0, 0.2244992184885696, 7.215764431752238, 0.1543432127108916], "isController": false}, {"data": ["Prueba_Davivienda-36", 50, 0, 0.0, 809.1400000000001, 383, 2665, 760.5, 1260.3999999999999, 1658.6999999999978, 2665.0, 1.2498125281207817, 397.71988303317005, 0.898302754586812], "isController": false}, {"data": ["Prueba_Davivienda-35", 50, 0, 0.0, 83.20000000000002, 76, 93, 83.0, 88.9, 91.35, 93.0, 1.3119916032537393, 2.5547961493046443, 0.9545251410390974], "isController": false}, {"data": ["Prueba_Davivienda-79-1", 50, 0, 0.0, 2638.2, 233, 5183, 2740.0, 3804.2, 4298.5499999999965, 5183.0, 1.1092623405435387, 2.8181979686633385, 0.6954554908485856], "isController": false}, {"data": ["Prueba_Davivienda-38", 50, 0, 0.0, 98.74, 76, 396, 86.0, 96.9, 248.29999999999893, 396.0, 1.2703252032520325, 2.1188627413617884, 0.9242112074441057], "isController": false}, {"data": ["Prueba_Davivienda-37", 50, 0, 0.0, 229.3800000000001, 151, 1157, 169.0, 261.2, 979.9499999999998, 1157.0, 1.2778246313475938, 39.7186329991822, 0.9433939661120908], "isController": false}, {"data": ["Prueba_Davivienda-39", 50, 0, 0.0, 525.4, 253, 2856, 395.0, 845.6999999999998, 1380.449999999996, 2856.0, 1.25344697919278, 150.2141142046879, 0.893570600401103], "isController": false}, {"data": ["Prueba_Davivienda-79-0", 50, 0, 0.0, 2326.94, 284, 4104, 2393.0, 3419.0, 3758.349999999999, 4104.0, 1.0320769516575157, 1.9946096555959214, 0.6682295106923173], "isController": false}, {"data": ["Prueba_Davivienda-63-1", 50, 0, 0.0, 2329.5600000000004, 239, 3857, 2535.0, 3360.7, 3664.2, 3857.0, 1.1510923866749545, 2.9938069431015033, 0.872312199277114], "isController": false}, {"data": ["Prueba_Davivienda-63-0", 50, 0, 0.0, 2310.62, 508, 3828, 2385.0, 3366.4, 3448.95, 3828.0, 1.2191850966813782, 2.3562180725902806, 1.1477484699227036], "isController": false}, {"data": ["Prueba_Davivienda-21", 81, 0, 0.0, 185.55555555555563, 142, 287, 188.0, 208.39999999999998, 246.69999999999987, 287.0, 0.31552131132215117, 0.2814676512749398, 0.5761961446996314], "isController": false}, {"data": ["Prueba_Davivienda-20", 85, 0, 0.0, 189.94117647058818, 143, 272, 192.0, 215.4, 237.3, 272.0, 0.32821700936383824, 0.29640967395501494, 2.5292582235254364], "isController": false}, {"data": ["Prueba_Davivienda-23", 74, 0, 0.0, 190.6486486486486, 142, 303, 190.5, 210.0, 277.5, 303.0, 0.29479252979794757, 0.2690697652415705, 2.263626622852795], "isController": false}, {"data": ["Prueba_Davivienda-22", 76, 0, 0.0, 190.13157894736844, 146, 305, 185.0, 248.0, 279.45, 305.0, 0.30005487845803375, 0.2663226090857407, 0.5242169702748266], "isController": false}, {"data": ["Prueba_Davivienda-25", 70, 0, 0.0, 176.38571428571424, 138, 279, 179.0, 199.0, 217.15000000000003, 279.0, 0.28297348538441947, 0.25300229814894915, 0.4205914499561391], "isController": false}, {"data": ["Prueba_Davivienda-24", 71, 0, 0.0, 184.25352112676057, 147, 291, 183.0, 206.79999999999998, 254.99999999999983, 291.0, 0.2859098779849394, 0.25533454098377156, 1.1159978342830104], "isController": false}, {"data": ["Prueba_Davivienda-27", 69, 69, 100.0, 117.85507246376812, 95, 330, 111.0, 131.0, 171.0, 330.0, 0.27948801036941023, 0.12773475473914453, 0.20879719524667856], "isController": false}, {"data": ["Prueba_Davivienda-26", 64, 0, 0.0, 181.328125, 147, 297, 179.5, 198.0, 251.25, 297.0, 0.26134075976659, 0.23221428104748645, 0.9215834799972233], "isController": false}, {"data": ["Prueba_Davivienda-29", 59, 0, 0.0, 751.1694915254237, 330, 3574, 353.0, 2568.0, 3271.0, 3574.0, 0.2416834274806346, 0.6321268128817267, 0.17418600176756607], "isController": false}, {"data": ["Prueba_Davivienda-28", 60, 0, 0.0, 176.7833333333333, 145, 212, 181.5, 198.0, 204.85, 212.0, 0.24882224139075043, 0.22389546899882223, 1.1160552292067547], "isController": false}, {"data": ["Prueba_Davivienda-8", 100, 0, 0.0, 85.65000000000002, 50, 289, 67.5, 140.20000000000005, 201.2999999999996, 288.8299999999999, 0.3736432081005847, 0.25157791278233416, 0.2601636790778486], "isController": false}, {"data": ["Prueba_Davivienda-9", 100, 0, 0.0, 18.71, 11, 47, 17.0, 26.0, 28.94999999999999, 46.93999999999997, 0.3732596767571199, 0.07873446306595498, 0.20412638572654995], "isController": false}, {"data": ["Prueba_Davivienda-6", 100, 100, 100.0, 92.21, 41, 1117, 100.5, 122.80000000000001, 126.94999999999999, 1107.399999999995, 0.3738136090582514, 0.17084450101490398, 0.2792650497359007], "isController": false}, {"data": ["Prueba_Davivienda-7", 100, 0, 0.0, 15.389999999999997, 9, 35, 15.0, 20.0, 22.94999999999999, 35.0, 0.37206118174072544, 0.4076903999843734, 0.21909462166958732], "isController": false}, {"data": ["Prueba_Davivienda-50", 50, 0, 0.0, 109.25999999999999, 92, 140, 108.0, 121.6, 126.35, 140.0, 1.2839937341105774, 7.298952662361007, 0.7448166777946124], "isController": false}, {"data": ["Prueba_Davivienda-52", 50, 0, 0.0, 31.419999999999995, 25, 91, 29.0, 36.9, 41.79999999999998, 91.0, 1.3030674207083475, 2.519603020510281, 0.8576830483959239], "isController": false}, {"data": ["Prueba_Davivienda-51", 50, 0, 0.0, 20.160000000000007, 11, 37, 19.0, 32.699999999999996, 34.34999999999999, 37.0, 1.304699527698771, 10.547170595986744, 0.8116148429141768], "isController": false}, {"data": ["Prueba_Davivienda-54", 50, 0, 0.0, 30.099999999999998, 13, 66, 29.0, 46.0, 49.34999999999999, 66.0, 1.2900895322135355, 3.1143567613592387, 0.7811088964574142], "isController": false}, {"data": ["Prueba_Davivienda-53", 50, 0, 0.0, 50.56, 26, 139, 44.0, 107.69999999999999, 113.24999999999997, 139.0, 1.264446298965683, 2.444925460890676, 0.8322625053738968], "isController": false}, {"data": ["Prueba_Davivienda-56", 50, 0, 0.0, 17.400000000000002, 12, 45, 17.0, 21.799999999999997, 25.89999999999999, 45.0, 1.2887262230011858, 7.280548046935409, 0.7324596306510645], "isController": false}, {"data": ["Prueba_Davivienda-55", 50, 0, 0.0, 28.540000000000006, 18, 51, 29.0, 37.0, 40.34999999999999, 51.0, 1.2852809624183847, 7.261084343349956, 0.7305014844995116], "isController": false}, {"data": ["Prueba_Davivienda-58", 50, 0, 0.0, 60.52, 41, 371, 51.0, 69.1, 114.34999999999974, 371.0, 1.308318287673025, 1.8482551122537092, 0.6784345808148207], "isController": false}, {"data": ["Prueba_Davivienda-57", 50, 0, 0.0, 27.200000000000006, 11, 41, 29.0, 35.8, 38.0, 41.0, 1.3082498233862738, 3.5889994178288287, 0.8125457887438184], "isController": false}, {"data": ["Prueba_Davivienda-59", 50, 0, 0.0, 54.999999999999986, 40, 200, 52.0, 63.0, 69.35, 200.0, 1.2790667928679236, 1.7224932689110024, 1.0592271878437491], "isController": false}, {"data": ["Prueba_Davivienda-41", 50, 0, 0.0, 186.64, 154, 318, 173.0, 250.39999999999998, 278.8999999999999, 318.0, 1.2655344351919817, 33.61452256131514, 0.9256692304285099], "isController": false}, {"data": ["Prueba_Davivienda-40", 50, 0, 0.0, 193.24000000000004, 152, 831, 172.0, 242.99999999999997, 264.45, 831.0, 1.3023546572202542, 34.72479414656699, 0.9576885321160657], "isController": false}, {"data": ["Prueba_Davivienda-43", 50, 0, 0.0, 198.93999999999997, 156, 846, 176.0, 212.7, 298.2499999999995, 846.0, 1.2606842994377347, 33.613733815965304, 0.9270461694107561], "isController": false}, {"data": ["Prueba_Davivienda-42", 50, 0, 0.0, 180.2, 151, 229, 173.5, 213.8, 220.24999999999997, 229.0, 1.2359717209670245, 32.829291834552826, 0.9040457216838879], "isController": false}, {"data": ["Prueba_Davivienda-45", 50, 50, 100.0, 112.7, 95, 138, 110.5, 122.9, 132.79999999999998, 138.0, 1.22082234593222, 0.5579539627893348, 0.9120401314825666], "isController": false}, {"data": ["Prueba_Davivienda-44", 50, 0, 0.0, 180.68000000000004, 152, 346, 171.0, 206.8, 249.49999999999994, 346.0, 1.3060627432541858, 34.74203424169997, 0.9553134713841652], "isController": false}, {"data": ["Prueba_Davivienda-47", 50, 0, 0.0, 70.26000000000002, 36, 1056, 48.0, 68.29999999999998, 81.0, 1056.0, 1.2839277919009835, 10.413105773181316, 0.7134325328043551], "isController": false}, {"data": ["Prueba_Davivienda-46", 50, 0, 0.0, 100.13999999999997, 55, 1239, 64.5, 141.7, 195.8499999999996, 1239.0, 1.2736582010851567, 0.8579779561606847, 0.8768838200830426], "isController": false}, {"data": ["Prueba_Davivienda-49", 50, 0, 0.0, 18.659999999999993, 9, 41, 16.0, 33.0, 34.89999999999999, 41.0, 1.288659793814433, 6.209276336984536, 0.8003785438144331], "isController": false}, {"data": ["Prueba_Davivienda-48", 50, 0, 0.0, 51.55999999999999, 38, 77, 50.0, 66.5, 71.0, 77.0, 1.2694866196110293, 2.5240964428984918, 0.8628541867668714], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 269, 37.62237762237762, 4.411282387668088], "isController": false}, {"data": ["502/Bad Gateway", 96, 13.426573426573427, 1.574286651361102], "isController": false}, {"data": ["401/Unauthorized", 350, 48.95104895104895, 5.739586749754018], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 6098, 715, "401/Unauthorized", 350, "400/Bad Request", 269, "502/Bad Gateway", 96, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Prueba_Davivienda-72", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Prueba_Davivienda-74", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Prueba_Davivienda-73", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Prueba_Davivienda-76", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Prueba_Davivienda-75", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Prueba_Davivienda-78", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Prueba_Davivienda-77", 50, 50, "401/Unauthorized", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Prueba_Davivienda-61", 50, 50, "400/Bad Request", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Prueba_Davivienda-17", 96, 96, "502/Bad Gateway", 96, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Prueba_Davivienda-27", 69, 69, "400/Bad Request", 69, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Prueba_Davivienda-6", 100, 100, "400/Bad Request", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Prueba_Davivienda-45", 50, 50, "400/Bad Request", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
