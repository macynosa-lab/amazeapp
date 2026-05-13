# Deploy AmazeApp en Vercel (PWA)

Esta carpeta ya está lista para publicarse como PWA. Solo tienes que subirla.

## 1. Subir a Vercel (3 minutos)

### Opción A — Drag & drop (la más fácil, sin git)

1. Descarga el proyecto como `.zip` desde Claude (botón de descarga del proyecto).
2. Descomprímelo en tu Mac.
3. Instala el CLI de Vercel (una vez):
   ```bash
   npm i -g vercel
   ```
4. Dentro de la carpeta del proyecto:
   ```bash
   vercel
   ```
   Te pedirá login (con GitHub, Google o email). Acepta los defaults — no hay build step.
5. Cuando termine, te dará una URL `https://amazeapp-xxx.vercel.app`. Para hacerla "definitiva":
   ```bash
   vercel --prod
   ```

### Opción B — Con GitHub (recomendada si vas a iterar)

1. Crea un repo nuevo en GitHub y sube los archivos del proyecto.
2. En [vercel.com](https://vercel.com) → **Add New → Project → Import Git Repository**.
3. Selecciona el repo. Framework preset: **Other**. Sin build command. Output: `./` (raíz).
4. **Deploy**. Cada push a `main` re-despliega automáticamente.

## 2. Instalar en el iPhone

1. Abre la URL (`https://amazeapp-xxx.vercel.app`) en **Safari**. ⚠️ Tiene que ser Safari — Chrome y otros no soportan PWA install en iOS.
2. Toca el botón **Compartir** (cuadrado con flecha hacia arriba).
3. Desplázate y toca **"Añadir a pantalla de inicio"**.
4. Confirma el nombre `AmazeApp` → **Añadir**.
5. Cierra Safari y abre el ícono desde la pantalla de inicio.

## 3. Qué obtienes

✅ Ícono Y2K en la pantalla de inicio
✅ Se abre full-screen, sin chrome de Safari
✅ Status bar oscura translúcida (combina con tu fondo `#0a0014`)
✅ Funciona offline después de la primera carga (Service Worker)
✅ Splash screen automática con el color de fondo

## 4. Iterar / actualizar

- Cambias archivos en local → `vercel --prod` (Opción A) o `git push` (Opción B) → desplegado en ~30s.
- Para que el iPhone recoja los cambios: abre la app desde el ícono y deja unos segundos. El service worker actualiza en background. Si no ves los cambios, quita la app de la pantalla de inicio y vuelve a añadirla.

## Archivos PWA incluidos

| Archivo | Propósito |
|---|---|
| `manifest.webmanifest` | Metadatos de la app (nombre, color, íconos) |
| `sw.js` | Service worker — cache offline |
| `vercel.json` | Headers correctos + redirect `/` → `/App Habitos.html` |
| `app/icon-*.png` | Íconos en 120, 152, 167, 180, 192, 512, 1024 + maskable |
| `app/icon.svg` | Master del ícono (editable) |

## Tips

- **Quieres dominio propio** (`amazeapp.com`): Vercel → Project → Settings → Domains. Apuntas el DNS y listo.
- **Cambiar el ícono**: edita `app/icon.svg`, luego pídeme que regenere los PNGs.
- **Notificaciones push**: iOS 16.4+ las soporta en PWAs, pero requieren más setup. Te ayudo cuando lo necesites.
