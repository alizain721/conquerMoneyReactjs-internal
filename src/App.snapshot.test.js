import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

test("render is the same as last snapshot", () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="splash-screen"
    >
      Wait a moment while we load your app...
      <div
        className="imgcontainer"
      >
        <img
          alt="avatar"
          className="avatar"
          src="Logo_v3.png"
        />
      </div>
      <h1>
        <b>
          Conquer Money
        </b>
      </h1>
      <div
        aria-busy="true"
        className=""
        style={Object {}}
      >
        <svg
          aria-label="audio-loading"
          height={100}
          stroke="#00BFFF"
          viewBox="0 0 44 44"
          width={100}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            strokeWidth="2"
          >
            <circle
              cx="22"
              cy="22"
              r={1}
            >
              <animate
                attributeName="r"
                begin="0s"
                calcMode="spline"
                dur="1.8s"
                keySplines="0.165, 0.84, 0.44, 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="1; 20"
              />
              <animate
                attributeName="strokeOpacity"
                begin="0s"
                calcMode="spline"
                dur="1.8s"
                keySplines="0.3, 0.61, 0.355, 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="1; 0"
              />
            </circle>
            <circle
              cx="22"
              cy="22"
              r={1}
            >
              <animate
                attributeName="r"
                begin="-0.9s"
                calcMode="spline"
                dur="1.8s"
                keySplines="0.165, 0.84, 0.44, 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="1; 20"
              />
              <animate
                attributeName="strokeOpacity"
                begin="-0.9s"
                calcMode="spline"
                dur="1.8s"
                keySplines="0.3, 0.61, 0.355, 1"
                keyTimes="0; 1"
                repeatCount="indefinite"
                values="1; 0"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  `);
});
