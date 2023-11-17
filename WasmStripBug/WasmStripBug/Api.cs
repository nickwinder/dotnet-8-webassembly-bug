using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WasmStripBug;

public class JsonDefinition
{
    public string Data { get; set; }
}

[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(JsonDefinition),  GenerationMode = JsonSourceGenerationMode.Metadata)]
internal partial class CommandDefinitionContext : JsonSerializerContext
{
}

public partial class API
{
    // Unused
    [JSExport]
    private static void Main()
    {
    }

    [JSExport]
    public static string DoSomething(string jsonString)
    {
        var command = JsonSerializer.Deserialize(jsonString, CommandDefinitionContext.Default.JsonDefinition);
        return command.Data;
    }
}
