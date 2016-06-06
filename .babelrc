{
    "presets": ["es2015-loose", "stage-0", "react", "react-optimize"],
    "plugins": [
        "syntax-flow",
        ["babel-plugin-module-alias", [
            {
                "src": "./assets",
                "expose": "reactive-di-todomvc/assets"
            },
            {
                "src": "./src",
                "expose": "reactive-di-todomvc"
            }
        ]],
        ["transform-metadata", {
            "typeNameStrategy": "fullPath",
            "argComment": "@args",
            "reflectImport": "reactive-di/inject"
        }],
        "transform-runtime",
        "transform-react-inline-elements",
        "transform-decorators-legacy",
        "espower",
        "flow-comments",
        "react-require",
        "transform-flow-strip-types"
    ]
}
