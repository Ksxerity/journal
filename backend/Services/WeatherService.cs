using System.Web;
using MyWebApiProject.Models;
using Newtonsoft.Json;

namespace MyWebApiProject.Services
{
  public class WeatherService(HttpClient httpClient, IConfiguration configuration)
  {
    private readonly HttpClient _httpClient = httpClient;
    private readonly string? _apiKey = configuration["ApiSettings:WeatherApiKey"];
    private readonly string _baseUrl = "http://api.weatherapi.com/v1/current.json";

    public async Task<Weather> GetCurrentWeatherConditions(string location)
    {
      if (string.IsNullOrEmpty(_apiKey))
      {
        throw new ArgumentException("API key is missing. Please provide a valid API key.");
      }

      var builder = new UriBuilder(_baseUrl);
      var query = HttpUtility.ParseQueryString(builder.Query);
      query["key"] = _apiKey;
      query["q"] = location;
      builder.Query = query.ToString();
      var url = builder.ToString();

      HttpResponseMessage response = await _httpClient.GetAsync(url);

      if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
      {
        throw new UnauthorizedAccessException("Invalid API key. Access denied.");
      }

      response.EnsureSuccessStatusCode();

      string jsonResponse = await response.Content.ReadAsStringAsync();
      WeatherResponse? weatherResponse = JsonConvert.DeserializeObject<WeatherResponse>(jsonResponse);

      if (weatherResponse == null)
      {
        throw new Exception("Weather Response JSON is null");
      }

      var weatherData = new Weather
      {
        Temp_c = weatherResponse.Current.Temp_C,
        Temp_f = weatherResponse.Current.Temp_F,
        Is_day = weatherResponse.Current.Is_Day == 1,
        Weather_description = weatherResponse.Current.Condition.Text,
        Weather_code = weatherResponse.Current.Condition.Code
      };

      return weatherData;
    }
  }
}

