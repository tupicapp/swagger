/**
 * Every Swagger UI definition URL is resolved at runtime from `/config.js`,
 * which the container entrypoint writes from its environment. That keeps the
 * URLs in helm-charts/app/values*.yaml instead of baked into the bundle, so one
 * image serves every environment.
 *
 * Resolution order per key: runtime `/config.js` -> build-time `VITE_*` -> the
 * fallback passed in by the caller (used by `yarn dev`, where neither exists).
 */
export type RuntimeConfigKey =
    | 'IAM_DOCS_URL'
    | 'ACCOUNTS_DOCS_URL'
    | 'LIVE_V2_DOCS_URL'
    | 'LIVE_V3_DOCS_URL'
    | 'MOMENT_DOCS_URL'
    | 'ASSETS_DOCS_URL'
    | 'FINANCE_DOCS_URL'
    | 'INSIGHTS_DOCS_URL'
    | 'NOTIFICATIONS_DOCS_URL'
    | 'CHAIN_DOCS_URL'
    | 'GAMES_DOCS_URL'
    | 'ACADEMY_DOCS_URL'
    | 'DEVELOPERS_DOCS_URL'
    | 'PRIMARY_DOCS_NAME';

type RuntimeAppConfig = Partial<Record<RuntimeConfigKey, string>>;

declare global {
    interface Window {
        __APP_CONFIG__?: RuntimeAppConfig;
    }
}

export function readConfig(key: RuntimeConfigKey, buildValue: string | undefined, fallback: string): string {
    const runtimeValue = typeof window !== 'undefined' ? window.__APP_CONFIG__?.[key] : undefined;

    return [runtimeValue, buildValue, fallback]
        .map((value) => (value ?? '').trim())
        .find((value) => value !== '') ?? fallback;
}
