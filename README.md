# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

**Despliegue en Netlify**
- **Resumen**: Netlify puede desplegar la carpeta `frontend` automáticamente usando este repositorio.
- **Automático (usando `netlify.toml`)**: Se añadió `netlify.toml` en la raíz que configura:
	- `command`: `npm run build --prefix frontend`
	- `publish`: `frontend/dist`
	- redirección SPA ya configurada.
- **Pasos manuales**:
	1. En Netlify: New site from Git y conecta tu repositorio.
	2. En Build settings, establece `Base directory` a `frontend` (si no usas `netlify.toml`).
	3. `Build command`: `npm run build`
	4. `Publish directory`: `dist`
- **Nota**: El archivo `frontend/public/_redirects` fue añadido para manejar rutas de SPA.
- **Comandos locales**:
``powershell
cd frontend
npm install
npm run build
npm run preview
``
