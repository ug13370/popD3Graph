# popd3graph

popd3graph is a typescript library to help developers to make various kinds of D3 graphs.
Current available graphs:-

1. Simple bar graph.

...many graphs are yet to come 😊.

## Installation

Use NPM package manager to install foobar.

```bash
npm install popd3graph
```

or

```bash
npm i popd3graph
```

## Usage

This library can be used in every JS supported frontends. For the sake of simplicity , I have shown it's use in AngularJS.

### 1) Simple Bar Chart

In HTML

```html
<div>
  <div #my_bar_chart></div>
</div>
```

In TS (Typescript)

```ts
import { barChart } from "popd3graph";

//Note:- I have made my bar graph in App component. Your's component can be diffrent.
export class AppComponent implements OnInit {
  //chartContainer is my selector here which selects the div written in HTML.
  @ViewChild("my_bar_chart") private chartContainer: ElementRef;

  ngOnInit(): void {

    // Use setTimeout so that the HTML renders first and then bar chart renders. If not done it might give errors.
    setTimeout(() => {
      // Call your barChart
      barChart(
        this.chartContainer,                                    // Selector
        { height: 200, width: 400 },                            // SVG Dimensions ( Format: {height: number , width: number} )
        { top: 10, right: 10, bottom: 40, left: 50 },           // Margins ( Format: {top: number, right: number, bottom: number, left: number} )
        [                                                       // Data ( Format: {key: string, val: number, color:string}[] )
          { key: "Apples", val: 10, color: "#000000" },
          { key: "Oranges", val: 20, color: "#000000" },
          { key: "Mangoes", val: 5, color: "#000000" },
          { key: "Peaches", val: 70, color: "#000000" },
        ],
        {          // X Axis Label (Format : {text: string, deltaX: number, deltaY: number, fontSize: number, fontWeight:number, textColor: string})
          text: "Fruits",                                      
          deltaX: 0,                                            // Variation of x value from the middle.
          deltaY: 25,                                           // Variation of y value from the xAxis.
          fontSize: 10,
          fontWeight: 0,
          textColor: "#000000",
        },
        { fontSize: 7, fontWeight: 0, textColor: "#000000" },  // X ticks configurations.
        {          // Y Axis Label (Format : {text: string, deltaX: number, deltaY: number, fontSize: number, fontWeight:number, textColor: string})
          text: "Fruits count",
          deltaX: -20,                                          
          deltaY: 0,                                            .
          fontSize: 10,
          fontWeight: 0,
          textColor: "#000000",
        },
        { fontSize: 7, fontWeight: 0, textColor: "#000000" },   // Y ticks configurations.
    {                                                           // Tooltip configurations.
          text: "${key} has value ${val}",
          color: "#FFFFFF",
          backgroundColor: "#000000",
        }
      );
    }, 0);
  }
}
```

Tip:- Copy the bar chart calling function mentioned in ts file and then do the tweaks you require.
