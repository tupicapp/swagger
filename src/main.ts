//css
import 'swagger-ui-dist/swagger-ui.css';
import './css/swagger.css';

//js
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "swagger-ui-dist"

const iamUrl = import.meta.env.VITE_IAM_URL || "/configs/iam.json";
const liveCoreUrl = import.meta.env.VITE_LIVE_CORE_URL ||  "https://api.live.tupic.com/swagger/api.json";
const tagCoreUrl = import.meta.env.VITE_TAG_CORE_URL ||  "https://api.tag.tupic.com/swagger/api.json";
const blogUrl = import.meta.env.VITE_BLOG_URL || "/configs/blog-v1-production.json";
const financeUrl = import.meta.env.VITE_FINANCE_URL || "/configs/finance.yaml";

SwaggerUIBundle({
    dom_id: '#swagger-ui',
    urls: [
        {url: iamUrl, name: "Iam"},
        {url: liveCoreUrl, name: "Tupic Live (v2)"},
        {url: tagCoreUrl, name: "Tupic Tag (v1)"},
        {url: blogUrl, name: "Blog (v1)"},
        {url: financeUrl, name: "Finance (v1)"},
    ],
    "urls.primaryName": "Tupic Live (v2)",
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