const App = () => {
  const [excalidrawAPI, setExcalidrawAPI] = React.useState(null);
  const [canvasUrl, setCanvasUrl] = React.useState("");
  const [data, setData] = React.useState("");

  const handleChange = (event) => {
    setData(event.target.value);
    console.log(event.target.value);
  };

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

      setCanvasUrl(canvas.toDataURL());
  }

  console.log('Re-rendering: ', data);

  let el = null;
  let parsedData = null;
  try {
      parsedData = JSON.parse(data);
  } catch (e) {
  }

  if (parsedData) {
      el = React.createElement(ExcalidrawLib.Excalidraw, {
          initialData: JSON.parse(data),
          ref: (api) => setExcalidrawAPI(api),
      });
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      {
        style: { height: "500px" },
      },
      el,
    ),
    React.createElement(
      "div",
        {
            id: "img",
        },
        canvasUrl,
    ),
    React.createElement(
      "input",
        {
            id: "data_input",
            value: data,
            onChange: handleChange,
        }
    ),
    React.createElement(
        "button",
        {
            onClick: render,
            id: "render_button",
        },
    ),
  React.createElement(
      "img",
    {
        src: canvasUrl,
    }
  )
  );
};

const excalidrawWrapper = document.getElementById("app");
const root = ReactDOM.createRoot(excalidrawWrapper);
root.render(React.createElement(App));
