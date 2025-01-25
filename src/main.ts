//css
import 'swagger-ui-dist/swagger-ui.css';
import './css/swagger.css';

//js
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "swagger-ui-dist"

const coreUrl = import.meta.env.VITE_CORE_URL ||  "https://api.gibical.app/docs/api.json";
const oauthUrl = import.meta.env.VITE_OAUTH_URL || "https://api.gibical.app/swagger/oauth.json";
const blogUrl = import.meta.env.VITE_BLOG_URL || "/configs/blog-v1.json";

SwaggerUIBundle({
    dom_id: '#swagger-ui',
    urls: [
        {url: coreUrl, name: "Core (v2)"},
        {url: oauthUrl, name: "OAuth (v2)"},
        {url: blogUrl, name: "Blog (v1)"},
    ],
    "urls.primaryName": "Core (v2)",
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