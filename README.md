How to Run the Proyect Locally

1. Prerequisites
   - Node.js (version 20 or higher)
   - npm (Node Package Manager)

2. Clone the Repository
   - Clone this repository to your local machine.

3. Navigate to the Project Directory and run the following commands:

   ```bash
   npm install
   npm run dev
   ```

Once the build process is complete, the page will be up and running in http://localhost:5173/

---

A continuacion, voy a explicar algunas de las decisiones tecnicas tomadas en el desarrollo:

1. Utilice Vite ya que hoy en dia es el mejor bundler para proyectos React, por su velocidad y facilidad de configuracion.
2. Utilice Tailwind CSS para el diseño y Shadcn UI para los componentes, ya que esto me permitio crear una interfaz de usuario de manera veloz, sin preocuparme en los estilos. Como "trade-off", el codigo queda "sucio" de clases, y a veces la componetización es redundante, ya que simplemente son componentes con clases de Tailwind. Pero por cuestiones de tiempo en el proyecto, me parece que fue la mejor decisión.
3. Para la gestion de estados utilicé TanStack Query (React Query) ya que hoy en dia es la solución mas moderna y potente, en contra del clasico useState, useEffect y Context. Esto me permite manejar el estado cacheado, ademas de hacer autoRefresh de los datos, manejar los loading y errores de manera sencilla.
