using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Runtime.InteropServices;

var options = new WebApplicationOptions
{
  ContentRootPath = Directory.GetCurrentDirectory(),
  WebRootPath = Directory.GetCurrentDirectory(),
  Args = args
};

var builder = WebApplication.CreateBuilder(options);

builder.Services.AddDirectoryBrowser();

var app = builder.Build();

app.UseStaticFiles();
app.UseDirectoryBrowser();

var port = args.Length > 0 ? args[0] : "3000";
app.Urls.Add($"http://localhost:{port}");

try
{
  app.Run();
  Console.WriteLine($"address : http://localhost:{port}");
  Console.WriteLine($"runtime : .NET");
  Console.WriteLine($"language : C#");
  Console.WriteLine($"lang-version : {Environment.Version}");
  Console.WriteLine($"OS : {(RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "Windows" : RuntimeInformation.IsOSPlatform(OSPlatform.Linux) ? "Linux" : RuntimeInformation.IsOSPlatform(OSPlatform.OSX) ? "Darwin" : "Unknown")}");
  Console.WriteLine($"OS-version : {Environment.OSVersion}");
}
catch (Exception ex)
{
  Console.WriteLine($"Error starting the server: {ex.Message}");
}
