# .NET8 WebAssembly bug when stripping symbols

The issue seems to be related to symbol stripping. Where the jiterpreter attempts to access symbols which cannot be found.

There's an interaction with the `System.Text.Json` and stripping of symbols in `dotnet.native.wasm`. 

If `<WasmNativeStrip>` is set to false, the issue is no longer there.

# Error logs

```
    raw cwrap mono_wasm_copy_managed_pointer not found

      at Ja (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/jiterpreter-support.ts:1862:15)
      at Ja (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/jiterpreter.ts:264:31)
      at $i (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/jiterpreter.ts:703:26)
      at ../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/jiterpreter.ts:736:9
      at Ul (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/jiterpreter.ts:1049:19)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:322624)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1589606)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1548333)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:791465)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:122212)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:85466)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:66234)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:301784)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1589606)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1548333)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:791465)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:122212)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:85466)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:241702)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:791302)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:324116)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1589606)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1548333)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:791465)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:122212)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:622449)
      at null.<anonymous> (wasm:/wasm/00a3bc76:1:1525334)
      at Object.apply [as mono_wasm_invoke_method_bound] (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/dotnet.native.js:8:96257)
      at mono_wasm_invoke_method_bound (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/invoke-cs.ts:273:29)
      at Object.kr (../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/https:/raw.githubusercontent.com/dotnet/runtime/5535e31a712343a63f5d7d796cd874e563e5ac14/src/mono/wasm/runtime/invoke-cs.ts:184:13)
      at Object.DoSomething (tests/init-test.js:5:40)
```

# Reproduction steps

## Prerequisites

You will need the following installed:

- [Git](http://git-scm.com/)
- [asdf](https://github.com/asdf-vm/asdf#setup)
    - [Node.js plugin](https://github.com/asdf-vm/asdf-nodejs)
    - [Yarn](https://github.com/twuni/asdf-yarn)
- [dotnet](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

- cd test
- asdf install
- sudo dotnet workload install wasm-tools
- yarn install
- yarn dotnet:build
- yarn test