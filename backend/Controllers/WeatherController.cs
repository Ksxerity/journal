using Microsoft.AspNetCore.Mvc;
using MyWebApiProject.Models;
using MyWebApiProject.Services;

namespace MyWebApiProject.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class WeatherController(WeatherService weatherService) : ControllerBase
  {
    private readonly WeatherService _weatherService = weatherService;

    [HttpGet("{location}")]
    public async Task<IActionResult> GetCurrentWeatherConditions(string location)
    {
      Weather currentConditons = await _weatherService.GetCurrentWeatherConditions(location);

      return Ok(currentConditons);
    }
  }
}
