import { dotnet } from './dotnet.js';

export async function initDotnet(baseUrl) {
    // Testing if the `baseUrl` is a legit path or URL.
    if(baseUrl === null || typeof baseUrl !== 'string' || baseUrl.trim().length === 0) {
        throw Error("`baseUrl` must be a string passed to `initDotnet` and be non-empty.")
    }

    const { getAssemblyExports, getConfig, Module } = await dotnet
        .withModuleConfig({
            locateFile: (path) => {
                return `${baseUrl}/${path}`;
            }
        })
        .create();

    const assemblies = await getAssemblyExports(getConfig().mainAssemblyName);

    return {
        Assemblies: assemblies,
        Module: Module,
    };
}
