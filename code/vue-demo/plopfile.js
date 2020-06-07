module.exports = (plop) => {
    plop.setGenerator("component", {
        description: "craet a component",
        prompts: [{
            type: "input",
            name: "name",
            message: "component name",
            default: "MyComponent",
        }, ],
        actions: [{
            type: "add",
            path: "src/components/{{name}}/{{name}}.vue",
            templateFile: "plop-templates/components.hbs",
        }, ],
    });
};