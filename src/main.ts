//css
import '@tupicapp/web-ui/tokens.css';
import '@tupicapp/web-ui/reset.css';
import 'swagger-ui-dist/swagger-ui.css';
import './css/swagger.css';

//js
import {buildBrandCssVars, ServiceBrand} from '@tupicapp/web-ui/server-init';
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from "swagger-ui-dist"
import {readConfig} from './lib/config';

// Fallbacks below are the production URLs and only apply to `yarn dev`; deployed
// values come from platform-manifests' charts/swagger/values*.yaml via /config.js. Specs marked
// /configs/* are bundled from public/configs because the owning service does not
// serve them over HTTP.
const definitions = [
    {
        name: "Tupic IAM (v1)",
        url: readConfig('IAM_DOCS_URL', import.meta.env.VITE_IAM_URL, "/configs/iam.json"),
    },
    {
        name: "Tupic Accounts (v1)",
        url: readConfig('ACCOUNTS_DOCS_URL', import.meta.env.VITE_ACCOUNTS_URL, "https://api.tupic.com/accounts/docs/public/user/doc.json"),
    },
    {
        name: "Tupic Live (v2)",
        url: readConfig('LIVE_V2_DOCS_URL', import.meta.env.VITE_LIVE_CORE_URL, "https://api.tupic.com/live/v2/swagger/api.json"),
    },
    {
        name: "Tupic Live (v3)",
        url: readConfig('LIVE_V3_DOCS_URL', import.meta.env.VITE_LIVE_V3_URL, "https://api.tupic.dev/live/v3/docs/public/user/doc.json"),
    },
    {
        name: "Tupic Moment (v1)",
        url: readConfig('MOMENT_DOCS_URL', import.meta.env.VITE_MOMENT_URL, "https://api.tupic.com/moment/docs/public/user/doc.json"),
    },
    {
        name: "Tupic Assets (v1)",
        url: readConfig('ASSETS_DOCS_URL', import.meta.env.VITE_ASSETS_CORE_URL, "https://api.tupic.com/assets/docs/public/user/doc.json"),
    },
    {
        name: "Tupic Finance (v1)",
        url: readConfig('FINANCE_DOCS_URL', import.meta.env.VITE_FINANCE_URL, "/configs/finance.yaml"),
    },
    {
        name: "Tupic Insights (v1)",
        url: readConfig('INSIGHTS_DOCS_URL', import.meta.env.VITE_INSIGHTS_URL, "https://api.tupic.com/insights/v1/openapi.json"),
    },
    {
        name: "Tupic Notifications (v1)",
        url: readConfig('NOTIFICATIONS_DOCS_URL', import.meta.env.VITE_NOTIFICATIONS_URL, "https://api.tupic.com/notifications/docs/public/user/doc.json"),
    },
    {
        name: "Tupic Chain (v5)",
        url: readConfig('CHAIN_DOCS_URL', import.meta.env.VITE_CHAIN_URL, "/configs/chain.yaml"),
    },
    {
        name: "Tupic Games (v1)",
        url: readConfig('GAMES_DOCS_URL', import.meta.env.VITE_GAMES_URL, "/configs/games.json"),
    },
    {
        name: "Tupic Academy (v1)",
        url: readConfig('ACADEMY_DOCS_URL', import.meta.env.VITE_ACADEMY_URL, "https://api.tupic.com/support/openapi.json"),
    },
    {
        name: "Tupic Developers (v1)",
        url: readConfig('DEVELOPERS_DOCS_URL', import.meta.env.VITE_DEVELOPERS_URL, "https://api.tupic.com/developers/swagger.json"),
    },
].sort((a, b) => a.name.localeCompare(b.name));

const primaryName = readConfig('PRIMARY_DOCS_NAME', import.meta.env.VITE_PRIMARY_DOCS_NAME, "Tupic Live (v2)");

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
    urls: definitions,
    "urls.primaryName": primaryName,
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
