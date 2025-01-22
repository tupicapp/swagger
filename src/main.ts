//css
import 'swagger-ui-dist/swagger-ui.css';
import './css/swagger.css';

//js
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "swagger-ui-dist"

// const coreUrl = import.meta.env.VITE_CORE_URL;
// const oauthUrl = import.meta.env.VITE_OAUTH_URL;
// const blogUrl = import.meta.env.VITE_BLOG_URL ?? "/configs/blog-v1.json";

SwaggerUIBundle({
    dom_id: '#swagger-ui',
    urls: [
        {url: "/configs/core-v2.json", name: "Core (v2)"},
        {url: "/configs/blog-v1.json", name: "Blog (v1)"},
    ],
    "urls.primaryName": "Core (v2.1)",
    presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
    ],
    plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    deepLinking: true,
});