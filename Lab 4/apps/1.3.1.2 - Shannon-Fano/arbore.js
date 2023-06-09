// Sample of how the compression tree should look like.
// A0 is the father (the root of the tree)
// each level introduce a byte in the final code 
// each node could have maximum 2 children (L - left (introduce a "0") and 
// R - right (introduce a "1"))
// the node name should contain the name of previous visited nodes.
// ex.: A0LR - Level 2, code: 01

// binary tree "IT IS BETTER LATER THAN NEVER"
// var treeData =
//   {
//     "name": "A0",
//     "children": [
//       {
//         "name": "Level 1: A0R",
//         "children": [
//           { "name": "Level 2: A0RR",
//               "children": [
//                 { "name": "Level 3: A0RRR",
//                     "children": [
//                       { "name": "Level 4: A0RRRR",
//                           "children": [
//                             { "name": "Level 5: A0RRRRR = V" },
//                             { "name": "Level 5: A0RRRRL = S" }
//                           ]
//                       },
//                       { "name": "Level 4: A0RRRL",
//                           "children": [
//                             { "name": "Level 5: A0RRRLR = L" },
//                             { "name": "Level 5: A0RRRLL = H" }
//                           ]
//                       }
//                     ]
//                 },
//                 { "name": "Level 3: A0RRL",
//                     "children": [
//                       { "name": "Level 4: A0RRLR",
//                           "children": [
//                             { "name": "Level 5: A0RRLRR = B" },
//                             { "name": "Level 5: A0RRLRL = ." }
//                           ]
//                       },
//                       { "name": "Level 4: A0RRLL = N" }
//                     ]
//                 }
//               ]
//           },
//           { "name": "Level 2: A0RL",
//               "children": [
//                 { "name": "Level 3: A0RLR",
//                     "children": [
//                       { "name": "Level 4: A0RLRR = I" },
//                       { "name": "Level 4: A0RLRL = A" }
//                     ]
//                 },
//                 { "name": "Level 3: A0RLL = R" }
//               ]
//           }
//         ]
//       },
//       { "name": "Level 1: A0L",
//         "children": [
//           { "name": "Level 2: A0LR",
//               "children": [
//                 { "name": "Level 3: A0LRR = T" },
//                 { "name": "Level 3: A0LRL = E" }
//               ]
//          },
//           { "name": "Level 2: A0LL = spatiu" }
//         ]
// 	  }
//     ]
//   };

function computeTreeData(text) {
    var freq = computeFrequencies(text);
    var sortedFreq = sortFrequencies(freq);
    var sumOfFreq = calculateSumOfFreq(sortedFreq);
    var tree = buildTree(sortedFreq);
    var treeData = buildTreeData(tree, sumOfFreq);
    return treeData;
}

function buildTreeData(tree, sumOfFreq) {
    var treeData = {
        name: tree[0],
        children: []
    };
    if (tree[2]) {
        treeData.children.push(buildTreeData(tree[2], sumOfFreq));
    }
    if (tree[3]) {
        treeData.children.push(buildTreeData(tree[3], sumOfFreq));
    }
    if (tree[2] && tree[3]) {
        treeData.name += " (" + (tree[1] / sumOfFreq * 100).toFixed(2) + "%)";
    }
    return treeData;
}

function calculateSumOfFreq(sortedFreq) {
    var sum = 0;
    for (var i = 0; i < sortedFreq.length; i++) {
        sum += sortedFreq[i][1];
    }
    return sum;
}

function computeFrequencies(text) {
    var freq = {};
    for (var i = 0; i < text.length; i++) {
        if (freq[text[i]]) {
            freq[text[i]]++;
        } else {
            freq[text[i]] = 1;
        }
    }
    return freq;
}

function sortFrequencies(freq) {
    var sortedFreq = [];
    for (var key in freq) {
        sortedFreq.push([key, freq[key]]);
    }
    sortedFreq.sort(function (a, b) {
        return a[1] - b[1];
    });
    return sortedFreq;
}

function buildTree(sortedFreq) {
    var tree = [];
    while (sortedFreq.length > 1) {
        var left = sortedFreq.shift();
        var right = sortedFreq.shift();
        var node = [left[0] + right[0], left[1] + right[1], left, right];
        sortedFreq.push(node);
        sortedFreq.sort(function (a, b) {
            return a[1] - b[1];
        });
    }
    return sortedFreq[0];
}

document.getElementById("update-btn").addEventListener("click", function () {
    // get text value from textbox
    var text = document.getElementById("message").value;

    // compute tree data
    var treeData = computeTreeData(text);

    // Set the dimensions and margins of the diagram
    var margin = { top: 20, right: 90, bottom: 30, left: 90 },
        width = 3060 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");

    var i = 0,
        duration = 750,
        root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function (d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    root.children.forEach(collapse);

    update(root);

    // Collapse the node and all it's children
    function collapse(d) {
        if (d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    }

    function update(source) {

        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 180 });

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function (d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function (d) {
                var o = { x: source.x0, y: source.y0 }
                return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) { return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                var o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

            return path
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }
});