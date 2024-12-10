CREATE TABLE journal_entries (
    id INT AUTO_INCREMENT,
    subject VARCHAR(200) NOT NULL,
    rating INT NOT NULL,
    entry_text TEXT NOT NULL,
    entry_date DATE NOT NULL,
    created_date DATETIME NOT NULL,
    last_updated_date DATETIME NOT NULL,
    weather_description VARCHAR(50),
    weather_code INT,
    PRIMARY KEY (id)
);

- Show weather descrption on hover
- Location search for WeatherAPI
- Settings
    - Allow user to change location for weather
    - Dark mode?
- Search by subject?
- Make the app password protected
- Streamline the build process to also build the backend code and move the .deb file to downloads
- Make changes to support Windows
- Add to Github
- Create a first release
- Set App icon

Bugs:
    - Delayed SVG animation for weather

## Electron

    Backend:
        dotnet publish -c Release -r linux-x64 --self-contained
    
    Frontend:
        npm run build

    CMD:
        sudo dpkg -i /path/to/file