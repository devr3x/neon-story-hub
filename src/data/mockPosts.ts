import { BlogPost } from '@/types/blog';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Inicio del Proyecto: Nuestra Visión',
    excerpt: 'Hoy comenzamos oficialmente el desarrollo de nuestro proyecto. En esta entrada compartimos nuestra visión, objetivos y el roadmap inicial que hemos definido como equipo.',
    content: `
# Inicio del Proyecto: Nuestra Visión

Después de meses de planificación, hoy es el día. Oficialmente comenzamos el desarrollo de **Storyboard**, nuestro proyecto más ambicioso hasta la fecha.

## ¿Por qué Storyboard?

La idea surgió de una necesidad real: documentar el proceso creativo de manera visual y colaborativa. Queríamos crear algo que:

- **Sea intuitivo**: Cualquier persona del equipo puede usarlo sin formación previa
- **Capture la esencia**: No solo el resultado final, sino todo el proceso
- **Inspire**: Que otros equipos puedan aprender de nuestro viaje

## Objetivos Principales

1. Desarrollar una plataforma colaborativa para equipos creativos
2. Implementar un sistema de documentación visual
3. Crear herramientas de retrospectiva y análisis

## El Equipo

Somos un grupo diverso de diseñadores, desarrolladores y creativos unidos por una pasión común: contar historias a través de nuestro trabajo.

---

*"El viaje de mil millas comienza con un solo paso."* - Lao Tzu

Manténganse conectados para más actualizaciones. ¡Esto apenas comienza!
    `,
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
    author: 'María García',
    date: '2024-01-15',
    category: 'Anuncios',
    tags: ['proyecto', 'inicio', 'visión'],
    readTime: 5,
  },
  {
    id: '2',
    title: 'Decisiones de Diseño: El Sistema Visual',
    excerpt: 'Exploramos las decisiones detrás de nuestro sistema de diseño. Colores, tipografía y la filosofía visual que guía cada pixel de nuestro proyecto.',
    content: `
# Decisiones de Diseño: El Sistema Visual

El diseño no es solo cómo se ve, es cómo funciona. En esta entrada profundizamos en las decisiones que dan forma a la identidad visual de Storyboard.

## Filosofía de Diseño

Nuestra filosofía se basa en tres pilares:

1. **Claridad**: Cada elemento tiene un propósito
2. **Consistencia**: Patrones reconocibles en toda la experiencia
3. **Carácter**: Personalidad que diferencia y conecta

## Paleta de Colores

Elegimos una paleta oscura con acentos neón por varias razones:

- Reduce la fatiga visual en sesiones largas
- Los acentos brillantes destacan elementos importantes
- Transmite modernidad y sofisticación técnica

## Tipografía

La combinación de **Orbitron** para títulos y **Space Grotesk** para cuerpo de texto crea un balance entre futurismo y legibilidad.

---

El diseño evoluciona con el proyecto. Estas decisiones no son finales, pero establecen una base sólida.
    `,
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    author: 'Carlos López',
    date: '2024-01-20',
    category: 'Diseño',
    tags: ['diseño', 'UI', 'visual'],
    readTime: 7,
  },
  {
    id: '3',
    title: 'Arquitectura Técnica: Fundamentos',
    excerpt: 'Una mirada profunda a las decisiones técnicas que sostienen nuestro proyecto. Stack tecnológico, patrones de arquitectura y filosofía de desarrollo.',
    content: `
# Arquitectura Técnica: Fundamentos

Detrás de cada gran producto hay decisiones técnicas fundamentales. Hoy compartimos las nuestras.

## Stack Tecnológico

- **Frontend**: React con TypeScript
- **Estilos**: Tailwind CSS con sistema de diseño personalizado
- **Animaciones**: Framer Motion
- **Backend**: Por definir (próxima entrada)

## Patrones de Arquitectura

Adoptamos una arquitectura basada en componentes con:

- Componentes atómicos reutilizables
- Gestión de estado centralizada
- Separación clara de responsabilidades

## Filosofía de Desarrollo

> "Primero hazlo funcionar, luego hazlo bonito, finalmente hazlo rápido."

Priorizamos:
1. Funcionalidad sobre perfección
2. Legibilidad sobre cleverness
3. Mantenibilidad sobre velocidad inicial

---

La arquitectura es un documento vivo. Evolucionará con el proyecto.
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    author: 'Ana Martínez',
    date: '2024-01-25',
    category: 'Desarrollo',
    tags: ['arquitectura', 'código', 'técnico'],
    readTime: 8,
  },
  {
    id: '4',
    title: 'Retrospectiva: Primera Semana',
    excerpt: 'Reflexiones honestas sobre nuestra primera semana de desarrollo. Logros, desafíos y aprendizajes que queremos compartir.',
    content: `
# Retrospectiva: Primera Semana

Una semana intensa pero increíblemente productiva. Aquí están nuestras reflexiones.

## Lo que Funcionó

- **Comunicación diaria**: Standups de 15 minutos marcaron la diferencia
- **Pair programming**: Duplicó la velocidad en tareas complejas
- **Documentación temprana**: Evitó confusiones y retrabajos

## Desafíos

- Subestimamos la complejidad del sistema de autenticación
- El perfeccionismo ralentizó algunas entregas
- Falta definir mejor los criterios de "terminado"

## Aprendizajes

1. Las estimaciones siempre deben incluir buffer
2. La comunicación constante es más valiosa que la documentación perfecta
3. Celebrar pequeños logros mantiene la moral alta

## Próximos Pasos

- Finalizar el MVP del blog
- Implementar sistema de usuarios
- Comenzar pruebas de usuario internas

---

La primera semana sienta las bases. Estamos en el camino correcto.
    `,
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    author: 'Diego Fernández',
    date: '2024-02-01',
    category: 'Retrospectiva',
    tags: ['retrospectiva', 'equipo', 'aprendizajes'],
    readTime: 6,
  },
  {
    id: '5',
    title: 'Animaciones con Propósito',
    excerpt: 'Las animaciones no son decoración, son comunicación. Exploramos cómo usamos el movimiento para mejorar la experiencia de usuario.',
    content: `
# Animaciones con Propósito

En Storyboard, cada animación cuenta una historia. No son decorativas, son funcionales.

## Principios de Animación

1. **Guiar la atención**: El movimiento dirige la mirada
2. **Proporcionar feedback**: Confirmar acciones del usuario
3. **Crear continuidad**: Transiciones suaves entre estados

## Implementación Técnica

Usamos Framer Motion por su:
- API declarativa e intuitiva
- Rendimiento optimizado
- Integración perfecta con React

## Ejemplos Clave

- **Entrada de página**: Animación 3D que crea anticipación
- **Cards del blog**: Hover effects que invitan a explorar
- **Scroll reveal**: Contenido que aparece naturalmente

## Performance

Las animaciones deben sentirse fluidas. Objetivos:
- 60 FPS constantes
- Sin layout shifts
- Carga progresiva

---

El movimiento bien ejecutado es invisible. El mal ejecutado, es lo único que ves.
    `,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    author: 'Laura Ruiz',
    date: '2024-02-05',
    category: 'Diseño',
    tags: ['animaciones', 'UX', 'motion'],
    readTime: 5,
  },
  {
    id: '6',
    title: 'Próximas Funcionalidades',
    excerpt: 'Un adelanto de lo que viene para Storyboard. Nuevas características, mejoras planificadas y la visión a mediano plazo.',
    content: `
# Próximas Funcionalidades

El roadmap evoluciona, pero la visión permanece. Esto es lo que viene.

## Fase 2: Colaboración

- **Comentarios en entradas**: Discusión enriquecida
- **Menciones**: Notificar a miembros específicos
- **Historial de cambios**: Versiones de cada entrada

## Fase 3: Visualización

- **Timeline interactivo**: Vista cronológica del proyecto
- **Galerías de medios**: Imágenes y videos organizados
- **Dashboards**: Métricas del proyecto

## Fase 4: Integración

- **API pública**: Conectar con otras herramientas
- **Exportación**: Generar documentos PDF/Notion
- **Widgets**: Embedear en otras plataformas

## Participación

¿Ideas? ¿Sugerencias? Queremos escucharlas. El proyecto es de todos.

---

El futuro se construye día a día. Cada commit nos acerca.
    `,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    author: 'María García',
    date: '2024-02-10',
    category: 'Roadmap',
    tags: ['futuro', 'funcionalidades', 'planificación'],
    readTime: 4,
  },
];
