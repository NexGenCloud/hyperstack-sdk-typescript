"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * Forced Hyperstack client identification headers.
 *
 * Maintained in sdk-generator (util/typescript/hyperstackHeaders.ts) and copied into
 * the generated SDK by the `add-hyperstack-headers` task. Do not edit in the SDK repo.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyHyperstackHeaders = exports.HYPERSTACK_USER_AGENT = exports.HYPERSTACK_CLIENT = exports.USER_AGENT_HEADER = exports.HYPERSTACK_CLIENT_HEADER = void 0;
const SDK_NAME = 'hyperstack-typescript-sdk';
const SDK_VERSION = 'v1.55.6-alpha';
exports.HYPERSTACK_CLIENT_HEADER = 'Hyperstack-Client';
exports.USER_AGENT_HEADER = 'User-Agent';
const FORCED = [exports.HYPERSTACK_CLIENT_HEADER.toLowerCase(), exports.USER_AGENT_HEADER.toLowerCase()];
/** Printable ASCII only, capped at 256 chars. */
const sanitize = (value) => String(value).replace(/[^\x20-\x7e]/g, '').slice(0, 256);
const normalizeOs = (value) => {
    const v = String(value || '').toLowerCase();
    if (v.indexOf('darwin') === 0 || v.indexOf('mac') === 0)
        return 'darwin';
    if (v.indexOf('win') === 0)
        return 'windows';
    if (v.indexOf('linux') === 0)
        return 'linux';
    return v.replace(/ /g, '-') || 'unknown';
};
const normalizeArch = (value) => {
    const v = String(value || '').toLowerCase();
    if (v === 'x64' || v === 'x86_64' || v === 'amd64')
        return 'x86_64';
    if (v === 'arm64' || v === 'aarch64')
        return 'arm64';
    if (v === 'ia32' || v === 'x86' || v === 'i386')
        return '386';
    return v || 'unknown';
};
const proc = typeof process !== 'undefined' ? process : undefined;
const isNode = !!(proc && proc.versions && proc.versions.node);
exports.HYPERSTACK_CLIENT = sanitize(SDK_NAME + '/' + SDK_VERSION);
/**
 * User-Agent is a forbidden header name in browsers: XHR and fetch silently drop any
 * attempt to set it. It is therefore only emitted under Node, and browser traffic is
 * identified by Hyperstack-Client alone.
 */
exports.HYPERSTACK_USER_AGENT = isNode
    ? sanitize(exports.HYPERSTACK_CLIENT + ' (Node.js/' + proc.versions.node + '; '
        + normalizeOs(proc.platform) + '/' + normalizeArch(proc.arch) + ')')
    : undefined;
/**
 * Forces the identification headers onto axios request args.
 *
 * Any caller-supplied variant is stripped case-insensitively first. Mutates and
 * returns the same object so it can wrap the generated axiosRequestArgs expression.
 */
const applyHyperstackHeaders = function (args) {
    const headers = {};
    const existing = (args && args.headers) || {};
    Object.keys(existing).forEach((key) => {
        if (FORCED.indexOf(key.toLowerCase()) === -1) {
            headers[key] = existing[key];
        }
    });
    headers[exports.HYPERSTACK_CLIENT_HEADER] = exports.HYPERSTACK_CLIENT;
    if (exports.HYPERSTACK_USER_AGENT) {
        headers[exports.USER_AGENT_HEADER] = exports.HYPERSTACK_USER_AGENT;
    }
    args.headers = headers;
    return args;
};
exports.applyHyperstackHeaders = applyHyperstackHeaders;
