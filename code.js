// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 500 });
// fileKeyはprivate pluginでしか取得できないようなので、ユーザーに入力してもらう。
const fileKey = "fileKey";
const fileKeyValue = figma.root.getPluginData(fileKey);
figma.ui.postMessage({ fileKey: fileKeyValue });
// google spreadsheet url
const spreadSheetId = "spreadSheetId";
const spreadSheetIdValue = figma.root.getPluginData(spreadSheetId);
figma.ui.postMessage({ spreadSheetId: spreadSheetIdValue });
const GASUrl = "GASUrl";
const GASUrlValue = figma.root.getPluginData(GASUrl);
figma.ui.postMessage({ GASUrl: GASUrlValue });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //   const nodes: SceneNode[] = [];
    //   for (let i = 0; i < msg.count; i++) {
    //     const rect = figma.createRectangle();
    //     rect.x = i * 150;
    //     rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    //     figma.currentPage.appendChild(rect);
    //     nodes.push(rect);
    //   }
    //   figma.currentPage.selection = nodes;
    //   figma.viewport.scrollAndZoomIntoView(nodes);
    // }
    console.log(msg);
    console.log(msg.fileKey);
    console.log(msg.spreadSheetId);
    console.log(msg.GASUrl);
    // save fileKey
    figma.root.setPluginData(fileKey, `${msg.fileKey}`);
    console.log(figma.root.getPluginData(fileKey));
    // save spread sheet url
    figma.root.setPluginData(spreadSheetId, `${msg.spreadSheetId}`);
    console.log(figma.root.getPluginData(spreadSheetId));
    // save GASUrl
    figma.root.setPluginData(GASUrl, `${msg.GASUrl}`);
    console.log(figma.root.getPluginData(GASUrl));
    const projectName = figma.root.name;
    console.log(projectName);
    var array = [];
    const nodes = figma.root.findAll(node => node.type === "FRAME");
    for (const node of nodes) {
        debugger;
        if (node.parent.type == "PAGE") {
            // console.log("ページ名", node.parent.name)
            // console.log(node.name)
            // console.log(`https://www.figma.com/file/${msg.fileKey}/${projectName}?node-id=${node.id}`)
            array.push([node.name, `https://www.figma.com/file/${msg.fileKey}/${projectName}?node-id=${node.id}`]);
        }
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
    figma.ui.postMessage({
        postSheet: array,
        spreadSheetId: figma.root.getPluginData(spreadSheetId),
        GASUrl: figma.root.getPluginData(GASUrl)
    });
};
