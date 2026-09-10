/* tslint:disable */
/* eslint-disable */
/**
 * Forced Hyperstack client identification headers.
 *
 * Maintained in sdk-generator (util/typescript/hyperstackHeaders.ts) and copied into
 * the generated SDK by the `add-hyperstack-headers` task. Do not edit in the SDK repo.
 */

// Module-scoped declaration: this file has exports, so it shadows the global without
// a TS2451 redeclaration error whether or not @types/node resolves. The file is
// type-checked under both the SDK's tsconfig and the repo-root one used by ts-node.
declare const process: any;

const SDK_NAME: string = 'hyperstack-typescript-sdk';
const SDK_VERSION: string = 'v1.55.4-alpha';

export const HYPERSTACK_CLIENT_HEADER: string = 'Hyperstack-Client';
export const USER_AGENT_HEADER: string = 'User-Agent';

const FORCED: string[] = [HYPERSTACK_CLIENT_HEADER.toLowerCase(), USER_AGENT_HEADER.toLowerCase()];

/** Printable ASCII only, capped at 256 chars. */
const sanitize = (value: string): string =>
    String(value).replace(/[^\x20-\x7e]/g, '').slice(0, 256);

const normalizeOs = (value: string): string => {
    const v: string = String(value || '').toLowerCase();
    if (v.indexOf('darwin') === 0 || v.indexOf('mac') === 0) return 'darwin';
    if (v.indexOf('win') === 0) return 'windows';
    if (v.indexOf('linux') === 0) return 'linux';
    return v.replace(/ /g, '-') || 'unknown';
};

const normalizeArch = (value: string): string => {
    const v: string = String(value || '').toLowerCase();
    if (v === 'x64' || v === 'x86_64' || v === 'amd64') return 'x86_64';
    if (v === 'arm64' || v === 'aarch64') return 'arm64';
    if (v === 'ia32' || v === 'x86' || v === 'i386') return '386';
    return v || 'unknown';
};

const proc: any = typeof process !== 'undefined' ? process : undefined;
const isNode: boolean = !!(proc && proc.versions && proc.versions.node);

export const HYPERSTACK_CLIENT: string = sanitize(SDK_NAME + '/' + SDK_VERSION);

/**
 * User-Agent is a forbidden header name in browsers: XHR and fetch silently drop any
 * attempt to set it. It is therefore only emitted under Node, and browser traffic is
 * identified by Hyperstack-Client alone.
 */
export const HYPERSTACK_USER_AGENT: string | undefined = isNode
    ? sanitize(HYPERSTACK_CLIENT + ' (Node.js/' + proc.versions.node + '; '
        + normalizeOs(proc.platform) + '/' + normalizeArch(proc.arch) + ')')
    : undefined;

/**
 * Forces the identification headers onto axios request args.
 *
 * Any caller-supplied variant is stripped case-insensitively first. Mutates and
 * returns the same object so it can wrap the generated axiosRequestArgs expression.
 */
export const applyHyperstackHeaders = function <T extends { headers?: any }>(args: T): T {
    const headers: any = {};
    const existing: any = (args && args.headers) || {};
    Object.keys(existing).forEach((key: string) => {
        if (FORCED.indexOf(key.toLowerCase()) === -1) {
            headers[key] = existing[key];
        }
    });
    headers[HYPERSTACK_CLIENT_HEADER] = HYPERSTACK_CLIENT;
    if (HYPERSTACK_USER_AGENT) {
        headers[USER_AGENT_HEADER] = HYPERSTACK_USER_AGENT;
    }
    (args as any).headers = headers;
    return args;
};
