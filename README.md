# PreVet Genomics

### Como crear un post

1. descargar en repositorio

```bash
git clone https://github.com/vicevalds/prevet-landing
```

2. Crear o copiar un archivo `mi_post.md` en `src/data/blog` en la branch main. Con

```bash
cp src/data/blog/_template.md src/data/blog/mi_post.md
```

3. Añadir el contenido, y seguir el formato de los metadatos, ya que es necesario para su presentación. Y sin errores, que no cree nada para revisar errores :^)
>El title no debe ser muy largo, la descripción si se puede alargar, el formato de la fecha es esa YYYY-DD-MM y el slug es la url que se creará, por lo que no debe ser muy larga ni compleja, también con el alfabeto estado unidense (sin tildes ni ñ). **Importante** seguir el estilo kebab-case, ejemplo: guia-basica-petcare
- Dato: en `data/blog` los archivos que empiezan con "_" no se listan en la web. 

4. Hacer push a main del nuevo post. En Cloudflare hay una opción que actualiza el deploy automáticamente, está por defecto

### Deploy en Cloudflare

1. Ir al dashboard de [cloudflare](https://dash.cloudflare.com/login)
2. Ir a la sección de Compute (workers)
3. Importar repositorio prevet-landing
4. nombre: prevet-landing, build command: pnpm build
5. Desde el dashboard ir al menú del dominio y luego en la sección del costado ir a DNS y entrar en Records 
6. Crear un record CNAME, donde el root sea @ y el target sea en link del worker el cual aparece en los settings del worker. (Compute (Workers) -> Settings -> Domains & Route, ejemplo `prevet-landing.myuser.workers.dev
7. Listo

### Para desarrollo de la web

```bash
pnpm install # Necesario antes de desarrollar
pnpm dev # Levanta la web para desarrollo en localhost:4321
# Crear y añadir el `.env` siguiendo el de ejemplo con el número de teléfono.
pnpm build # Build de la web para producción (output en ./dist)
pnpm preview # Para ver el build de producción
```
