### Stack
    Frontend: React + Vite, Node 22, Electron-vite
    Backend: ASP.NET 8, MySql 8

Weather Icons: https://basmilius.github.io/weather-icons/index-fill.html
Weather API: https://www.weatherapi.com/
Rich Text Editor TipTap: https://tiptap.dev/docs/editor/introduction
FAVICON/App Icon: <a href="https://www.flaticon.com/free-icons/journal" title="journal icons">Journal icons created by nangicon - Flaticon</a>


## Issues

### Dbus

```
sudo service dbus start
vim ~/.bashrc
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/dbus/system_bus_socket
source ~/.bashrc   # If you're using Bash
echo $DBUS_SESSION_BUS_ADDRESS
```