//css
import '@tupicapp/web-ui/tokens.css';
import '@tupicapp/web-ui/reset.css';
import 'swagger-ui-dist/swagger-ui.css';
import './css/swagger.css';

//js
import {buildBrandCssVars, ServiceBrand} from '@tupicapp/web-ui/server-init';
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "swagger-ui-dist"

const iamUrl = import.meta.env.VITE_IAM_URL || "/configs/iam.json";
const accountsCoreUrl = import.meta.env.VITE_ACCOUNTS_URL || "https://api.tupic.com/accounts/docs/public/user/doc.json";
const liveCoreUrl = import.meta.env.VITE_LIVE_CORE_URL ||  "https://api.live.tupic.com/swagger/api.json";
const tagCoreUrl = import.meta.env.VITE_TAG_CORE_URL ||  "https://api.tupic.com/tag/docs/public/user/doc.json";
const assetsCoreUrl = import.meta.env.VITE_ASSETS_CORE_URL ||  "https://api.tupic.com/assets/docs/public/user/doc.json";
const financeUrl = import.meta.env.VITE_FINANCE_URL || "/configs/finance.yaml";
const insightsUrl = import.meta.env.VITE_INSIGHTS_URL || "https://api.tupic.com/insights/v1/openapi.json";
const notificationsUrl = import.meta.env.VITE_NOTIFICATIONS_URL || "https://api.tupic.com/notifications/docs/public/user/doc.json";

const root = document.documentElement;
root.dataset.theme = 'dark';

for (const declaration of buildBrandCssVars(ServiceBrand.chain()).split(';')) {
    const [property, value] = declaration.split(':');
    if (!property || !value) {
        continue;
    }

    root.style.setProperty(property.trim(), value.trim());
}

SwaggerUIBundle({
    dom_id: '#swagger-ui',
    urls: [
        {url: iamUrl, name: "Tupic IAM"},
        {url: accountsCoreUrl, name: "Tupic Accounts (v2)"},
        {url: liveCoreUrl, name: "Tupic Live (v2)"},
        {url: tagCoreUrl, name: "Tupic Tag (v1)"},
        {url: assetsCoreUrl, name: "Tupic Assets (v1)"},
        {url: financeUrl, name: "Tupic Finance"},
        {url: insightsUrl, name: "Tupic Insights"},
        {url: notificationsUrl, name: "Tupic Notifications (v1)"},
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
