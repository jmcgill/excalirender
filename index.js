const data = {
  "type": "excalidraw",
  "version": 2,
  "source": "file://",
  "elements": [
    {
      "id": "KrsOjyEo47BEWagwjZx1H",
      "type": "rectangle",
      "x": 337.0919189453125,
      "y": 158.659423828125,
      "width": 197.2806396484375,
      "height": 179.1473388671875,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 181264336,
      "version": 35,
      "versionNonce": 825476560,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1676647083140,
      "link": null,
      "locked": false
    }
  ],
  "appState": {
    "gridSize": null,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}

      // <button
      //   className="custom-button"
      //   onClick={async () => {
      //     if (!excalidrawAPI) {
      //       return
      //     }
      //     const elements = excalidrawAPI.getSceneElements();
      //     if (!elements || !elements.length) {
      //       return
      //     }
      //     const canvas = await exportToCanvas({
      //       elements,
      //       appState: {
      //         ...initialData.appState,
      //         exportWithDarkMode: false,
      //       },
      //       files: excalidrawAPI.getFiles(),
      //       getDimensions: () => { return {width: 350, height: 350}}
      //     });
      //     const ctx = canvas.getContext("2d");
      //     ctx.font = "30px Virgil";
      //     ctx.strokeText("My custom text", 50, 60);
      //     setCanvasUrl(canvas.toDataURL());
      //   }}
      // >
      //   Export to Canvas
      // </button>
      // <div className="export export-canvas">
      //   <img src={canvasUrl} alt="" />
      // </div>

const App = () => {
  const [excalidrawAPI, setExcalidrawAPI] = React.useState(null);
  const [canvasUrl, setCanvasUrl] = React.useState("");

  const render = async () => {
      if (!excalidrawAPI) {
        return
      }
      const elements = excalidrawAPI.getSceneElements();
      if (!elements || !elements.length) {
        return
      }
      const canvas = await ExcalidrawLib.exportToCanvas({
        elements,
        appState: {
          ...data.appState,
          exportWithDarkMode: false,
        },
        files: excalidrawAPI.getFiles(),
        // getDimensions: () => { return {width: 800, height: 350}}
      });
      // const ctx = canvas.getContext("2d");
      // ctx.font = "30px Virgil";
      // ctx.strokeText("My custom text", 50, 60);
      setCanvasUrl(canvas.toDataURL());
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      {
        style: { height: "500px" },
      },
      React.createElement(ExcalidrawLib.Excalidraw, {
        initialData: data,
        ref: (api) => setExcalidrawAPI(api),
      }),
    ),
    React.createElement(
      "div",
        {
            id: "img",
        },
        canvasUrl,
    ),
    React.createElement(
        "button",
        {
            onClick: render,
            id: "render_button",
        },
    )
  );
};

const excalidrawWrapper = document.getElementById("app");
const root = ReactDOM.createRoot(excalidrawWrapper);
root.render(React.createElement(App));
