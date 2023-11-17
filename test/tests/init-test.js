import {initDotnet} from 'wasmStripBug/init.js'

test('Api call fails.', async () => {
    const {Assemblies} = await initDotnet(BASE_URL)
    expect(Assemblies.WasmStripBug.API.DoSomething(JSON.stringify({data: "pass me back"}))).toEqual("pass me back")
})