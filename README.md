# Einzelprojekt M133 Dorfladen

Sacha Vogel (savogel1)

## Deno installieren

Führe die folgenden Befehle in Powershell aus:
```
iwr -useb get.scoop.sh | iex
scoop install deno
```


## Shop starten

Führe die folgenden Befehle in der Konsole aus:
```
deno run --allow-write --unstable src/tools/builder.ts
deno run --allow-all src/webserver.ts
```

## Shop öffnen

Füge folgenden Link in die Browser URL ein:

http://localhost:8000/index.html
