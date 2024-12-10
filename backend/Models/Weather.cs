namespace MyWebApiProject.Models
{
  // Model for returned data
  public class Weather
  {
    public decimal Temp_c { get; set; }
    public decimal Temp_f { get; set; }
    public bool Is_day { get; set; }
    public required string Weather_description { get; set; }
    public int Weather_code { get; set; }
  }

  // Model for response from Weather API
  public class WeatherResponse
  {
    public required CurrentWeather Current { get; set; }
  }

  public class CurrentWeather
  {
    public decimal Temp_C { get; set; }
    public decimal Temp_F { get; set; }
    public int Is_Day { get; set; }
    public required WeatherCondition Condition { get; set; }
  }

  public class WeatherCondition
  {
    public required string Text { get; set; }
    public int Code { get; set; }
  }
}