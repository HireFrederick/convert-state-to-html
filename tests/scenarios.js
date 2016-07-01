const scenarios = [
  {
    description: "Unstyled wrapper",
    html: `<p><span style="color:red;">red</span>notred</p>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"rednotred",
        "type":"unstyled",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Heading with inline styles",
    html: `<h1 class="header-one" style="font-size:22px;"><span style="color:red;">Red</span> Heading</h1>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Red Heading",
        "type":"header-one",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Heading 2 with inline styles",
    html: `<h2><span style="color:red;">Red</span> Heading</h2>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Red Heading",
        "type":"header-two",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Heading 3 with inline styles",
    html: `<h3><span style="color:red;">Red</span> Heading</h3>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Red Heading",
        "type":"header-three",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Heading 4 with inline styles",
    html: `<h4><span style="color:red;">Red</span> Heading</h4>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Red Heading",
        "type":"header-four",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Heading 5 with inline styles",
    html: `<h5><span style="color:red;">Red</span> Heading</h5>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Red Heading",
        "type":"header-five",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Heading 6 with inline styles",
    html: `<h6><span style="color:red;">Red</span> Heading</h6>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Red Heading",
        "type":"header-six",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Multiple inline styles",
    html: `<p class="paragraph"><span style="color:red;font-style:italic;">reditalic</span></p>`,
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"reditalic",
        "type":"p",
        "depth":0,
        "inlineStyleRanges":[{
          "offset":0,
          "length":9,
          "style":"RED"
        }, {
          "offset":0,
          "length":9,
          "style":"ITALIC"
        }],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Many styles",
    html: [
      '<p class="paragraph">',
        '<span style="color:red;font-style:italic;">red</span>',
        '<span style="color:blue;">blue</span>',
        '<span style="color:green;font-weight:bold;">green</span>',
      '</p>'
    ].join(''),
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"redbluegreen",
        "type":"p",
        "depth":0,
        "inlineStyleRanges":[
          {
            "offset":0,
            "length":3,
            "style":"RED"
          },
          {
            "offset":0,
            "length":3,
            "style":"ITALIC"
          },
          {
            "offset":3,
            "length":4,
            "style":"BLUE"
          },
          {
            "offset":7,
            "length":5,
            "style":"GREEN"
          },
          {
            "offset":7,
            "length":5,
            "style":"BOLD"
          },
        ],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "No styles",
    html: '<p class="paragraph">Text</p>',
    state: {
      "entityMap":{},
      "blocks":[{
        "key":"9nc73",
        "text":"Text",
        "type":"p",
        "depth":0,
        "inlineStyleRanges":[],
        "entityRanges":[]
      }]
    }
  },
  {
    description: "Link",
    html: `<h1 class="header-one" style="font-size:22px;"><a href="http://url.com"><span style="color:red;">URL</span></a></h1>`,
    state: {
      "entityMap": {
        "0": {
          "type": "LINK",
          "mutability": "MUTABLE",
          "data": {
            "url": "http://url.com"
          }
        }
      },
      "blocks": [{
        "key": "b0lic",
        "text": "URL",
        "type": "header-one",
        "depth": 0,
        "inlineStyleRanges": [{
          "offset":0,
          "length":3,
          "style":"RED"
        }],
        "entityRanges": [{
          "offset": 0,
          "length": 3,
          "key": 0
        }]
      }]
    }
  }
]

export default scenarios
