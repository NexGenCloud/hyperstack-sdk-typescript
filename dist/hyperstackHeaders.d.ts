/**
 * Forced Hyperstack client identification headers.
 *
 * Maintained in sdk-generator (util/typescript/hyperstackHeaders.ts) and copied into
 * the generated SDK by the `add-hyperstack-headers` task. Do not edit in the SDK repo.
 */
export declare const HYPERSTACK_CLIENT_HEADER: string;
export declare const USER_AGENT_HEADER: string;
export declare const HYPERSTACK_CLIENT: string;
/**
 * User-Agent is a forbidden header name in browsers: XHR and fetch silently drop any
 * attempt to set it. It is therefore only emitted under Node, and browser traffic is
 * identified by Hyperstack-Client alone.
 */
export declare const HYPERSTACK_USER_AGENT: string | undefined;
/**
 * Forces the identification headers onto axios request args.
 *
 * Any caller-supplied variant is stripped case-insensitively first. Mutates and
 * returns the same object so it can wrap the generated axiosRequestArgs expression.
 */
export declare const applyHyperstackHeaders: <T extends {
    headers?: any;
}>(args: T) => T;
