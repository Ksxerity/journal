## Tech Stack

Developing using WSL2 on Windows 10

Frontend: React + Vite, Node 22, Electron-vite

Backend: ASP.NET 8, MySql 8

## Resources

Weather Icons: https://basmilius.github.io/weather-icons/index-fill.html

Weather API: https://www.weatherapi.com/

Rich Text Editor TipTap: https://tiptap.dev/docs/editor/introduction

FAVICON/App Icon Attribution: <a href="https://www.flaticon.com/free-icons/journal" title="journal icons">Journal icons created by nangicon - Flaticon</a>

## Installation

### Weatherapi API key

[Weatherapi](https://www.weatherapi.com/) is used in the app to get local weather data

An active API key will be necessary. The API key can be added to `/backend/appsettings.json`

### MySql

Below are the commands I used to run a Docker image for MySql and then create the necessary databases/tables/users

Make sure to change the fields in `<>` brackets. The User ID and Password should be added to `/backend/appsettings.json`

```
# Create a docker container for MySql
docker run --name mysql-journal -d \
  --restart unless-stopped \
  -e MYSQL_ROOT_PASSWORD=<CHANGE_ROOT_PASSWORD> \
  -p 3306:3306 \
  mysql:latest

# Login to MySql as root
mysql -h 127.0.0.1 -u root -p

# Create the database and table that will be used in the app
CREATE DATABASE journal_database;
USE journal_database;
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

# Create the user that the backend service will be using
CREATE USER '<CHANGE_USER_ID>'@'%' IDENTIFIED BY '<CHANGE_USER_PASSWORD>';
GRANT SELECT, UPDATE, INSERT, DELETE PRIVILEGES ON journal_database.* TO '<CHANGE_USER_ID>'@'%';
FLUSH PRIVILEGES;
```

### Building Backend Service

In `/backend/`, run `dotnet publish -c Release -r win-x64 --self-contained`

### Building Electron

Building an Electron app for Windows using Linux requires Wine

https://www.electron.build/multi-platform-build#to-build-app-for-windows-on-linux

Use this docker command to run an image where Wine is installed

**Make sure you are in the project root directory when running the docker command**

```
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/journal/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine
```

Afterwards, perform the following commands in the docker container

```
cd journal
npm install --platform=win32
npm run build
```

This should create an .exe file in `/journal/release` that can be used to install the app to Windows

# Issues

## Dbus

Encountered a problem where dbus wasn't running/properly configured
```
sudo service dbus start
vim ~/.bashrc
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/dbus/system_bus_socket
source ~/.bashrc   # If you're using Bash
echo $DBUS_SESSION_BUS_ADDRESS
```